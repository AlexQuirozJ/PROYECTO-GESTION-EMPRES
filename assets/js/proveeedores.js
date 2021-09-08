const Registrar= document.getElementById('registrarp');

Registrar.addEventListener('click', (e) => {
 
  e.preventDefault();
  const descripcion = document.getElementById('descripcion');
  const direccion = document.getElementById('direccion');
  const contacto = document.getElementById('contacto');
  const email = document.getElementById('email');
  const telefono = document.getElementById('telefono');
  const producto = document.getElementById('producto');

  
if (descripcion.value == '' , direccion.value == '', producto.value=='', contacto.value == '' , email.value == '', telefono.value == '') {
  toastr["error"]("Por favor complete todos los campos!")
}
  
if (descripcion.value != '' && direccion.value != '' && producto.value!=''&& contacto.value != '' && email.value != '' && telefono.value != '') {
  
  toastr["success"]('El registro del proveedor ha sido exitoso', 'Exito')

    fetch('http://localhost:8080/Proveedores', {
      method: 'POST',
      body: JSON.stringify({
        descripcion: descripcion.value,
        direccion: direccion.value,
        contacto: contacto.value,
        email: email.value,
        telefono: telefono.value,
        producto: producto.value
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((resp) => {
      console.log(resp);
      descripcion.value='';
      direccion.value='';
      contacto.value='';
      email.value='';
      telefono.value='';
      producto.value='';
    });
  }
});

/*FUNCION PARA TRAER LOS DATOS POR FETCH Y ALOJARLOS EN TABLA */
const btnProveedores = document.getElementById('btnProveedores');
const results = document.getElementById('results')
const miElementoCheckbox = document.getElementById('miElementoCheckbox')

btnProveedores.addEventListener('click', () => {
  fetch('http://localhost:8080/Proveedores')
    .then(data => data.json())
    .then(data => {
        proveedor = data;
      mostrarProducto(proveedor)
    })
});

/*AQUÍ MAQUETEMOS EL HTML, MEDIANTE EL PARAMETRO productos que almacena el ARRAY de la DB*/
const mostrarProducto = (proveedor) => {

//RECUERDA QUE EL MAP REGRESA UN NUEVO ARREGLO, ES DECIR, EL API MANDA UN ARREGLO PERO EL MAP CREA UNO NUEVO Y DEBEMOS AJUSTARLO
  const htmlString = proveedor.map((proveedores) => {
    return`<tr>
      <td id="td1"> ${proveedores.id}</td>
      <td> ${proveedores.descripcion}</td>
      <td> ${proveedores.direccion}</td>
      <td> ${proveedores.contacto}</td>
      <td> ${proveedores.email}</td>
      <td> ${proveedores.telefono}</td>
      <td> ${proveedores.producto}</td>
      <td>
      <button type="button" class="btn btn-warning mr-1" id="editar" onclick="update(${proveedores.id})">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
    </svg></button>  
    <td><button type="button" class="btn btn-danger" id="eliminar" onclick="eliminar(${proveedores.id})">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
    </svg></button>
      </td>
      </tr>
     `;
    // retornas todo el tr con sus td a htmlString
  }).join('');;

  //INSERTAMOS LOS DATOS EN EL HTML POR EL ID
  results.innerHTML = htmlString;
};


//FUNCION PARA ELIMINAR UN REGISTRO Y ACTUALIZAR LA TABLA CON LOS RESTANTES

async function eliminar(proveedoresId){
  fetch('http://localhost:8080/Proveedores/'+proveedoresId, {
    method:'DELETE'
    
  })
  .then(data => console.log(data));
  if(fetch!=''){
    toastr["info"]("Registro eliminado con exito!", "Exito")
    toastr.options = {
      "closeButton": false,
      "debug": false,
      "newestOnTop": false,
      "progressBar": true,
      "positionClass": "toast-top-right",
      "preventDuplicates": false,
      "showDuration": "300",
      "hideDuration": "1000",
      "timeOut": "5000",
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    }

   
  }else {
    alert("el registro no ha sido eliminado");
  }

  //Cuando ya se elimino el registro, entonces recorres (producto) para que ahora genere una tabla con los
  //registros que ya sobraron, se vuele a meter el metodo fetch porque cuando ya se elimino, entonces tu vuelves a consultar todo por GET
  const prov=await fetch('http://localhost:8080/Proveedores/');
  const proveedor=await prov.json();
  results.innerHTML = "";
  proveedor.forEach(proveedores => {
    if(proveedores.id != proveedoresId){
      results.innerHTML += `<tr>
      <td id="td1"> ${proveedores.id}</td>
      <td> ${proveedores.descripcion}</td>
      <td> ${proveedores.direccion}</td>
      <td> ${proveedores.contacto}</td>
      <td> ${proveedores.email}</td>
      <td> ${proveedores.telefono}</td>
      <td> ${proveedores.producto}</td>
      <td>
      <button type="button" class="btn btn-warning" id="editar" onclick="update(${proveedores.id})">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
    </svg></td></button> </td>  
    <td><button type="button" class="btn btn-danger" id="eliminar" onclick="eliminar(${proveedores.id})">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
    </svg></button>
      </td>
      </tr>`
    }
    
  });
}