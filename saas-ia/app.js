// 1. NUESTRA BASE DE DATOS MOCK
// Array de objetos [ rol , texto ]
let historialChat = [
    { rol: "ia", texto: "¡Hola! Soy IA Master. ¿En qué te ayudo?"},
    { rol: "usuario", texto: "Quiero aprender JavaScript"},
    { rol: "ia", texto: "¡Excelente elección! Empezaremos por los Arrays."}
];

//2. LA FUNCION PINTORA (Visual)
// Esta función recibe una lista (nuestro array) y lo dibuja en la pantalla
function pintarChat(listaMensajes){
    // PASO 1 = Buscamos en el HTML la etiqueta donde vamos a meter los mensajes
    let caja = document.getElementById('caja-mensajes');
    // PASO 2 = Borramos la pizarra.
    // Si no hacemos esto, cada vez que enviemos un mensajes nuevo,
    // se volverá a pintar todo el historial antiguo
    caja.innerHTML = "";
    // PASO 3: EL TRABAJADOR VIRTUAL (El bucle FOR)
    // MATENEMOS EL BUCLE FOR QUE APRENDIMOS AYER
    // Le decimos que dé tantas vueltas como mensajes haya en la lista.
    // (listaMensajes.length)
    for(let i = 0; i < listaMensajes.length;i++){
        // PASO 4 : EL CONDICIONAL TERNARIO (Un "IF" resumido en una linea)
        // Le preguntamos: ¿El rol de este mensaje es "usuario"?
        // Si es true(?) -> usamos la clase verde("msg-usuario")
        // Si es false(:) -> usaos la clase gris ("msg-ia")
        let claseCSS = listaMensajes[i].rol === "usuario" ? "msg-usuario" : "msg-ia";
        // PASO 5 : INYECTAR EL HTML (Usando comillas invertidas ``)
        // Las comillas invertidas nos permiten meter variables de JS dentro del HTML
        // usando el símbolo de dólar y las llaves ${...}.
        // caja.innerHTML += significa "añade este bloque al final de lo que haya"
        caja.innerHTML +=
                             `<div class = "${claseCSS}">
                             <b>${listaMensajes[i].rol.toUpperCase()}:</b>

                             ${listaMensajes[i].texto}</div>
                             `;
    }
    // PASO 6 : EL AUTO-SCROLL (El truco de Whatsapp)
    // Le decimos a la caja que baje su barra de desplazamiento hasta el fondo
    // Para que siempre veamos el último mensaje enviado
    caja.scrollTop = caja.scrollHeight;
}

// 3. LA FUNCIÓN DE ENVÍO (Lógica)
function enviarPrompt(event) {
    // Evitamos que la pagina web parpadee y se recargue al enviar el formuario
    event.preventDefault();
    // Atrapamos la cajita de texto donde el usuario escribe
    let input = document.getElementById('mensaje-input');

    // Sacamos el texto que ha escrito y le quitamos los espacios en blanco
    // con .trim()
    let mensaje = input.value.trim();

    //2. Condicional
    if (mensaje === "") {
        alert("⚠️¡Error! Escribe algo primero");
        // El return expulsa a JS de la funcion para no siga leyendo
        return;
    }
    // a) Guardamos el mensaje real del usuario
    let nuevoMensaje = { rol: "usuario", texto: mensaje};
    historialChat.push(nuevoMensaje);// Lo metemos al final del Array
    // b) EL TRUCO : Simulamos que la IA nos responde al instante creando otro objeto
    let respuestaIA = { rol: "ia", texto: "Estoy procesando tu mensaje: '" + mensaje + "'"};
    historialChat.push(respuestaIA);

    // c) Como el array ha cambiado (Tiene dos mensajes más), obligamos a la web repintarse
    pintarChat(historialChat);
    // d) Limpiamos el texto que quedo escrito en el input
    input.value = "";
    input.focus();
}


// =====================================================================
// 4. FUNCIONES DE FILTROS (Clase anterior)
// =====================================================================

// Función que muestra todos los mensajes sin ningún filtro.
function mostrarTodo() {
    pintarChat(historialChat);
}

// Función que filtra el array para mostrar solo los mensajes del usuario.
function verMisMensajes() {
    // .filter() crea un nuevo array temporal solo con los elementos que cumplen la condición.
    const misMensajes = historialChat.filter(mensaje => mensaje.rol === 'usuario');
    pintarChat(misMensajes); // Pintamos solo ese nuevo array filtrado.
}

// Función que transforma los textos a mayúsculas.
function modoGritar() {
    // .map() crea un nuevo array transformando cada elemento.
    const mensajesEnMayusculas = historialChat.map(mensaje => {
        // Devolvemos un nuevo objeto con el texto en mayúsculas.
        return {
            rol: mensaje.rol,
            texto: mensaje.texto.toUpperCase()
        };
    });
    pintarChat(mensajesEnMayusculas);
}


// =====================================================================
// 5. ¡NUEVAS FUNCIONES DEL RETO DE HOY!
// =====================================================================

/**
 * Función para vaciar por completo el historial del chat.
 */
function borrarChat() {
    // PASO 1: Vaciamos el array principal. La forma más simple es reasignarlo a un array vacío.
    historialChat = [];
    
    // PASO 2: Le decimos a la interfaz que se vuelva a pintar.
    // Como el array ahora está vacío, la función pintarChat() borrará todo de la pantalla.
    pintarChat(historialChat);
    
    // (Opcional) Un mensaje en consola para saber que todo fue bien.
    console.log("Historial de chat borrado correctamente.");
}

/**
 * Función para buscar una palabra o frase en los mensajes del chat.
 */
function buscarMensaje() {
    // PASO 1: Atrapamos el input de búsqueda y obtenemos el texto que el usuario escribió.
    let terminoBusqueda = document.getElementById('input-busqueda').value;

    // PASO 2: Convertimos todo a minúsculas para que la búsqueda no sea sensible a mayúsculas/minúsculas.
    // También limpiamos espacios con .trim()
    terminoBusqueda = terminoBusqueda.toLowerCase().trim();

    // PASO 3: Validamos que el usuario haya escrito algo.
    if (terminoBusqueda === "") {
        alert("Por favor, escribe algo en el buscador.");
        return; // Salimos de la función si no hay nada que buscar.
    }

    // PASO 4: Usamos .filter() para crear un NUEVO array solo con los mensajes que coinciden.
    let resultados = historialChat.filter(mensaje => {
        // Para cada mensaje, convertimos su texto a minúsculas y...
        // ...usamos .includes() para comprobar si el 'terminoBusqueda' está dentro del texto.
        // Si .includes() devuelve 'true', el mensaje se guarda en el nuevo array 'resultados'.
        return mensaje.texto.toLowerCase().includes(terminoBusqueda);
    });

    // PASO 5: Pintamos en la pantalla ÚNICAMENTE los resultados encontrados.
    pintarChat(resultados);
    
    console.log(`Búsqueda: "${terminoBusqueda}". Resultados encontrados: ${resultados.length}.`);
}


// =====================================================================
// Carga Inicial: Al abrir la página, pintamos el chat por primera vez.
// =====================================================================
pintarChat(historialChat);
