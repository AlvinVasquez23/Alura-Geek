import { productServices } from "../services/product_services.js";

//Se crean las referencias a los elemntos HTML
const cardsContainer = document.querySelector("[data-product]");
const form = document.querySelector("[data-form]");
const limpiar = document.querySelector(".limpiar");


// Funcion ue crea las cards con todos sus datos
function crearCard (id, nombre, precio, imagen){
    const card = document.createElement("div"); //Se crea el div que contiene la card
    card.classList.add("card-content"); //Se le agrega el nombre de la clase

    //Se actualiza el contenido de la card creada 
    card.innerHTML = `
            <div class="img_container">
                <img class="imagen" src="${imagen}" alt="${nombre}">
            </div>
            <p class="descripcion">${nombre}</p>
            <div class="icono">
                <p class="precio">S/.${precio}</p>
                <button class="trash" data-id="${id}">
                    <img src="/IMG/trash.png" alt="trash">
                </button> 
            </div>
    `

    const botonBorrar = card.querySelector('.trash');

    botonBorrar.addEventListener('click', async ()  => {
        try{
            await productServices.borrarProducto(id);
            card.remove()
        }catch(err){
            console.log(err)
        }
    }) 

    cardsContainer.appendChild(card); //se actualiza el contenido del contenedor de cards agregando la card dentro
    return card;
}



//Variable que renderiza la aplicacion, esta contiene una funcion anonima asincrona
const render = async () => {
    try{
        const productList = await productServices.productList();
        productList.forEach(productos => {
            cardsContainer.appendChild(
                crearCard(
                    productos.id,
                    productos.nombre,
                    productos.precio,
                    productos.imagen
                )
            )
            
        });
    } catch(error){ 
        console.log(error);
    };
    
};

form.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nombre = document.querySelector("[data-nombre]").value;
    const precio = document.querySelector("[data-precio]").value;
    const imagen = document.querySelector("[data-imagen]").value;

    productServices
    .crearProducto(nombre, precio, imagen)
    .then((res)=> console.log(res))
    .catch((err)=> console.log(err));
})


limpiar.addEventListener("click", (evento) => {
    evento.preventDefault();

    const limpiarForm = () =>{
        const nombre = document.querySelector("[data-nombre]").value="";
        const precio = document.querySelector("[data-precio]").value="";
        const imagen = document.querySelector("[data-imagen]").value="";
    }
    
    limpiarForm();
})

render();