// --- CÓDIGO DE SONIDO AÑADIDO ---
const sonidoClick = new Audio('click.mp3');

// --- CÓDIGO DEL PROFESOR (con variables globales) ---
// GENERAR NÚMERO ALEATORIO
// Math.random() genera un número entre 0 y 0.99...
// * 10 => 0 y 9.99...
// Math.floor() elimina los decimales => 0 y 9
// + 1 => 1 y 10
let numeroSecreto = Math.floor(Math.random() * 10) + 1;
// Variables del juego
let vidas = 3;

// FUNCION PRINCIPAL
function comprobarNumero() {
    // --- CÓDIGO DE SONIDO ---
    sonidoClick.pause();
    sonidoClick.currentTime = 0;
    sonidoClick.play().catch(error => {
        console.error('Error al reproducir sonido:', error);
    });
    // --- FIN DEL CÓDIGO DE SONIDO ---

    let intento = Number(document.getElementById("input-numero").value);
    let etiqueta = document.getElementById("mensaje-salida");
    let textoVidas = document.getElementById("texto-vidas");

    // SI EL USUARIO GANA
    if (intento === numeroSecreto) {
        etiqueta.textContent = "¡Has GANADO! 🎉 El número era " + numeroSecreto;
        etiqueta.style.color = "green";
        document.getElementById("btn-jugar").disabled = true;
    
    // SI EL USUARIO FALLA
    } else {
        vidas--; // Restamos una vida

        // --- LÓGICA MODIFICADA ---
        // AHORA, PRIMERO COMPROBAMOS SI LE QUEDAN VIDAS
        
        if (vidas > 0) {
            // 1. SI AÚN TIENE VIDAS, MOSTRAMOS LA PISTA
            textoVidas.textContent = "Vidas: " + vidas + " ❤️";
            
            if (intento < numeroSecreto) {
                etiqueta.textContent = "¡Fallo! El número secreto es MAYOR.";
            } else {
                etiqueta.textContent = "¡FALLO! El número secreto es MENOR.";
            }
            etiqueta.style.color = "orange";

        } else {
            // 2. SI NO LE QUEDAN VIDAS (vidas es 0), MOSTRAMOS GAME OVER
            textoVidas.textContent = "Vidas: 0 ❤️";
            etiqueta.textContent = "💀 GAME OVER. El número era " + numeroSecreto;
            etiqueta.style.color = "red";
            document.getElementById("btn-jugar").disabled = true;
        }
        // --- FIN DE LA LÓGICA MODIFICADA ---
    }
}