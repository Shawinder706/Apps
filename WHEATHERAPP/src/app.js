const express = require('express')
const http    = require('http');

const hbs     = require('hbs')
const path    = require('path')
const weather = require('../utils/weather')

const staticPath = path.join(__dirname,'../public') //return current directory path

app.use(express.static(staticPath));

const viewspath = path.join(__dirname,'../templates/views')

const partialspath = path.join(__dirname,'../templates/partials')

// register public partials static files
app.set('view engine','hbs') //hbs-> handelbars
app.set('views',viewspath)
hbs.registerPartial(partialspath)



console.log(staticPath);

const hostname = 'localhost';
const port     = 3000

const app     = express()


app.get('',(req,res) => {
    res.send('hi this is wheather app')
});

app.get('/wheather',(req,res) => {
    //res.send("this is wheather end point")

    
});

app.get('*',(req,res) => {
    res.send("Page not found")
})

const server=http.createServer(app)

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});