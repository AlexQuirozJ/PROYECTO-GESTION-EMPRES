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
    $('.alert').show()
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
      <td><div class="form-check">
      <input class="form-check-input position-static" type="checkbox" id="blankCheckbox" aria-label="...">
    </div></td>
      </tr>
      
    `;
  
    // retornas todo el tr con sus td a htmlString
  
  }).join('');;

  //INSERTAMOS LOS DATOS EN EL HTML POR EL ID
  results.innerHTML = htmlString;
};


//FUNCIONES PARA ELIMINAR Y ACTUALIZAR

//meter una funcion, al dar click en el check, almacena el valor del id en id.value
//luego lo metes en la función de abajo y listo

const eliminar = document.getElementById('eliminar');

eliminar.addEventListener('click', ()=> {
  fetch(`http://localhost:8080/productos/${id}`, {
      method: 'DELETE',
      body: JSON.stringify({
        id:id.value
      }),
      headers: {
        'Content-Type': 'application/json',
        
      },
      
    }).then((resp) => {
      console.log(resp);
    });
    
  }
);












