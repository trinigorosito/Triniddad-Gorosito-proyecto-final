var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config(); 


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require ('./routes/admin/login');
var adminRouter  = require ('./routes/admin/novedades');
var obrasRouter = require ('./routes/admin/obras')
var apiRouter = require ('./routes/api')

const { title } = require('process');

var app = express();
const session = require('express-session');

var cors = require('cors')
app.use(cors());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
  secret: 'hsdhuyrbfjkfkkdfsjad',
  resave: false,
  saveUninitialized: true
}))
var secure = async (req, res, next) => {
  try {
    if (req.session.id_usuario) {
      next();
    } else {
      res.redirect('/admin/login');
    }
  } catch (error) {
    console.log(error);
  }
};


app.use('/admin/login',loginRouter);
app.use('/admin/novedades',secure,adminRouter);
app.use ('/admin/obras', secure, obrasRouter);
app.use('/api',cors(),apiRouter);


app.get ('/', function (req,res){
  var conocido = Boolean(req.session.nombre);
  res.render('index', {
    conocido: conocido,
    nombre: req.session.nombre
  })
  
});

app.post('/ingresar', function(req,res){
 if (req.body.nombre){
  req.session.nombre = req.body.nombre  
 }  
 res.redirect('/')
})

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
