import { displayCats } from './display.js';
import { countTotalCats, handleSearch, sortCatsByAge } from './catManager.js';
import { getCatsFromStorage } from './storage.js';

let cats = getCatsFromStorage();
let filteredCats = cats; 

if (window.location.pathname.includes('lab3.html')) {
  document.addEventListener('DOMContentLoaded', function () {
    displayCats(filteredCats);

document.getElementById('find_button').addEventListener('click', function () {
  filteredCats = handleSearch(cats);
  const sortingEnabled = document.getElementById('sorting_switch').checked;
  if (sortingEnabled) {
    sortCatsByAge(filteredCats); 
  }
  displayCats(filteredCats); 
});

document.getElementById('sorting_switch').addEventListener('change', function () {
  const sortingEnabled = this.checked;
  if (sortingEnabled) {
    const catsArray = filteredCats.length > 0 ? filteredCats : cats; 
    sortCatsByAge(catsArray); 
    displayCats(catsArray); 
  } else {
    displayCats(filteredCats.length > 0 ? filteredCats : cats); 
  }
});

    
    
    document.getElementById('count_cats_button').addEventListener('click', function () {
      countTotalCats(filteredCats);
    });
  });
}
