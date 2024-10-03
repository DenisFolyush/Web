function saveCatsToStorage(cats) {
  localStorage.setItem('catCards', JSON.stringify(cats));
}

function getCatsFromStorage() {
  return JSON.parse(localStorage.getItem('catCards')) || [];
}

function clearStorage() {
  localStorage.clear();
  alert('Storage Cleared!');
  window.location.reload();
}

export { saveCatsToStorage, getCatsFromStorage, clearStorage };
