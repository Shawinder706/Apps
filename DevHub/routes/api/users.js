const Express = require('express');
const router = Express.Router();
const { check, validationResult } = require('express-validator/check');

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
    , (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        res.send("user router")
    });

module.exports = router;