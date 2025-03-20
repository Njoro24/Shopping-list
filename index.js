let shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];

document.getElementById('addButton').addEventListener('click', addItem);
document.getElementById('clearButton').addEventListener('click', clearList);

document.getElementById('itemInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addItem();
    }
});

function renderList() {
    const listElement = document.getElementById('shoppingList');
    listElement.innerHTML = '';

    shoppingList.forEach((item, index) => {
        const li = document.createElement('li');

        //Checkbox for marking items as purchased
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = item.purchased;
        checkbox.addEventListener('change', () => togglePurchased(index));

        //Display item name and price
        const span = document.createElement('span');
        span.textContent = `${item.name} - KSh ${item.price}`;
        
        // If purchased, apply strikethrough
        if (item.purchased) {
            span.classList.add('purchased'); // Ensure this class is in your CSS
        }

        // Edit Button
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            editItem(index);
        });

        //Delete Button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteItem(index);
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        listElement.appendChild(li);
    });

    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
}

function addItem() {
    const itemInput = document.getElementById('itemInput');
    const priceInput = document.getElementById('priceInput');

    const itemName = itemInput.value.trim();
    let itemPrice = priceInput.value.trim();

    if (itemName && itemPrice) {
        itemPrice = parseFloat(itemPrice).toFixed(2); // Ensure price is properly formatted

        shoppingList.push({ name: itemName, price: itemPrice, purchased: false });

        itemInput.value = '';
        priceInput.value = '';
        renderList();
    } else {
        alert("Please enter both item name and price in KSh.");
    }
}

function togglePurchased(index) {
    shoppingList[index].purchased = !shoppingList[index].purchased;
    renderList();
}

function editItem(index) {
    const newItem = prompt("Edit item name:", shoppingList[index].name);
    let newPrice = prompt("Edit price in KSh:", shoppingList[index].price); 

    if (newItem !== null && newItem.trim() !== "" && newPrice !== null && newPrice.trim() !== "") {
        newPrice = parseFloat(newPrice.replace("KSh ", "")).toFixed(2); 

        shoppingList[index].name = newItem.trim();
        shoppingList[index].price = newPrice;
        renderList();
    }
}

function deleteItem(index) {
    shoppingList.splice(index, 1);
    renderList();
}

function clearList() {
    shoppingList = [];
    localStorage.removeItem('shoppingList');
    renderList();
}

renderList();