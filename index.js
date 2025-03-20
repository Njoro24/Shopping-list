let shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];

document.getElementById('addButton').addEventListener('click', addItem);
document.getElementById('clearButton').addEventListener('click', clearList);

document.getElementById('itemInput').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        addItem();
    }
});

function renderList() {
    const listElement = document.getElementById('shoppingList');
    listElement.innerHTML = '';

    shoppingList.forEach((item, index) => {
        const li = document.createElement('li');

        // Wrapper for item details
        const itemContainer = document.createElement('div');
        itemContainer.classList.add('item-container');

        // Checkbox for marking as purchased
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = item.purchased;
        checkbox.addEventListener('change', () => togglePurchased(index));

        // Display item name and price
        const span = document.createElement('span');
        span.textContent = `${item.name} - KSh ${item.price}`;
        if (item.purchased) {
            span.classList.add('purchased');
        }

        // Button Group (Edit & Delete)
        const buttonGroup = document.createElement('div');
        buttonGroup.classList.add('button-group');

        // Edit Button
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.classList.add('edit');
        editBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            editItem(index);
        });

        // Delete Button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete');
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteItem(index);
        });

        // Append elements
        itemContainer.appendChild(checkbox);
        itemContainer.appendChild(span);
        buttonGroup.appendChild(editBtn);
        buttonGroup.appendChild(deleteBtn);

        li.appendChild(itemContainer);
        li.appendChild(buttonGroup);
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
        itemPrice = parseFloat(itemPrice).toFixed(2);

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
    if (confirm("Are you sure you want to clear the shopping list?")) {
        shoppingList = [];
        renderList();
    }
}
