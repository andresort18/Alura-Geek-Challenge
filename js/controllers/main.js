import { servicesProducts } from "../services/product-services.js";

//Obtenermos los contenedores de datos
const productContainer = document.querySelector("[data-lista]");; //selecciona el contenedor de los productos
const form = document.querySelector("[data-form]");


//Crea la tarjeta para el producto
function createcard(nombre, precio, imagen, id) {
    const card = document.createElement("div"); //crea el div
    card.classList.add("product"); //le agrega la clase card al div
    card.innerHTML = `
    <img class=".remove-bg" src="${imagen}" alt="">
    <div class="product_info">
        <div class="description">
            <h3>${nombre}</h3>
            <h4>${precio}</h4>
        </div>
        <img class="delete_button" src="assets/icon/delete_icon.svg" alt="">
    </div>
    `;

    //Añadimos el evento de eliminar un producto a traves del incono 
    const deleteButton = card.querySelector(".delete_button");
    deleteButton.addEventListener("click", () => {
        servicesProducts.deleteProduct(id)
            .then(() => {
                card.remove();
            })
            .catch(err => console.log(err));
    });

    productContainer.appendChild(card);
    return card;

}


//Lista los productos en la pagina 
const render = async () => {
    try {
        const listProducts = await servicesProducts.productList();
        listProducts.forEach(productos => {
            productContainer.appendChild(
                createcard(
                    productos.nombre,
                    productos.precio,
                    productos.imagen,
                    productos.id)
            );

        });
    } catch (error) {
        console.log(error);
    }
};

//Añadimos el evendo de enviar datos de un nuevo producto
form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.querySelector("[data-name]").value;
    const price = document.querySelector("[data-price]").value;
    const image = document.querySelector("[data-image]").value;



    servicesProducts
        .createProducts(name, price, image)
        .then((res) => {
            console.log(res);
        })
        .catch((err) => console.log(err))
});


render();