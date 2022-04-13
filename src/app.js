/* la aplicacion */
import express from "express";
//import { Server } from 'socket.io';
import __dirname from './utils.js'; 
import productsRouter from './routes/productsRouter.js';
import cartsRouter from './routes/cartsRouter.js';


const app = express();
const PORT = 8080;
//para poder usar el json en los parseos del body
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static(__dirname+'/public'));
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.use(function(req,res,next){
    res.statusCode=404;
    res.json({
        error: -2,
        descripcion: `la ruta ${req.originalUrl} con metodo ${req.method} no implementada `
    })
    next();
});
const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));

