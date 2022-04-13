/* manejar las rutas bases de consultas de carritos */
import { Router} from  "express";
import cartsManager from '../models/cartsManager.js';
const cartsRouter = Router();
let carts = new cartsManager();

cartsRouter.post('/', (req, res) =>{
    let id = carts.createCart();
    res.json({
        id:id
    });
    
})

cartsRouter.delete('/:cid', (req, res) =>{
    let cid = req.params.cid;
    carts.deleteCart(cid);
    res.json({
        message: "eliminado"
    })
})

cartsRouter.get('/:cid/products', (req, res) =>{
    let cid = req.params.cid;
    let products = carts.getAllProducts(cid);
    res.json({
        productos:products
    })
})

cartsRouter.post('/:cid/products', (req, res) =>{
    let cid = req.params.cid;
    let {id,quantity} = req.body;
    carts.addProduct(cid,id,quantity);
    res.json({
        message:"producto sumado a su carrito"
    })
})

cartsRouter.delete('/:cid/products/:pid', (req, res) =>{
    let cid = req.params.cid;
    let pid = req.params.pid;
    carts.deleteProduct(cid,pid);
    res.json({
        message:"producto eliminado de su carrito"
    })
})

cartsRouter.use(function(req,res,next){
    res.statusCode=404;
    res.json({
        error: -2,
        descripcion: `la ruta ${req.originalUrl} con metodo ${req.method} no autorizada `
    })
    next();
});
export default cartsRouter;