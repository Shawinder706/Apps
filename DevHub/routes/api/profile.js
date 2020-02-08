const Express = require('express');
const router = Express.Router();

// @route    api/profile
// @request  GET
// @access   public
router.get('/', (req, res) => {
    res.send("profile router")
});

module.exports = router;