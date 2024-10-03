import { getCatsFromStorage, saveCatsToStorage } from './storage.js';
import { displayCats } from './display.js';

let filteredCats = [];

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
    let cats = getCatsFromStorage();
    cats = cats.filter(cat => cat.name !== catData.name);
    saveCatsToStorage(cats);
    displayCats(cats);
  });

  card.querySelector('.edit-button').addEventListener('click', function () {
    const cats = getCatsFromStorage();
    const catIndex = cats.findIndex(cat => cat.name === catData.name);
    localStorage.setItem('editCatIndex', catIndex);
    window.location.href = 'edit_cat.html';
  });

  return card;
}


function countTotalCats(cats) {
  document.getElementById('total_cats').textContent = cats.length;
}


function handleSearch(cats) {
  const searchText = document.getElementById('find_input').value.trim().toLowerCase();
  filteredCats = cats.filter(cat => cat.name.toLowerCase().includes(searchText));
  return filteredCats;
}



function sortCatsByAge(catsArray) {
  if (catsArray.length > 0) {
    catsArray.sort((a, b) => b.age - a.age);
  }
}



export { countTotalCats, handleSearch, createCatCard, sortCatsByAge };
