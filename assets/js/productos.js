const Registrar = document.getElementById('registrar');

Registrar.addEventListener('click', (e) => {
  e.preventDefault();
  const descripcion = document.getElementById('descripcion');
  const proveedor = document.getElementById('proveedor');
  const codigo = document.getElementById('codigo');
  const tipo = document.getElementById('tipo');
  const precio = document.getElementById('precio');


  if (descripcion.value == '') {
    descripcionError.innerHTML = 'Error, el campo descripcion no debe estar vacío';
  }

  if (proveedor.value == '') {
    proveedorError.innerHTML = 'Error, el campo proveedor no debe estar vacío';
  }
  if (codigo.value == '') {
    codigodError.innerHTML = 'Error, el campo codigo no debe estar vacío';
  }
  if (tipo.value == '') {
    tipoError.innerHTML = 'Error, el campo tipo no debe estar vacío';
  }
  if (precio.value == '') {
    precioError.innerHTML = 'Error, el campo precio no debe estar vacío';
  }
    
    if (descripcion.value != '' && proveedor.value != '' && codigo.value != '' && tipo.value != '' && precio.value != '') {
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

const productosMostrados = document.getElementById('productosMostrados');
const btnProductos =document.getElementById('btnProductos');
const datos =document.getElementById('datos');


btnProductos.addEventListener('click', () => {
  fetch('http://localhost:8080/productos')
  .then(data => data.json())
  .then(data =>{
    productos=data;
    mostrarProducto(productos)
  })
});

function mostrarProducto (productos) {
  
  productos.map((producto) => {
    
    let descripcion =document.createElement('th');
    descripcion.innerHTML= producto.descripcion
    datos.appendChild(descripcion);
    

   
   
  
})


};
  









      
        

 