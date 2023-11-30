const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');

function addItem(e) {
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
    console.log(button);  
}
 function createButton (classes) {
    const button = document.createElement(button);
    button.className(classes);
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    return button;
 }

 function createIcon(classes) {
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;

 }


itemForm.addEventListener('submit', addItem)


  