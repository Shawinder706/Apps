const Express = require('express');
const router = Express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const gravatar = require('gravatar');
const bcrypt = require('bcryptjs')
const User = require('../../models/users')

// @route    api/user
// @request  POST
// @desc     Register User
// @access   public
router.post(
    '/',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        check('password', 'Please enter a Password with 8 and more chracters').isLength({ min: 8 })
    ]
    , async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { name, email, password } = req.body;

        try {
            let user = await User.findOne({ email });

            if (user) {
                res.status(400).json({ errors: [{ msg: 'User is already exist' }] })
            }

            const avatar = gravatar.url(email, {
                s: 200,
                r: 'pg',
                d: 'mm'
            });

            user = new User({
                name,
                email,
                avatar,
                password
            });

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt)

            await user.save();
            // 
            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                config.get('jwtToken'),
                { expiresIn: 36000 },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            )


        }
        catch (err) {
            console.error(err.message)
            res.status(500).send('Server error')
        }


    });

module.exports = router;