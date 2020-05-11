const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const expHdbars = require('express-handlebars') 
const todoRouters = require('./routes/todoRouter')

const PORT = process.env.PORT || 3000;
const app = express()
const hbs = expHdbars.create({
    defaultLayout: 'main',
    extname: 'hbs'
})
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views' )
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(todoRouters)


async function start() {
    try {
        await mongoose.connect('mongodb+srv://ilgrgr:1q2w3e4r@cluster0-uq8ke.mongodb.net/todos', {
            useNewUrlParser: true,
            useFindAndModify: false
        })
        app.listen(PORT, () => {
            console.log('Server started::')
        })

    } catch (error) {
        console.log(error)
    }
}

start()
