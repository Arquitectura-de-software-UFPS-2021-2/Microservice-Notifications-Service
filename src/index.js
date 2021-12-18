const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
require('dotenv').config();
const { database } = require('./keys');
const bodyParser = require('body-parser');
const socketIO = require('socket.io');
const push = require('./public/js/push');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const ACCOUNT_SID = process.env.ACCOUNT_SID;
const AUTH_TOKEN = process.env.AUTH_TOKEN;
const client = require('twilio')(ACCOUNT_SID, AUTH_TOKEN);
const io = require('socket.io-client');
const router = express.Router();
var cors = require('cors');
//inicializaciones
const app = express();


//settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');


app.use(flash());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.options('*', cors());

//static files
app.use(express.static(path.join(__dirname, 'public')));


//routes
app.use(require('./routes/'));

//public
app.use(express.static(path.join(__dirname,'public')));

//starting the server

const server = app.listen(app.get('port'), () =>{
    console.log(`Server on port ${app.get('port')}`);
    console.log('Environment:', process.env.NODE_ENV);
});


//socket
var socket = io.connect('http://localhost:3000');
socket.on('connect', function () {
  // socket connected
  console.log('Se conecto correctamente');
  //socket.emit('server custom event', { my: 'data' });
});

socket.on('chat',function(data){
  console.log(data);
})

socket.on('dcris',function(data){
  console.log(data);
})

socket.on('registro',function(data){

console.log(data);
socket.emit('data', { my: 'data is coming bitch' });
 
  
})

