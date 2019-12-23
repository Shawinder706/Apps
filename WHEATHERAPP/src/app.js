const express = require('express')
const http    = require('http');

const hbs     = require('hbs')
const path    = require('path')
const weather = require('../utils/weather')

const hostname = 'localhost';
const port     = 3000

const app     = express()


const staticPath = path.join(__dirname,'../public') //return current directory path

app.use(express.static(staticPath));
//const partialPath = path.join(__dirname,'../templates/partials')

const viewspath = path.join(__dirname,'../templates/views')




// register public partials static files
hbs.registerPartials(path.join(__dirname, "../", "/templates/partials"))
app.set('views',viewspath)
app.set('view engine','hbs') //hbs-> handelbars








app.get('',(req,res) => {
    res.render('index',{
        title:"Weather App"
    })
});

app.get('/weather',(req,res) => {
    //res.send("this is wheather end point")
    const address =req.query.address

    if(!address){
        return res.send({
            error : "You must enter the address in search text box"
        })
    }

    weather(address,(error,{temprature,description,cityName})=>{
        if(error){
            return res.send({
                error
            })
        }
        console.log(temprature,description,cityName)
        res.send({
            temprature,
            description,
            cityName
        })
    })
    
});

app.get('*',(req,res) => {
    res.render('404',{
        title:'page not found'
    })
})

const server=http.createServer(app)

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});