// ======================================================
// LÓGICA PARA LA PRIMERA TARJETA: PRODUCTO
// ======================================================

// 1. El objeto con los datos del producto (declarado UNA SOLA VEZ)
let producto = {
    nombre: "🍎 Manzanas",
    precio: 2.5,
    categoria: "Fruta",
};

// 2. Rellenamos la tarjeta del producto NADA MÁS CARGAR LA PÁGINA
document.getElementById("prod-nombre").textContent = producto.nombre;
document.getElementById("prod-precio").textContent = producto.precio;
document.getElementById("prod-cat").textContent = producto.categoria;


// ======================================================
// LÓGICA PARA LA SEGUNDA TARJETA: MI FICHA
// ======================================================

// 3. El objeto con los datos del alumno
let miFicha = {
    nombre: "Alexa",
    edad: 21,
    ciudad: "Rio de Janeiro"
};

// 4. La función que se ejecutará AL HACER CLIC en el botón
function mostrarMiFicha() {
    // Buscamos los contenedores por su ID y metemos los datos
    document.getElementById("alum-nombre").textContent = miFicha.nombre;
    document.getElementById("alum-edad").textContent = miFicha.edad;
    document.getElementById("alum-ciudad").textContent = miFicha.ciudad;
}

