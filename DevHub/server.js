const Express = require('express');

const app = Express();

app.get('/', (res, req) => {
    req.send("server is running fast")
})

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})