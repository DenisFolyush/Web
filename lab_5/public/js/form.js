import { getCatsFromStorage, saveCatsToStorage } from './storage.js';

function resetForm() {
  document.getElementById('cat_name_input').value = '';
  document.getElementById('age_input').value = '';
  document.getElementById('color_input').value = '';
}

function handleFormSubmission() {
  document.getElementById('add_form').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('cat_name_input').value.trim();
    const age = parseInt(document.getElementById('age_input').value.trim(), 10);
    const color = document.getElementById('color_input').value.trim();

    if (name && !isNaN(age) && color) {
      const catData = { name, age, color };
      let cats = getCatsFromStorage();
      cats.push(catData);
      saveCatsToStorage(cats);

      resetForm();
      window.location.href = 'lab5.html';
    } else {
      alert('Please fill in all fields.');
    }
  });
}

export { handleFormSubmission };
