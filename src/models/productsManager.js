/* Manejar los archivos de productos (crear eliminar agregar)*/

import fs from 'fs';

export default class Products {

    constructor(name){
        this.name = name;
    } 

    getAllProducts ()  {
        let data = fs.readFileSync(this.name,'utf-8');
        let contenido = JSON.parse(data);
        return contenido
    }

    getProducto (pid) {
        let data = fs.readFileSync(this.name,'utf-8');
        let contenido = JSON.parse(data);
        return contenido.find((item) => (item.id === parseInt(pid)));
    }

    async addProduct (product) {
        let data = await fs.promises.readFile(this.name,'utf-8');
        let contenido = JSON.parse(data);
        product.id = contenido.length;
        contenido.push(product);
        await fs.promises.writeFile(this.name,JSON.stringify(contenido,null,'\t'));

    }

    async updateProduct (pid, product) {
        let data = await fs.promises.readFile(this.name,'utf-8');
        let contenido = JSON.parse(data);
        contenido[pid]=product;
        await fs.promises.writeFile(this.name,JSON.stringify(contenido,null,'\t'));
    }

    async deleteProduct (pid) {
        let data = await fs.promises.readFile(this.name,'utf-8');
        let contenido = JSON.parse(data);
        contenido = contenido.filter((prod) => (prod.id !== parseInt(pid)));
        await fs.promises.writeFile(this.name,JSON.stringify(contenido,null,'\t'));
    }
}
