import { autos } from "./db.js";
//console.log(autos);
//Variables
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

//Contenedor para los resultados
const resultado = document.querySelector('#resultado');

const max = new Date().getFullYear();
const min = max - 10;

//Generar un objeto de la busqueda
const datoBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: '',
}
//Eventos
document.addEventListener('DOMContentLoaded', () => {

    mostrarAutos(autos);
    //Llena las opciones de años
    llenarSelect();
});

//Event listener para los select de busqueda
marca.addEventListener('change', e => {
    datoBusqueda.marca = e.target.value;

    filtrarAuto();
});

year.addEventListener('change', e => {
    datoBusqueda.year = parseInt(e.target.value);

    filtrarAuto();

});

minimo.addEventListener('change', e => {
    datoBusqueda.minimo = e.target.value;

    filtrarAuto();
});

maximo.addEventListener('change', e => {
    datoBusqueda.maximo = e.target.value;

    filtrarAuto();
});

puertas.addEventListener('change', e => {
    datoBusqueda.puertas = parseInt(e.target.value);

    filtrarAuto();
});

transmision.addEventListener('change', e => {
    datoBusqueda.transmision = e.target.value;

    filtrarAuto();
});

color.addEventListener('change', e => {
    datoBusqueda.color = e.target.value;
    
    filtrarAuto();
});



//funciones
function mostrarAutos(autos) {

    limpiarHTML();//Elimina el HTML previo

    autos.forEach(auto => {

        const autoHTML = document.createElement('p');

        const { marca, modelo, year, puertas, transmision, precio, color } = auto;
        autoHTML.textContent = `
            ${marca} ${modelo} - ${year} - Puertas: ${puertas} - Transmision: ${transmision}
             - Color: ${color} - Precio: ${precio}

         `
        //Insertar HTML
        resultado.appendChild(autoHTML);
    });

};

//Limpiar HTML
function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

//Genera los años del select
function llenarSelect() {
    for (let i = max; i >= min; i--) {
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion); //Agrega las opciones de año al select

    }
}


//Funcion que filtra a base a la busqueda
function filtrarAuto() {
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(
        filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor);


    if (resultado.length) {
        mostrarAutos(resultado);
    } else {
        noResultado();
    }
}

function noResultado() {

    limpiarHTML();

    const noResultado = document.createElement('div');
    noResultado.classList.add( 'error');
    noResultado.textContent = 'No hay resultados';
    resultado.appendChild(noResultado);

}

function filtrarMarca(auto) {
    const { marca } = datoBusqueda;
    if (marca) {
        return auto.marca === marca;
    }
    return auto;

}

function filtrarYear(auto) {
    const { year } = datoBusqueda;
    if (year) {
        return auto.year === year;
    }
    return auto;
}

function filtrarMinimo(auto) {
    const { minimo } = datoBusqueda;
    if (minimo) {
        return auto.precio >= minimo;
    }
    return auto;
}

function filtrarMaximo(auto) {
    const { maximo } = datoBusqueda;
    if (maximo) {
        return auto.precio <= maximo;
    }
    return auto;
}

function filtrarPuertas(auto) {
    const { puertas } = datoBusqueda;
    if (puertas) {
        return auto.puertas === puertas;
    }
    return auto;
}

function filtrarTransmision(auto) {
    const { transmision } = datoBusqueda;
    if (transmision) {
        return auto.transmision === transmision;
    }
    return auto;
}

function filtrarColor(auto) {
    const { color } = datoBusqueda;
    if (color) {
        return auto.color === color;
    }
    return auto;
}