const express = require('express');
const FrontController = require('../controller/FrontController');
const AdminController = require('../controller/AdminController');
const app = express();


const route = express.Router()


const checkAuth = require('../middleware/auth')

route.get('/register',FrontController .register)

route.get('/',FrontController .login)

route.get('/home', checkAuth ,FrontController.home)

route.post('/insertStudent',FrontController .insertStudent)

route.post('/verifyLogin',FrontController .verifyLogin)

route.get("/Logout", FrontController.Logout);



// route.get('/homepage',FrontController.homepage)


// route.post('/upload',FrontController.upload)




//////////////////////////// Admin side ///////////////////////////////////

// route.post('/insertStudent',AdminController .insertStudent)
// route.post('/verifyLogin',AdminController .verifyLogin)


route.get('/admin/dashboard',checkAuth, AdminController.dashboard)


module.exports = route 