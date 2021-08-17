const Resultados = document.querySelector('mis_resultados');
const Registrar = document.getElementById('registrar');

Registrar.addEventListener('click', (e) => {
  e.preventDefault();
  const Descripcion = document.getElementById('descripcion');
  const Proveedor = document.getElementById('proveedor');
  const Codigo = document.getElementById('codigo');
  const Tipo = document.getElementById('tipo');
  const Precio = document.getElementById('precio');



  if (Descripcion.value == '') {
    nameError.innerHTML = 'Error, el nombre no debe estar vacío';
  }

  if (Proveedor.value == '') {
    passwordError.innerHTML = 'Error, el email no debe estar vacío';
  }
  if (Codigo.value == '') {
    passwordError.innerHTML = 'Error, el email no debe estar vacío';
  }
  if (Tipo.value == '') {
    passwordError.innerHTML = 'Error, el email no debe estar vacío';
  }
  if (Precio.value == '') {
    passwordError.innerHTML = 'Error, el email no debe estar vacío';
  }
    
    if (Descripcion.value != '' && Proveedor.value != '' && Codigo.value != '' && Tipo.value != '' && Precio.value != '') {
        fetch('http://localhost:8080/productos', {
          method: 'POST',
          body: JSON.stringify({
            Descripcion: Descripcion.value,
            Proveedor: Proveedor.value,
            Codigo: Codigo.value,
            Tipo: Tipo.value,
            Precio: Precio.valuue
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }).then((resp) => {

 