import { displayCats } from './display.js';

// Видалення кота через DELETE-запит до бекенду
async function deleteCat(catId) {
  try {
    const response = await fetch(`http://localhost:3000/cats/${catId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      alert('Cat deleted successfully!');
      const cats = await fetchCats();
      displayCats(cats);
    } else {
      alert('Failed to delete cat.');
    }
  } catch (error) {
    console.error('Error deleting cat:', error);
  }
}

function createCatCard(catData) {
  const card = document.createElement('li');
  card.classList.add('item-card');
  card.innerHTML = `
    <div class="item-container__content">
      <div>
        <strong>${catData.name}</strong>
        <p>Age: ${catData.age}</p>
        <p>Color: <span class="cat-color-text"></span> <i class="fas fa-cat" style="color: ${catData.color};"></i></p>
      </div>
      <div class="button-container">
        <button class="edit-button">Edit</button>
        <button class="delete-button">Delete</button>
      </div>
    </div>
  `;

  card.querySelector('.delete-button').addEventListener('click', function () {
    if (confirm('Are you sure you want to delete this cat?')) {
      deleteCat(catData.id);  
    }
  });

  card.querySelector('.edit-button').addEventListener('click', function () {
    localStorage.setItem('editCatIndex', catData.id);
    window.location.href = 'edit_cat.html';
  });

  return card;
}

function countTotalCats(cats) {
  document.getElementById('total_cats').textContent = cats.length;
}

function handleSearch(cats) {
  const searchText = document.getElementById('find_input').value.trim().toLowerCase();
  return cats.filter(cat => cat.name.toLowerCase().includes(searchText));
}

function sortCatsByAge(catsArray) {
  if (catsArray.length > 0) {
    catsArray.sort((a, b) => b.age - a.age);
  }
}

async function fetchCats() {
  try {
    const response = await fetch('http://localhost:3000/cats');
    if (response.ok) {
      const cats = await response.json();
      return cats;
    } else {
      console.error('Failed to fetch cats.');
      return [];
    }
  } catch (error) {
    console.error('Error fetching cats:', error);
    return [];
  }
}



export { countTotalCats, handleSearch, createCatCard, sortCatsByAge, fetchCats };
