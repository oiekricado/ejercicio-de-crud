let listaInformacion = [];

const objInformacion = {
    id: '',
    nombre: '',
    descripcion: ''
}

let editando = false;

const formulario = document.querySelector('#formulario');
const nombreInput = document.querySelector('#nombre');
const DescripcionInput = document.querySelector('#descripcion');
const btnAgregarInput = document.querySelector('#btnAgregar');

formulario.addEventListener('submit', validarFormulario);

function validarFormulario(e) {
    e.preventDefault();

    if(nombreInput.value === '' || DescripcionInput.value === '') {
        alert('Todos los campos se deben llenar');
        return;
    }

    if(editando) {
        editarinformacion();
        editando = false;
    } else {
        objInformacion.id = Date.now();
        objInformacion.nombre = nombreInput.value;
        objInformacion.puesto = DescripcionInput.value;

        agregarInformacion();
    }
}





function agregarInformacion() {

    listaInformacion.push({...objInformacion});

    mostrarInformacion();

    formulario.reset();
    limpiarObjeto();
}


function limpiarObjeto() {
    objInformacion.id = '';
    objInformacion.nombre = '';
    objInformacion.descripcion = '';
}

function mostrarInformacion() {
    limpiarHTML();

    const divInformacion = document.querySelector('.div-informacion');
    
    listaInformacion.forEach(informacion => {
        const {id, nombre, descripcion} = informacion;

        const parrafo = document.createElement('p');
        parrafo.textContent = `${id} - ${nombre} - ${descripcion} - `;
        parrafo.dataset.id = id;

        const editarBoton = document.createElement('button');
        editarBoton.onclick = () => cargarInformacion(informacion);
        editarBoton.textContent = 'Editar';
        editarBoton.classList.add('btn', 'btn-editar');
        parrafo.append(editarBoton);

        const eliminarBoton = document.createElement('button');
        eliminarBoton.onclick = () => eliminaInformacion(id);
        eliminarBoton.textContent = 'Eliminar';
        eliminarBoton.classList.add('btn', 'btn-eliminar');
        parrafo.append(eliminarBoton);

        const hr = document.createElement('hr');

        divInformacion.appendChild(parrafo);
        divInformacion.appendChild(hr);
    });
}








function cargarInformacion(informacion) {
    const {id, nombre, descripcion} = informacion;

    nombreInput.value = nombre;
    DescripcionInput.value = descripcion;

    objInformacion.id = id;

    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar';
    
    editando = true;
}











function editarinformacion() {

    objInformacion.nombre = nombreInput.value;
    objInformacion.descripcion = DescripcionInput.value;

    listaInformacion.map(informacion => {

        if(informacion.id === objInformacion.id) {
            informacion.id = objInformacion.id;
            informacion.nombre = objInformacion.nombre;
            informacion.descripcion = objInformacion.descripcion;

        }

    });

    limpiarHTML();
    mostrarInformacion();
    formulario.reset();

    formulario.querySelector('button[type="submit"]').textContent = 'Agregar';
    
    editando = false;
}







function eliminaInformacion(id) {

    listaInformacion = listaInformacion.filter(empleado => empleado.id !== id);

    limpiarHTML();
    mostrarInformacion();
}

function limpiarHTML() {
    const divInformacion = document.querySelector('.div-informacion');
    while(divInformacion.firstChild) {
        divInformacion.removeChild(divInformacion.firstChild);
    }
}