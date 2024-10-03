document.addEventListener('DOMContentLoaded', function () {
  const editCatIndex = localStorage.getItem('editCatIndex');

  let cats = JSON.parse(localStorage.getItem('catCards')) || [];
  let catToEdit = cats[editCatIndex];

  if (catToEdit) {
    document.getElementById('cat_name_input').value = catToEdit.name;
    document.getElementById('age_input').value = catToEdit.age;
    document.getElementById('color_input').value = catToEdit.color;
  }

  document.getElementById('edit_form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const catName = document.getElementById('cat_name_input').value.trim();
    const age = document.getElementById('age_input').value.trim();
    const color = document.getElementById('color_input').value.trim();

    if (!catName || !age || !color) {
      alert('Please fill in all fields.');
      return false;
    }

    if (isNaN(age) || age <= 0) {
      alert('Age must be a positive number.');
      return false;
    }

    cats[editCatIndex] = {
      name: catName,
      age: parseInt(age, 10),
      color: color,
    };

    localStorage.setItem('catCards', JSON.stringify(cats));

    window.location.href = 'lab3.html';
  });
});
