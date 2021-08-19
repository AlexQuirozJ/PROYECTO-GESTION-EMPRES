/*FUNCION PARA ENVIAR LOS DATOS POR EL FORMULARIO Y SE ALMACENEN EN LA DB JAVA*/
const Registrar = document.getElementById('registrar');

Registrar.addEventListener('click', (e) => {
  e.preventDefault();
  const descripcion = document.getElementById('descripcion');
  const proveedor = document.getElementById('proveedor');
  const codigo = document.getElementById('codigo');
  const tipo = document.getElementById('tipo');
  const precio = document.getElementById('precio');

  // Faltaba agregar donde estan los de error
  const descripcionError = document.getElementById('descripcionError');
  const proveedorError = document.getElementById('proveedorError');
  const codigodError = document.getElementById('codigodError');
  const tipoError = document.getElementById('tipoError');
  const precioError = document.getElementById('precioError');

  // Limpias los mensajes de error antes
  descripcionError.innerHTML = '';
  proveedorError.innerHTML = '';
  codigodError.innerHTML = '';
  tipoError.innerHTML = '';
  precioError.innerHTML = '';

  // validas uno por uno y inicializas esta bandera de error como false
  let error = false;

  if (descripcion.value === '') {
    // ya llenas solo los que fallen
    descripcionError.innerHTML = 'Error, el campo descripcion no debe estar vacío';
    error = true;
  }

  if (proveedor.value === '') {
    proveedorError.innerHTML = 'Error, el campo proveedor no debe estar vacío';
    error = true;
  }

  if (codigo.value === '') {
    codigodError.innerHTML = 'Error, el campo codigo no debe estar vacío';
    error = true;
  }

  if (tipo.value === '') {
    tipoError.innerHTML = 'Error, el campo tipo no debe estar vacío';
    error = true;
  }

  if (precio.value === '') {
    precioError.innerHTML = 'Error, el campo precio no debe estar vacío';
    error = true;
  }

  // así ya solo checas la bandera en vez de volver a validar los datos
  if (!error) {
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
      </tr>
    `;
  
    // retornas todo el tr con sus td a htmlString
  
  }).join('');;

  //INSERTAMOS LOS DATOS EN EL HTML POR EL ID
  results.innerHTML = htmlString;
};












