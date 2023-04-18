import express from 'express';
import handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import mongoStore from 'connect-mongo';
import { Server } from 'socket.io';
import { __dirname } from './__dirname.js'
import cartsRouter from './src/routes/carts.router.js';
import productsRouter from './src/routes/products.router.js';
import viewsRouter from './src/routes/views.router.js';
import usersRouter from './src/routes/users.router.js';
import './src/persistence/dbConfig.js';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static(__dirname + '/src/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
    secret: 'sessionKey',
    resave: false,
    saveUninitialized: true,
    store: new mongoStore({
        mongoUrl: 'mongodb+srv://fedeeribeiro:coderhouse@cluster0.hj7njhs.mongodb.net/desafio5?retryWrites=true&w=majority'
        })
    })
);

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/src/views');

app.use('/api/carts', cartsRouter);
app.use('/api/products', productsRouter);
app.use('/api/users', usersRouter);
app.use('/views', viewsRouter);

const httpServer = app.listen(PORT, () => {
    console.log(`Servidor escuchando al puerto ${PORT}.`)
});

const socketServer = new Server(httpServer);

socketServer.on('connection', (socket) => {
    console.log(`Usuario conectado con el ID ${socket.id}.`);
    socket.emit('fetchProducts');
    socket.on('updateProducts', () => {
        socket.emit('fetchProducts')
    });
    socket.on('disconnect', () => {
        console.log(`Usuario con ID ${socket.id} se ha desconectado.`)
    })
})