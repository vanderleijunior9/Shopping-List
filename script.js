const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');

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
    //create list item
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(NewItem));

   const button = createButton('remove-item btn-link text-red');
   li.appendChild(button);
   
   itemList.appendChild(li);

    checkUI();

    itemInput.value = '';
}
function removeItem (e) {
   if (e.target.parentElement.classList.contains('remove-item')) {
      removeItem(e.target.parentElement.parentElement);
   }
}

function removeItem (item) {
   // removing from DOM
   
      item.remove();


   // removing from LocalStorage
   
      removeItemFromStorage(item.textContent);

      checkUI();
   
}

function removeItemFromStorage(item) {
   let itemsFromStorage = getItemsFromStorage();

   itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

   localStorage.setItem('item', JSON.stringify(itemsFromStorage));
}  

function clearItem(e){
   e.preventDefault();
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
itemForm.addEventListener('submit', onAddItemSubmit);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearItem);
itemFilter.addEventListener('input', filterItems);

checkUI();