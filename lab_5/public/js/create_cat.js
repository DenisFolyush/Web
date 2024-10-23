document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('add_form');

  if (form) {
    form.addEventListener('submit', async function (event) {
      event.preventDefault();

      const name = document.getElementById('cat_name_input').value.trim();
      const age = parseInt(document.getElementById('age_input').value.trim(), 10);
      const color = document.getElementById('color_input').value.trim();

      if (!name || isNaN(age) || !color) {
        alert('Please fill in all fields correctly.');
        return;
      }

      try {
        const getResponse = await fetch('http://localhost:3000/cats');
        if (getResponse.ok) {
          const cats = await getResponse.json();

          // перевірка на одинакових котів
          const duplicateCat = cats.find(cat => cat.name.toLowerCase() === name.toLowerCase());
          if (duplicateCat) {
            alert('A cat with this name already exists.');
            return; 
          }

          // дублікатів нема додаємо нового 
          const catData = { name, age, color };

          const postResponse = await fetch('http://localhost:3000/cats', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(catData),
          });

          if (postResponse.ok) {
            alert('Cat added successfully!');
            window.location.href = 'lab5.html';
          } else {
            alert('Failed to add cat.');
          }
        } else {
          alert('Failed to check for duplicates.');
        }
      } catch (error) {
        console.error('Error adding cat:', error);
      }
    });
  }
});
