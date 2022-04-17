/* manejar las rutas bases de consultas de productos*/
import { request } from "express";
import { Router} from  "express";
import productsManager from '../models/productsManager.js';
let products = new productsManager('files/productos.txt');
const productsRouter = Router();

let admin = true;
function administrador(req,res,next){
    if (admin) {
        req.mess="Acceso permitido";
        next();
    }
    else{
        req.mess="Acceso denegado";
        res.json({
            error: -1,
            descripcion: `la ruta ${req.originalUrl} con metodo ${req.method} no autorizada `
        })
        next();
    }
}

productsRouter.get('/:pid?', (req, res) =>{
    if(req.originalUrl.length === 14 || req.originalUrl.slice(14,19) === "?pid="){
        let productos;
        if (Object.entries(req.query).length>0){
            let pid = req.query.pid;
            productos = products.getProducto(pid);
        }else
            productos = products.getAllProducts();
        res.json({
            productos:productos
        })
    }
    else
    res.json({
        error: -2,
        descripcion: `la ruta ${req.originalUrl} con metodo ${req.method} no implementada `
    })
})

productsRouter.post('/', administrador, (req, res) =>{
    let adm = req.mess;
    if (adm === "Acceso permitido" ){
        let ahora = new Date();
        let fecha = ahora.getDate() + '/' + ( ahora.getMonth() + 1 ) + '/' + ahora.getFullYear() + ' ' + ahora.getHours() + ':' + ahora.getMinutes() + ':' + ahora.getSeconds();
        let product = {
            id:0,
            timestamp:fecha,
            title:req.body.title,
            description:req.body.description,
            code:req.body.code,
            thumbnail:req.body.thumbnail,
            price:req.body.price,
            stock:req.body.stock
        }
        products.addProduct(product);
        res.json({
            message:"se agrego el producto"
        })
    }
})

productsRouter.put('/:pid', administrador, (req, res) =>{
    let adm = req.mess;
    if (adm === "Acceso permitido" ){
        let pid = req.params.pid;
        let ahora = new Date();
        let fecha = ahora.getDate() + '/' + ( ahora.getMonth() + 1 ) + '/' + ahora.getFullYear() + ' ' + ahora.getHours() + ':' + ahora.getMinutes() + ':' + ahora.getSeconds();
        let product = {
            id:req.body.id,
            timestamp:fecha,
            title:req.body.title,
            description:req.body.description,
            code:req.body.code,
            thumbnail:req.body.thumbnail,
            price:req.body.price,
            stock:req.body.stock
        }
        products.updateProduct(pid,product);
        res.json({
            message:"se actualizo el producto con id " + pid
        })
    }
})

productsRouter.delete('/:pid', administrador, (req, res) =>{
    let adm = req.mess;
    if (adm === "Acceso permitido" ){
        let pid = req.params.pid;
        products.deleteProduct(pid);
        res.json({
            message:"se elimino el producto con id " + pid
        })
    }
})

productsRouter.use(function(req,res,next){
    res.statusCode=404;
    res.json({
        error: -2,
        descripcion: `la ruta ${req.originalUrl} con metodo ${req.method} no autorizada `
    })
    next();
});

export default productsRouter;
