const Registrar= document.getElementById('registrarVenta');

Registrar.addEventListener('click', (e) => {
 
  e.preventDefault();
  const descripcion = document.getElementById('descripcion');
  const producto = document.getElementById('producto');
  const status = document.getElementById('status');
  const vendedor = document.getElementById('vendedor');
  const cantidadP = document.getElementById('cantidadP');
  const cliente = document.getElementById('cliente');
  const fecha = document.getElementById('fecha');

  
if (descripcion.value == '' , producto.value == '', status.value == '' , vendedor.value == '', cantidadP.value == '', cliente.value =='', fecha.value=='') {
  alert("Por favor complete todos los campos");
}
  
if (descripcion.value != '' && producto.value != '' && status.value != '' && vendedor.value != '' && cantidadP.value != '' && cliente.value!='' && fecha.value!= '') {
  
  toastr["success"]('El registro de la venta ha sido exitoso', 'Exito')

    fetch('http://localhost:8080/Ventas', {
      method: 'POST',
      body: JSON.stringify({
        descripcion: descripcion.value,
        producto: producto.value,
        status: status.value,
        vendedor: vendedor.value,
        cantidadP: cantidadP.value,
        cliente: cliente.value,
        fecha: fecha.value
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((resp) => {
      console.log(resp);
      descripcion.value='';
      producto.value='';
      status.value='';
      vendedor.value='';
      cantidadP.value='';
      cliente.value='';
      fecha.value='';
    });
  }
});

/*FUNCION PARA TRAER LOS DATOS POR FETCH Y ALOJARLOS EN TABLA */
const btnVentas = document.getElementById('btnVentas');
const results = document.getElementById('results')

btnVentas.addEventListener('click', () => {
  fetch('http://localhost:8080/Ventas')
    .then(data => data.json())
    .then(data => {
        venta = data;
      mostrarVentas(venta)
    })
});

/*AQUÍ MAQUETEMOS EL HTML, MEDIANTE EL PARAMETRO productos que almacena el ARRAY de la DB*/
const mostrarVentas = (venta) => {

//RECUERDA QUE EL MAP REGRESA UN NUEVO ARREGLO, ES DECIR, EL API MANDA UN ARREGLO PERO EL MAP CREA UNO NUEVO Y DEBEMOS AJUSTARLO
  const htmlString = venta.map((ventas) => {
    return`<tr>
      <td id="td1"> ${ventas.id}</td>
      <td> ${ventas.descripcion}</td>
      <td> ${ventas.fecha}</td>
      <td> ${ventas.producto}</td>
      <td> ${ventas.status}</td>
      <td> ${ventas.vendedor}</td>
      <td> ${ventas.cantidad}</td>
      <td> ${ventas.cliente}</td>
      <td>
      <button type="button" class="btn btn-warning mr-1" id="editar" onclick="update(${ventas.id})">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
    </svg></button>  
    <td><button type="button" class="btn btn-danger" id="eliminar" onclick="eliminar(${ventas.id})">
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
