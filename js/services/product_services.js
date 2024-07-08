
//Se crea una funcion para obtener mediante la API las lista de productos
const productList = () => {
    return  fetch("http://localhost:3000/productos")
            .then((res) => res.json())
            .catch((err) => console.log(err))
};

/* Se crea función para crear un producto y alimentar la db.json 
solo se pasan 3parametros ya que el id lo asigna automaticamente*/
const crearProducto = (nombre, precio, imagen) => {
    return fetch("http://localhost:3000/productos",{
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({
            nombre,
            precio,
            imagen,
        }),
    })
    .then((res) => res.json())
    .catch((err)=> console.log(err))
};


const borrarProducto = (id) =>{
    return fetch(`http://localhost:3000/productos/${id}`, {
        method: "DELETE"
    })
    .then((res) => res.json())
    .catch((err)=> console.log(err))
};

//Variable que se encarga de exportar las funciones
export  const productServices = {
    productList, 
    crearProducto,
    borrarProducto,
}
