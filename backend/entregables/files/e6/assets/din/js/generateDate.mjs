const generateDate = () => {
    const añoActual = new Date().getFullYear();

    const fechaInicio = new Date(añoActual, 8, 1);
    const fechaFin = new Date();

    const diferenciaEnMilisegundos = fechaFin - fechaInicio;

    const milisegundosAleatorios = Math.random() * diferenciaEnMilisegundos;

    const fechaAleatoria = new Date(fechaInicio.getTime() + milisegundosAleatorios);

    // Formatear la fecha
    const dia = fechaAleatoria.getDate();
    const mes = fechaAleatoria.getMonth() + 1;
    const año = fechaAleatoria.getFullYear();


    return `${dia}/${mes}/${año}`;
}