document.addEventListener('DOMContentLoaded', async function () {
  const editCatIndex = localStorage.getItem('editCatIndex');

  async function fetchCatById(catId) {
    try {
      const response = await fetch(`http://localhost:3000/cats/${catId}`);
      if (response.ok) {
        const cat = await response.json();
        return cat;
      } else {
        console.error('Failed to fetch cat.');
        return null;
      }
    } catch (error) {
      console.error('Error fetching cat:', error);
      return null;
    }
  }

  // оновлення кота через PUT-запит
  async function updateCat(catId, updatedCatData) {
    try {
      const response = await fetch(`http://localhost:3000/cats/${catId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCatData),
      });

      if (response.ok) {
        alert('Cat updated successfully!');
        window.location.href = 'lab5.html';
      } else {
        alert('Failed to update cat.');
      }
    } catch (error) {
      console.error('Error updating cat:', error);
    }
  }

  const catToEdit = await fetchCatById(editCatIndex);

  if (catToEdit) {
    document.getElementById('cat_name_input').value = catToEdit.name;
    document.getElementById('age_input').value = catToEdit.age;
    document.getElementById('color_input').value = catToEdit.color;
  } else {
    alert('Failed to load cat for editing.');
  }

  document.getElementById('edit_form').addEventListener('submit', function (event) {
    event.preventDefault();

    const catName = document.getElementById('cat_name_input').value.trim();
    const age = document.getElementById('age_input').value.trim();
    const color = document.getElementById('color_input').value.trim();

    if (!catName || isNaN(age) || !color) {
      alert('Please fill in all fields.');
      return false;
    }

    const updatedCat = {
      name: catName,
      age: parseInt(age, 10),
      color: color,
    };

    updateCat(editCatIndex, updatedCat);
  });
});
