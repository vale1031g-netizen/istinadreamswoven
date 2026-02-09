function getData(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

function setData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function generateID() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem('user'));
}

export function getProductos() {
  return getData('productos');
}

export function addProducto(producto) {
  const productos = getProductos();
  productos.push(producto);
  setData('productos', productos);
}

export function getPatrones() {
  return getData('patrones');
}

export function addPatron(patron) {
  const patrones = getPatrones();
  patrones.push(patron);
  setData('patrones', patrones);
}

export function getTutoriales() {
  return getData('tutoriales');
}

export function addTutorial(tutorial) {
  const tutoriales = getTutoriales();
  tutoriales.push(tutorial);
  setData('tutoriales', tutoriales);
}

export function getFavoritos() {
  return getData('favoritos');
}

export function toggleFavorito(item) {
  let favoritos = getFavoritos();
  const existe = favoritos.find(f => f.id === item.id);

  if (existe) {
    favoritos = favoritos.filter(f => f.id !== item.id);
  } else {
    favoritos.push(item);
  }

  setData('favoritos', favoritos);
}

export function getPedidos() {
  return getData('pedidos');
}

export function addPedido(pedido) {
  const pedidos = getPedidos();
  pedidos.push(pedido);
  setData('pedidos', pedidos);
}

export function getBalance() {
  return JSON.parse(localStorage.getItem('balance')) || {
    ingresos: 0,
    gastos: 0
  };
}

export function updateBalance(monto, tipo = 'ingreso') {
  const balance = getBalance();
  if (tipo === 'ingreso') balance.ingresos += monto;
  else balance.gastos += monto;
  localStorage.setItem('balance', JSON.stringify(balance));
}

import { addProducto, getCurrentUser } from './data.js';

const form = document.getElementById('formProducto');

form?.addEventListener('submit', e => {
  e.preventDefault();

  const user = getCurrentUser();
  if (!user) {
    alert('Debes iniciar sesión');
    return;
  }

  const producto = {
    id: '_' + Math.random().toString(36).substr(2, 9),
    titulo: title.value,
    precio: Number(price.value),
    imagen: '',
    autor: user.email,
    fecha: new Date().toISOString()
  };

  const reader = new FileReader();
  reader.onload = () => {
    producto.imagen = reader.result;
    addProducto(producto);
    alert('Producto publicado correctamente');
    form.reset();
  };
  reader.readAsDataURL(image.files[0]);
});
