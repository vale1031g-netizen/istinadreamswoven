function $(id) {
  return document.getElementById(id);
}

function getLS(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

function setLS(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
