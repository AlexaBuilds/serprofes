// =====================================================================
// 1. VARIABLES GLOBALES Y GESTIÓN DE LA MEMORIA
// =====================================================================

// Ya no empezamos con datos de ejemplo. Estas variables se rellenarán
// al cargar la memoria del navegador.
let historialChat = [];
let titulosRecientes = []; // Nuevo array para los títulos del menú lateral.

/**
 * FUNCIÓN DE ARRANQUE: Se ejecuta automáticamente al abrir la web.
 * Su misión es buscar en el "disco duro" del navegador (localStorage)
 * si ya existía una conversación guardada para no perderla.
 */
function cargarMemoria() {
    // PASO 1: Intentamos "leer" los datos guardados con las llaves 'chatGuardado' y 'titulosGuardados'.
    let memoriaChat = localStorage.getItem('chatGuardado');
    let memoriaTitulos = localStorage.getItem('titulosGuardados');

    // PASO 2: Comprobamos si encontramos algo en la memoria del chat.
    if (memoriaChat) {
        // Si había algo, estaba guardado como TEXTO. Usamos JSON.parse() para
        // transformarlo de nuevo a un ARRAY de objetos y lo cargamos en nuestro historial.
        historialChat = JSON.parse(memoriaChat);
    } else {
        // Si no había nada (es la primera vez que el usuario entra),
        // le dejamos solo con el saludo inicial de la IA.
        historialChat = [{ rol: "ia", texto: "¡Hola! Soy IA Master. ¿En qué te ayudo hoy?" }];
    }

    // PASO 3: Hacemos lo mismo con los títulos del menú lateral.
    if (memoriaTitulos) {
        titulosRecientes = JSON.parse(memoriaTitulos);
    }

    // PASO 4: Una vez cargados los datos, le ordenamos a la web que se pinte con ellos.
    pintarChat(historialChat);
    actualizarHistorialLateral();
}

// ¡MUY IMPORTANTE! Ejecutamos la función de carga nada más empezar,
// para que todo aparezca en pantalla desde el primer segundo.
cargarMemoria();


// =====================================================================
// 2. FUNCIÓN PINTORA PRINCIPAL (Dibuja el chat)
// =====================================================================

// Esta función recibe una lista (nuestro array) y lo dibuja en la pantalla.
// No ha cambiado mucho, sigue siendo nuestra fiel "pintora".
function pintarChat(listaMensajes) {
    // PASO 1: Buscamos en el HTML la etiqueta donde vamos a meter los mensajes.
    let caja = document.getElementById('caja-mensajes');
    // PASO 2: Borramos la pizarra para no duplicar mensajes.
    caja.innerHTML = "";
    // PASO 3: El bucle FOR recorre cada mensaje del array.
    for (let i = 0; i < listaMensajes.length; i++) {
        // PASO 4: El condicional ternario decide el color de la burbuja.
        let claseCSS = listaMensajes[i].rol === "usuario" ? "msg-usuario" : "msg-ia";
        // PASO 5: Inyectamos el HTML de la burbuja del mensaje en la caja.
        caja.innerHTML +=
            `<div class="${claseCSS}">
                <b>${listaMensajes[i].rol.toUpperCase()}:</b>

                ${listaMensajes[i].texto}
            </div>`;
    }
    // PASO 6: El auto-scroll para que siempre veamos el último mensaje.
    caja.scrollTop = caja.scrollHeight;
}

/**
 * NUEVA FUNCIÓN PINTORA (Dibuja el menú lateral)
 * Su única misión es actualizar la lista de títulos en la barra negra.
 */
function actualizarHistorialLateral() {
    // PASO 1: Buscamos la etiqueta <ul> donde irán los títulos.
    let lista = document.getElementById('historial-lista');
    // PASO 2: La vaciamos para no duplicar títulos.
    lista.innerHTML = "";
    // PASO 3: Recorremos el array 'titulosRecientes'.
    titulosRecientes.forEach(titulo => {
        // Por cada título, creamos un <li> en el HTML.
        // Usamos .substring(0, 25) para cortar los títulos muy largos y que no se salgan del menú.
        lista.innerHTML += `<li>${titulo.substring(0, 25)}...</li>`;
    });
}


// =====================================================================
// 3. LÓGICA DE LA IA (¡TU CÓDIGO!)
// =====================================================================

/**
 * Simula una respuesta inteligente de la IA basada en palabras clave.
 * ¡Esta es tu función avanzada! La conservamos porque es genial.
 * @param {string} mensajeUsuario El texto que el usuario ha escrito.
 * @returns {string} Un texto de respuesta generado por la IA.
 */
function generarRespuestaIA(mensajeUsuario) {
    // Convertimos el mensaje a minúsculas para que la búsqueda no falle.
    const mensaje = mensajeUsuario.toLowerCase();
    // Buscamos palabras clave con un IF / ELSE IF.
    if (mensaje.includes("hola") || mensaje.includes("buenos días")) {
        return "¡Hola! ¿En qué puedo ayudarte hoy?";
    } else if (mensaje.includes("javascript") || mensaje.includes("programación")) {
        return "¡JavaScript es mi tema favorito! ¿Qué quieres saber sobre ello?";
    } else if (mensaje.includes("tiempo") || mensaje.includes("clima")) {
        return "Lo siento, no tengo acceso a la información del tiempo en tiempo real.";
    } else if (mensaje.includes("adiós") || mensaje.includes("gracias")) {
        return "¡De nada! Si necesitas algo más, no dudes en preguntar.";
    } else {
        return "No estoy seguro de cómo responder a eso. ¿Puedes preguntármelo de otra manera?";
    }
}


// =====================================================================
// 4. FUNCIÓN PRINCIPAL DE ENVÍO (Lógica del usuario)
// =====================================================================

// Esta función se activa cuando el usuario le da a "Enviar".
function enviarPrompt(event) {
    // PASO 1: Evitamos que la página se recargue (comportamiento por defecto de los formularios).
    event.preventDefault();

    // PASO 2: Atrapamos el input y obtenemos el mensaje limpio (sin espacios).
    let input = document.getElementById('mensaje-input');
    let mensaje = input.value.trim();

    // PASO 3: Validamos que el mensaje no esté vacío.
    if (mensaje === "") {
        alert("⚠️ ¡Error! Escribe algo primero");
        return; // El return detiene la función aquí.
    }

    // --- ¡AQUÍ EMPIEZAN LAS MEJORAS IMPORTANTES! ---

    // PASO 4.A: Guardamos el mensaje del usuario en nuestro array principal.
    historialChat.push({ rol: "usuario", texto: mensaje });

    // PASO 4.B (NUEVO): Guardamos el mensaje en el historial del menú lateral.
    // Usamos .unshift() para añadirlo al PRINCIPIO de la lista.
    titulosRecientes.unshift(mensaje);
    // Si la lista tiene más de 5 títulos, borramos el último (el más antiguo) con .pop().
    if (titulosRecientes.length > 5) {
        titulosRecientes.pop();
    }

    // PASO 4.C (NUEVO Y CRÍTICO): Actualizamos la pantalla y guardamos TODO en memoria.
    pintarChat(historialChat); // Repintamos el chat con el mensaje del usuario.
    actualizarHistorialLateral(); // Repintamos el menú lateral.
    // Usamos localStorage.setItem() para guardar los arrays en el "disco duro" del navegador.
    // Como solo podemos guardar TEXTO, usamos JSON.stringify() para convertir los arrays.
    localStorage.setItem('chatGuardado', JSON.stringify(historialChat));
    localStorage.setItem('titulosGuardados', JSON.stringify(titulosRecientes));

    // PASO 4.D: Limpiamos el input para que el usuario pueda escribir de nuevo.
    input.value = "";
    input.focus();

    // PASO 4.E (NUEVO): El efecto "IA Pensando...".
    let caja = document.getElementById('caja-mensajes');
    // Añadimos un div temporal con el mensaje "Pensando...".
    caja.innerHTML += `
        <div class="msg-ia" id="mensaje-pensando">
            <b>IA MASTER:</b>
✍️ Pensando...
        </div>`;
    caja.scrollTop = caja.scrollHeight; // Hacemos scroll para que se vea.

    // PASO 4.F (NUEVO): Retrasamos la respuesta de la IA 1.5 segundos.
    // setTimeout() ejecuta el código que tiene dentro después de un tiempo (en milisegundos).
    setTimeout(() => {
        // 1. Buscamos el mensaje "Pensando..." por su ID y lo eliminamos.
        document.getElementById('mensaje-pensando').remove();
        
        // 2. ¡AQUÍ ESTÁ LA MAGIA! Llamamos a TU función para generar una respuesta inteligente.
        const textoRespuesta = generarRespuestaIA(mensaje);
        // Creamos el objeto de la IA y lo añadimos al historial.
        historialChat.push({ rol: "ia", texto: textoRespuesta });

        // 3. Volvemos a pintar y a guardar para que la respuesta final de la IA aparezca y se guarde.
        pintarChat(historialChat);
        localStorage.setItem('chatGuardado', JSON.stringify(historialChat));
    }, 1500); // 1500ms = 1.5 segundos
}


// =====================================================================
// 5. FUNCIONES DE FILTROS Y BOTONES
// =====================================================================

// Función que muestra todos los mensajes sin ningún filtro.
function mostrarTodo() {
    pintarChat(historialChat);
}

// Función que filtra el array para mostrar solo los mensajes del usuario.
function verMisMensajes() {
    // .filter() crea un nuevo array temporal solo con los elementos que cumplen la condición.
    const misMensajes = historialChat.filter(mensaje => mensaje.rol === 'usuario');
    pintarChat(misMensajes);
}

// Función que transforma los textos a mayúsculas.
function modoGritar() {
    // .map() crea un nuevo array transformando cada elemento.
    const mensajesEnMayusculas = historialChat.map(mensaje => {
        return {
            rol: mensaje.rol,
            texto: mensaje.texto.toUpperCase()
        };
    });
    pintarChat(mensajesEnMayusculas);
}

/**
 * Función para vaciar por completo el historial del chat (MEJORADA).
 */
function borrarChat() {
    // PASO 1: Vaciamos AMBOS arrays para limpiar la lógica.
    historialChat = [];
    titulosRecientes = [];
    
    // PASO 2 (NUEVO): Eliminamos las llaves del "disco duro" del navegador.
    // Si no hacemos esto, al recargar la página, volvería a aparecer el chat antiguo.
    localStorage.removeItem('chatGuardado');
    localStorage.removeItem('titulosGuardados');
    
    // PASO 3: Le decimos a la interfaz que se vuelva a pintar.
    // Como los arrays ahora están vacíos, todo se borrará de la pantalla.
    pintarChat(historialChat);
    actualizarHistorialLateral();
}

/**
 * Función para buscar una palabra o frase en los mensajes del chat.
 */
function buscarMensaje() {
    // PASO 1: Atrapamos el texto del input del buscador.
    // Usamos el ID 'input-buscador' que estandarizamos en el HTML.
    let palabraBuscada = document.getElementById('input-buscador').value.toLowerCase();

    // PASO 2: Usamos .filter() para crear un nuevo array con los mensajes que incluyen la palabra.
    let resultados = historialChat.filter(msj => {
        return msj.texto.toLowerCase().includes(palabraBuscada);
    });

    // PASO 3: Pintamos en la pantalla ÚNICAMENTE los resultados encontrados.
    pintarChat(resultados);
}
