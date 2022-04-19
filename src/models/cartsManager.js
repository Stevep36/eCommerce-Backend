/* Manejar los archivos del carrito( crear eliminar agregar) */

import fs from 'fs';

export default class Carts {

    constructor(){
        this.carts = [];
    }    
    
    createCart = () =>{
        let cid = this.carts.length;
        this.carts.push(`files/cart_${cid}.txt`)
        try {
            let ahora = new Date();
            let fecha = ahora.getDate() + '/' + ( ahora.getMonth() + 1 ) + '/' + ahora.getFullYear() + ' ' + ahora.getHours() + ':' + ahora.getMinutes() + ':' + ahora.getSeconds();
            let obj = {
                id:cid,
                timestamp:fecha,
                products:[]
            }
            fs.promises.writeFile(this.carts[cid],JSON.stringify(obj,null,'\t'));
            return cid;
        }
        catch (err) {
            console.log("no se pudo guardar " + err);
        }  
    }

    deleteCart = (cid) =>{
        try {
            fs.unlink(this.carts[cid],error =>{
                if (error) throw new Error(error)
                else {
                    console.log ("se borro correctamente el archivo " + this.carts[cid]);
                    this.carts[cid] = "";
                }
            })
        }
        catch (err){
            console.log("hubo un error al borrar el archivo "+ err);
        }
    }

    getAllProducts = (cid) =>{
        let data = fs.readFileSync(this.carts[cid],'utf-8');
        let contenido = JSON.parse(data);
        return contenido.products
    }

    async addProduct(cid,pid,quantity){
        let i=0;
        let exist = false;
        let data = await fs.promises.readFile(this.carts[cid],'utf-8');
        let contenido = JSON.parse(data);
        while (i < contenido.products.length && exist === false)
            if (pid === contenido.products[i].id){
                contenido.products[i].quantity=contenido.products[i].quantity+quantity;
                exist = true;
            }else i++;
        if (exist === false) {
            let prod = {
                id:pid,
                quantity:quantity
            };
            contenido.products.push(prod);
        }
        await fs.promises.writeFile(this.carts[cid],JSON.stringify(contenido,null,'\t'));
                 
        
        
    }

    deleteProduct = (cid,pid) => {
        let data = fs.readFileSync(this.carts[cid],'utf-8');
        let contenido = JSON.parse(data);
        contenido.products = contenido.products.filter((prod) => (prod.id !== parseInt(pid)));
        fs.writeFileSync(this.carts[cid],JSON.stringify(contenido,null,'\t'));
    }
}

