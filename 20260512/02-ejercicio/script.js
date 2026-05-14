// =================================================================================
// 1. DATOS DE LA APLICACIÓN
// =================================================================================

// 'const' significa que esta variable no cambiará. 'carrito' es un Array (una lista).
// Cada elemento de la lista es un Objeto {}, que agrupa datos con un nombre (clave) y un valor.
// Por ejemplo: { clave: valor, clave2: valor2 }
const carrito = [
    { nombre: "🍞 pan de molde", precio: 1.20 },
    { nombre: "🥛 Leche entera", precio: 0.90 },
    { nombre: "🥚 Huevos Camperos", precio: 2.50 },
    { nombre: "🥑 Aguacate", precio: 1.00 },
    { nombre: "🥩 Entrecot de ternera", precio: 9.25 },
    { nombre: "🍥 Sushi", precio: 2.00 }
];

// =================================================================================
// 2. CÓDIGO QUE SE EJECUTA AL CARGAR LA PÁGINA
// =================================================================================

// Buscamos en el HTML el elemento con id="lista-producto" y lo guardamos en una variable.
// Hacemos esto una sola vez al principio para que el programa sea más eficiente.
let listaHTML = document.getElementById("lista-producto");

// Usamos un bucle 'for' para recorrer cada elemento del array 'carrito'.
// - 'let i = 0;': Empezamos a contar en la posición 0 (el primer elemento).
// - 'i < carrito.length;': El bucle continuará mientras nuestro contador 'i' sea menor que el número total de productos.
// - 'i++': Después de cada vuelta, incrementamos el contador en 1 para pasar al siguiente producto.
for (let i = 0; i < carrito.length; i++) {
    
    // 'innerHTML +=' nos permite añadir código HTML dentro del elemento 'listaHTML'.
    // El '+=' es clave: "añade esto a lo que ya hay", en lugar de borrarlo.
    // Usamos las comillas invertidas (``) para crear una "plantilla de texto".
    // Esto nos deja meter variables de JavaScript directamente en el texto con ${...}.
    // - carrito[i]: Accede al producto actual en la vuelta del bucle.
    // - .nombre / .precio: Accede a una propiedad específica de ese producto.
    // - .toFixed(2): Formatea el número del precio para que siempre tenga 2 decimales.
    listaHTML.innerHTML += `
    <li>
        <span>${carrito[i].nombre}</span>
        <span>${carrito[i].precio.toFixed(2)}€</span>
    </li>
    `;
}

// =================================================================================
// 3. LA FUNCIÓN QUE SE ACTIVA CON EL BOTÓN
// =================================================================================

// 'function cobrar()' define un bloque de código que solo se ejecutará cuando sea llamado
// (en nuestro caso, cuando se hace clic en el botón del HTML).
function cobrar() {
    // PASO 1: Calcular el subtotal (la suma de precios sin impuestos).
    // Creamos una variable 'acumulador'. Empezará en 0 y le iremos sumando el precio de cada producto.
    let subtotal = 0;

    // Volvemos a recorrer el carrito, pero esta vez para hacer cálculos.
    for (let i = 0; i < carrito.length; i++) {
        // En cada vuelta, añadimos el precio del producto actual a nuestro acumulador.
        subtotal = subtotal + carrito[i].precio;
    }

    // PASO 2: Calcular el IVA y el Total Final.
    // Calculamos el 21% del subtotal (multiplicar por 0.21).
    const cantidadIva = subtotal * 0.21;
    // El total final es la suma del subtotal más los impuestos.
    const totalFinal = subtotal + cantidadIva;

    // PASO 3: Mostrar los resultados en el HTML.
    // Buscamos los elementos por su 'id' y actualizamos su contenido de texto (.textContent).
    // De nuevo, usamos plantillas de texto para formatear el resultado de forma limpia.
    document.getElementById("subtotal").textContent = `Subtotal: ${subtotal.toFixed(2)} €`;
    document.getElementById("iva").textContent = `IVA (21%): ${cantidadIva.toFixed(2)} €`;
    document.getElementById("total-final").textContent = `Total: ${totalFinal.toFixed(2)} €`;
}