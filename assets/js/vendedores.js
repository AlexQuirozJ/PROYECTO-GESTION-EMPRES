const Registrar= document.getElementById('registrarv');

Registrar.addEventListener('click', (e) => {
 
  e.preventDefault();
  const nombre = document.getElementById('nombre');
  const apellidos = document.getElementById('apellidos');
  const area = document.getElementById('area');
  const genero = document.getElementById('genero');
  const fotografia = document.getElementById('fotografia');

  
if (nombre.value == '' , apellidos.value == '', area.value == '' , genero.value == '', fotografia.value == '') {
  alert("Por favor complete todos los campos");
}
  
if (nombre.value != '' && apellidos.value != '' && area.value != '' && genero.value != '' && fotografia.value != '') {
  
  toastr["success"]('El registro del vendedor ha sido exitoso', 'Exito')

    fetch('http://localhost:8080/Vendedores', {
      method: 'POST',
      body: JSON.stringify({
        nombre: nombre.value,
        apellidos: apellidos.value,
        area: area.value,
        genero: genero.value,
        fotografia: fotografia.value
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((resp) => {
      console.log(resp);
      nombre.value='';
      apellidos.value='';
      area.value='';
      genero.value='';
      fotografia.value='';
    });
  }
});

/*FUNCION PARA TRAER LOS DATOS POR FETCH Y ALOJARLOS EN TABLA */
const btnVendedores = document.getElementById('btnVendedores');
const results = document.getElementById('results')

btnVendedores.addEventListener('click', () => {
  fetch('http://localhost:8080/Vendedores')
    .then(data => data.json())
    .then(data => {
        vendedor = data;
      mostrarVendedores(vendedor)
    })
});

/*AQUÍ MAQUETEMOS EL HTML, MEDIANTE EL PARAMETRO productos que almacena el ARRAY de la DB*/
const mostrarVendedores = (vendedor) => {

//RECUERDA QUE EL MAP REGRESA UN NUEVO ARREGLO, ES DECIR, EL API MANDA UN ARREGLO PERO EL MAP CREA UNO NUEVO Y DEBEMOS AJUSTARLO
  const htmlString = vendedor.map((vendedores) => {
    return`<tr>
      <td id="td1"> ${vendedores.id}</td>
      <td> ${vendedores.nombre}</td>
      <td> ${vendedores.apellidos}</td>
      <td> ${vendedores.genero}</td>
      <td> ${vendedores.area}</td>
      <td><a><img src="${vendedores.fotografia}" width="80px" height="80px"></a></td>
      <td>
      <button type="button" class="btn btn-warning mr-1" id="editar" onclick="update(${vendedores.id})">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
    </svg></button>  
    <td><button type="button" class="btn btn-danger" id="eliminar" onclick="eliminar(${vendedores.id})">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
    </svg></button>
      </td></tr>
     `;
    // retornas todo el tr con sus td a htmlString
  }).join('');;

  //INSERTAMOS LOS DATOS EN EL HTML POR EL ID
  results.innerHTML = htmlString;
};


async function eliminar(vendedoresId){
  fetch('http://localhost:8080/Vendedores/'+vendedoresId, {
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
  const vended=await fetch('http://localhost:8080/Vendedores/');
  const vendedor=await vended.json();
  results.innerHTML = "";
  vendedor.forEach(vendedores => {
    if(vendedores.id != vendedoresId){
      results.innerHTML += `<tr>
      <td id="td1"> ${vendedores.id}</td>
      <td> ${vendedores.nombre}</td>
      <td> ${vendedores.apellidos}</td>
      <td> ${vendedores.genero}</td>
      <td> ${vendedores.area}</td>
      <td><a><img src="${vendedores.fotografia}" width="80px" height="80px"></a></td>
      <td>
      <button type="button" class="btn btn-warning" id="editar" onclick="update(${vendedores.id})">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
    </svg></td></button> </td>  
    <td><button type="button" class="btn btn-danger" id="eliminar" onclick="eliminar(${vendedores.id})">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
    </svg></button>
      </td>
      </tr>`
    }
    
  });
}
