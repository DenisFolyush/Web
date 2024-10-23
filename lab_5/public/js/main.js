import { displayCats } from './display.js';
import { countTotalCats, handleSearch, sortCatsByAge } from './catManager.js';

// коти із сервера
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

//відображення котів 
async function loadAndDisplayCats() {
  const cats = await fetchCats();
  displayCats(cats);
}

if (window.location.pathname.includes('lab5.html')) {
  document.addEventListener('DOMContentLoaded', function () {
    loadAndDisplayCats();

    document.getElementById('find_button').addEventListener('click', async function () {
      let cats = await fetchCats();  
      let filteredCats = handleSearch(cats);  
      const sortingEnabled = document.getElementById('sorting_switch').checked;

      if (sortingEnabled) {
        sortCatsByAge(filteredCats);  
      }
      displayCats(filteredCats); 
    });

    document.getElementById('sorting_switch').addEventListener('change', async function () {
      let cats = await fetchCats();
      let filteredCats = handleSearch(cats); 
      if (this.checked) {
        sortCatsByAge(filteredCats); 
      }
      displayCats(filteredCats);  
    });

    document.getElementById('count_cats_button').addEventListener('click', async function () {
      let cats = await fetchCats();
      countTotalCats(cats);
    });
  });
}
