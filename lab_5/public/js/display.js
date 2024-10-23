import { createCatCard } from './catManager.js';


function displayCats(catsToDisplay) {
  const itemsContainer = document.getElementById('items_container');
  itemsContainer.innerHTML = '';  
  catsToDisplay.forEach((catData) => {
    const card = createCatCard(catData);
    itemsContainer.appendChild(card);
  });
}

export { displayCats };
