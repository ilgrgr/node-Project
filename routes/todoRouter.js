const {Router} = require('express')
const ModelTodo = require('../models/ModelTodo')

const router = Router()

router.get('/', async (req, res) => {

    const modelTodosArr = await ModelTodo.find({}).lean() 

    res.render('index',{
        title: 'Todo List',
        isIndex : true,
        modelTodosArr
    })
})

router.get('/create', (req, res) => {
    res.render('create', {
        title:  'Create List',
        isCreate: true
    })
})
router.get('/news', (req, res) =>{
    res.render('news', {
        title: 'News',
        isNews: true,
    })
})

router.get('/gallery', (req, res) =>{
    res.render( 'gallery', {
        title: 'Gallery',
        isGallery: true
    })
})

router.post('/create', async (req, res) => {
    const todo = new ModelTodo({
        title: req.body.title,
        date: Date.now(),
        keyDate: req.body.keyDate
    })
    
    await todo.save()
    res.redirect('/')
})

router.post('/complete', async (req, res) => {
    const todoItem = await ModelTodo.findById(req.body.id)  // находим элемент ModelTodo по id и сохраняем в переменную
    todoItem.completed = !!req.body.completed                               // меняем значение completed в ModelTodo
    await todoItem.save()                                   // и сохраняем его
    res.redirect('/')                                       // выводим значение на главную страницу '/'
})

module.exports = router