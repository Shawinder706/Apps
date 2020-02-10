const Expres = require('express');
const router = Expres.Router();
const auth = require('../../middleware/auth')

const User = require('../../models/users');


// @route    api/auth
// @request  GET
// @access   public
router.get('/', auth, async (req, res) => {

    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user)
    } catch (err) {
        res.status(500).send("Server Error")
    }
});

module.exports = router

