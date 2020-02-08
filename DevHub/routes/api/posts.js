const Express = require('express');
const router = Express.Router();

// @route    api/posts
// @request  GET
// @access   public
router.get('/', (req, res) => {
    res.send("post router")
});

module.exports = router;