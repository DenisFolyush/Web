import { displayCats } from './display.js';
import { countTotalCats, fetchCats } from './catManager.js';

async function loadAndDisplayCats() {
  const cats = await fetchCats();
  displayCats(cats);
}

if (window.location.pathname.includes('lab5.html')) {
  document.addEventListener('DOMContentLoaded', function () {
    loadAndDisplayCats();

    document.getElementById('find_button').addEventListener('click', async function () {
      const searchText = document.getElementById('find_input').value.trim().toLowerCase();
      const sortingEnabled = document.getElementById('sorting_switch').checked;
      const cats = await fetchCats(searchText, sortingEnabled);
      displayCats(cats);
    });

    document.getElementById('sorting_switch').addEventListener('change', async function () {
      const searchText = document.getElementById('find_input').value.trim().toLowerCase();
      const sortingEnabled = this.checked;
      const cats = await fetchCats(searchText, sortingEnabled);
      displayCats(cats);
    });

    document.getElementById('count_cats_button').addEventListener('click', async function () {
      try {
        const response = await fetch('http://localhost:3000/cats/count');
        if (response.ok) {
          const { total } = await response.json();
          document.getElementById('total_cats').textContent = total;
        } else {
          console.error('Failed to count cats.');
        }
      } catch (error) {
        console.error('Error counting cats:', error);
      }
    });
  });
}
