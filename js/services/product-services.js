//  URL de tu API desplegada en Vercel
const Url = "https://fake-api-blush-tau.vercel.app/productos"; 
// Funciones de la página web

//Listar los productos 
const productList = async () => {
    try {
        const res = await fetch(Url);
        return await res.json();
    } catch (err) {
        return console.log(err);
    }
};

//Crear productos
const createProducts = async (nombre, precio, imagen) => {
    try {
        const res = await fetch(Url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nombre,
                precio,
                imagen,
            }),
        });
        // Después de crear el producto, recarga la página
        location.reload();
        return await res.json();
    } catch (err) {
        return console.log(err);
    }
};

//Eliminacion de un producto por id
const deleteProduct = async (id) => {
    try {
        const res = await fetch(`${Url}/${id}`, {
            method: "DELETE"
        });
        return await res.json();
    } catch (err) {
        return console.log(err);
    }
};

//Exportamos las funciones
export const servicesProducts = {
    productList,
    createProducts,
    deleteProduct,
}