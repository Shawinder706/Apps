const Express = require('express');

const app = Express();
const dbConnect = require('./config/db')

const userRouter = require('./routes/api/users');
const profileRouter = require('./routes/api/profile');
const authRouter = require('./routes/api/auth');
const postsRouter = require('./routes/api/posts');

// db connection
dbConnect();

// Initialize middleware
app.use(Express.json({ extended: false }))

app.get('/', (req, res) => {
    res.send("server is running fast")
})

// @routes
app.use('/api/users', userRouter);
app.use('/api/profile', profileRouter);
app.use('/api/auth', authRouter);
app.use('/api/posts', postsRouter);



const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})