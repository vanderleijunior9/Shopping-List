const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');

function displayItems() {
   const itemFromStorage = getItemsFromStorage();
   itemFromStorage.forEach(item => addItemToDOM(item));

   checkUI();
}

function createButton (classes) {
   const button = document.createElement('button');
   button.className = classes;
   const icon = createIcon('fa-solid fa-xmark');
   button.appendChild(icon);
   return button;
}

function createIcon(classes) {
   const icon = document.createElement('i');
   icon.className = classes;
   return icon;

}
function onAddItemSubmit(e) {
    e.preventDefault();
    
    const NewItem = itemInput.value;
   // validate input
    if (NewItem.value === '') {
    alert("Please add an item");
    return;
    }
    
    // item to the dom
    addItemToDOM(NewItem);  

   // item to the storage x`
    addItemToStorage(NewItem);

    checkUI();

    itemInput.value = '';

    console.log(NewItem);
}

function addItemToDOM (item) {
   //create list item
   const li = document.createElement('li');
   li.appendChild(document.createTextNode(item));

   const button = createButton('remove-item btn-link text-red');
   li.appendChild(button);
   
   itemList.appendChild(li);


}

function addItemToStorage (item) {
   const itemFromStorage = getItemsFromStorage();

   if (localStorage.getItem('items') === null) {
      itemFromStorage = [];
   } else {
      itemFromStorage = JSON.parse(localStorage.getItem('items'));
   }

   itemFromStorage.push(item);

   localStorage.setItem('item', JSON.stringify(itemFromStorage));
}

function getItemsFromStorage () {
   let itemsFromStorage;

   if (localStorage.getItem('items') === null) {
      itemsFromStorage = [];
   } else {
      itemsFromStorage = JSON.parse(localStorage.getItem('items'));
   }

   return itemsFromStorage;
}

function onClickItem {
   if (e.target.parentElement.classList.contains('remove-item')){
      removeItem(e.target.parentElement.parentElement);
   }
}

function removeItem (item) {
   // removing from DOM
   if (confirm('Are you sure?')) {
      item.remove();


   // removing from LocalStorage
   
      removeItemFromStorage(item.textContent);

      checkUI();
   }
}

function removeItemFromStorage(item) {
   let itemsFromStorage = getItemsFromStorage();

   itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

   localStorage.setItem('item', JSON.stringify(itemsFromStorage));
}  

function clearItem(e){
   while (itemList.firstChild) {
      itemList.removeChild(itemList.firstChild);
   }

   // clear from localStorage

   localStorage.removeItem('items');
   checkUI();
}
function filterItems(e) {
   const items = itemList.querySelectorAll('li');
   const text = e.target.value.toLowerCase();  
   items.forEach((item) => { 
      const itemName = item.firstChild.textContent.toLowerCase();
      console.log(itemName);
      
      if (itemName.indexOf(text) != -1) {
         item.style.display = 'flex';
      } else {
         item.style.display = 'none';
      }
   })
}
function checkUI () {
   const items = itemList.querySelectorAll('li');
   if (items.length === 0) {
      clearBtn.style.display = 'none';
      itemFilter.style.display = 'none';
   } else {
      clearBtn.style.display = 'block';
      itemFilter.style.display = 'block';
   }
}

// Events Listeners ()
function init() {
   itemForm.addEventListener('submit', onAddItemSubmit);
   itemList.addEventListener('click', onClickItem);
   clearBtn.addEventListener('click', clearItem);
   itemFilter.addEventListener('input', filterItems);
   document.addEventListener('DOMContentLoaded', displayItems);
   checkUI();
}


 init();