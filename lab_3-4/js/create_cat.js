document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('add_form');

  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault(); 

      const name = document.getElementById('cat_name_input').value.trim();
      const age = parseInt(document.getElementById('age_input').value.trim(), 10);
      const color = document.getElementById('color_input').value.trim();

      if (!name || isNaN(age) || !color) {
        alert('Please fill in all fields correctly.');
        return;
      }

      let cats = JSON.parse(localStorage.getItem('catCards')) || [];

      // Check for duplicate names
      const duplicateCat = cats.find(cat => cat.name.toLowerCase() === name.toLowerCase());
      if (duplicateCat) {
        alert('A cat with this name already exists.');
        return;
      }

      const catData = { name, age, color };

      cats.push(catData);

      localStorage.setItem('catCards', JSON.stringify(cats));

      alert('Cat added successfully!');

      window.location.href = 'lab3.html';
    });
  }
});
