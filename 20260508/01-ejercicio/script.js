const sonidoClick = new Audio('click.mp3');

function jugar() {
    sonidoClick.pause();
    sonidoClick.currentTime = 0;
    sonidoClick.play().catch(error => {
        console.error('Error al reproducir sonido:', error);
    });
    
    console.log('Botón presionado');
}