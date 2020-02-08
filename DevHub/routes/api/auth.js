const Expres = require('express');
const router = Expres.Router();

// @route    api/auth
// @request  GET
// @access   public
router.get('/', (req, res) => {
    res.send('auth router');
});

module.exports = router

