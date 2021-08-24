/*FUNCION PARA ENVIAR LOS DATOS POR EL FORMULARIO Y SE ALMACENEN EN LA DB JAVA*/
const Registrar = document.getElementById('registrar');
const alertt =document.getElementById('alertt');

Registrar.addEventListener('click', (e) => {
 
  e.preventDefault();
  const descripcion = document.getElementById('descripcion');
  const proveedor = document.getElementById('proveedor');
  const codigo = document.getElementById('codigo');
  const tipo = document.getElementById('tipo');
  const precio = document.getElementById('precio');

  
if (descripcion.value == '' , proveedor.value == '', codigo.value == '' , tipo.value == '', precio.value == '') {
  alert("Por favor complete todos los campos");
}
  
if (descripcion.value != '' && proveedor.value != '' && codigo.value != '' && tipo.value != '' && precio.value != '') {
  
  toastr["success"]('El registro de su producto ha sido exitoso', 'Exito')

    fetch('http://localhost:8080/productos', {
      method: 'POST',
      body: JSON.stringify({
        descripcion: descripcion.value,
        proveedor: proveedor.value,
        codigo: codigo.value,
        tipo: tipo.value,
        precio: precio.value
      }),
      headers: {
        'Content-Type': 'application/json',
        
      },
      
    }).then((resp) => {
      console.log(resp);
      
      
    });
    
  }
});

/*FUNCION PARA TRAER LOS DATOS POR FETCH Y ALOJARLOS EN TABLA */
const btnProductos = document.getElementById('btnProductos');
const results = document.getElementById('results')
const miElementoCheckbox = document.getElementById('miElementoCheckbox')

btnProductos.addEventListener('click', () => {
  fetch('http://localhost:8080/productos')
    .then(data => data.json())
    .then(data => {
      productos = data;
      mostrarProducto(productos)
    })
});

/*AQUÍ MAQUETEMOS EL HTML, MEDIANTE EL PARAMETRO productos que almacena el ARRAY de la DB*/
const mostrarProducto = (productos) => {

//RECUERDA QUE EL MAP REGRESA UN NUEVO ARREGLO, ES DECIR, EL API MANDA UN ARREGLO PERO EL MAP CREA UNO NUEVO Y DEBEMOS AJUSTARLO
  const htmlString = productos.map((producto) => {
    return`<tr>
      <td id="td1"> ${producto.id}</td>
      <td> ${producto.descripcion}</td>
      <td> ${producto.proveedor}</td>
      <td> ${producto.tipo}</td>
      <td> ${producto.precio}</td>
      <td> ${producto.codigo}</td>
      <td>
      <button type="button" class="btn btn-warning mr-1" id="editar" onclick="update(${producto.id})">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
    </svg></button>  
    <td><button type="button" class="btn btn-danger" id="eliminar" onclick="eliminar(${producto.id})">
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


//FUNCIONES PARA ELIMINAR UN REGISTRO Y ACTUALIZAR LA TABLA CON LOS RESTANTES

//Creas una funcion y le pasas el parametro id con el que se identificara la URL
const alert2=document.getElementById('alert2');
async function eliminar(productoId){
  fetch('http://localhost:8080/productos/'+productoId, {
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
  const products=await fetch('http://localhost:8080/productos/');
  const productos=await products.json();
  results.innerHTML = "";
  productos.forEach(producto => {
    if(producto.id != productoId){
      results.innerHTML += `<tr>
      <td id="td1"> ${producto.id}</td>
      <td> ${producto.descripcion}</td>
      <td> ${producto.proveedor}</td>
      <td> ${producto.tipo}</td>
      <td> ${producto.precio}</td>
      <td> ${producto.codigo}</td>
      <td>
      <button type="button" class="btn btn-warning" id="editar" onclick="update(${producto.id})">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
    </svg></td></button> </td>  
    <td><button type="button" class="btn btn-danger" id="eliminar" onclick="eliminar(${producto.id})">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
    </svg></button>
      </td>
      </tr>`
    }
    
  });
}





















