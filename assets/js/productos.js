const Resultados = document.querySelector('mis_resultados');
const Registrar = document.getElementById('registrar');

Registrar.addEventListener('click', (e) => {
  e.preventDefault();
  const descripcion = document.getElementById('descripcion');
  const proveedor = document.getElementById('proveedor');
  const codigo = document.getElementById('codigo');
  const tipo = document.getElementById('tipo');
  const precio = document.getElementById('precio');
  const mis_resultados = document.querySelector('mis_resultados');


  if (descripcion.value == '') {
    nameError.innerHTML = 'Error, el campo descripcion no debe estar vacío';
  }

  if (proveedor.value == '') {
    passwordError.innerHTML = 'Error, el campo proveedor no debe estar vacío';
  }
  if (codigo.value == '') {
    passwordError.innerHTML = 'Error, el campo codigo no debe estar vacío';
  }
  if (tipo.value == '') {
    passwordError.innerHTML = 'Error, el campo tipo no debe estar vacío';
  }
  if (precio.value == '') {
    passwordError.innerHTML = 'Error, el campo precio no debe estar vacío';
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





      
        

 