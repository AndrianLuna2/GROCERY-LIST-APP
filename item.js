document.addEventListener('DOMContentLoaded', () => {
    const itemForm = document.getElementById('item-form');
    const logoutBtn = document.getElementById('logout-btn');
    const itemList = document.getElementById('item-list');
    const itemIndexInput = document.getElementById('item-index');

    // Function to convert image file to Base64
    function convertImageToBase64(file, callback) {
        const reader = new FileReader();
        reader.onloadend = () => callback(reader.result);
        reader.readAsDataURL(file);
    }

    // Load and display items
    function displayItems() {
        const items = JSON.parse(localStorage.getItem('items')) || [];
        itemList.innerHTML = '';

        items.forEach((item, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${item.productName}</strong><br>
                Brand: ${item.brand}<br>
                Price: ₱${item.price}<br>
                Weight/Volume: ${item.weightVolume}<br>
                Quantity: ${item.quantity}<br>
                Store: ${item.store}<br>
                Category: ${item.category}<br>
                ${item.image ? `<img src="${item.image}" alt="${item.productName}" style="max-width: 100px; max-height: 100px;">` : ''}
                <button style="display: inline-block; margin: 5px;" onclick="editItem(${index})">Edit</button>
                <button style="display: inline-block; margin: 5px;" onclick="deleteItem(${index})">Delete</button>
            `;
            itemList.appendChild(li);
        });
    }

    // Handle item form submission
    itemForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const index = itemIndexInput.value;
        const productName = document.getElementById('product-name').value;
        const brand = document.getElementById('brand').value;
        const price = document.getElementById('price').value;
        const weightVolume = document.getElementById('weight-volume').value;
        const quantity = document.getElementById('quantity').value;
        const store = document.getElementById('store').value;
        const category = document.getElementById('category').value;
        const image = document.getElementById('image').files[0];

        const item = {
            productName,
            brand,
            price,
            weightVolume,
            quantity,
            store,
            category,
            image: null
        };

        // Convert image to Base64 if a new image is uploaded
        if (image) {
            convertImageToBase64(image, (base64Image) => {
                item.image = base64Image;
                saveItem(item, index);
            });
        } else {
            saveItem(item, index);
        }
    });

    // Save or update item
    function saveItem(item, index) {
        const items = JSON.parse(localStorage.getItem('items')) || [];

        // Check if editing an existing item
        if (index !== '') {
            const existingItem = items[index];
            
            // Retain the existing image if no new image is provided
            if (!item.image) {
                item.image = existingItem.image;
            }

            // Update the item in the list
            items[index] = item;
        } else {
            // Add new item
            items.push(item);
        }

        localStorage.setItem('items', JSON.stringify(items));
        displayItems();
        clearForm();
    }

    // Edit item
    window.editItem = (index) => {
        const items = JSON.parse(localStorage.getItem('items')) || [];
        const item = items[index];

        // Populate form with the existing item details
        document.getElementById('product-name').value = item.productName;
        document.getElementById('brand').value = item.brand;
        document.getElementById('price').value = item.price;
        document.getElementById('weight-volume').value = item.weightVolume;
        document.getElementById('quantity').value = item.quantity;
        document.getElementById('store').value = item.store;
        document.getElementById('category').value = item.category;
        itemIndexInput.value = index; // Set the hidden input for the index

        // Scroll to form or focus on it to show user they are editing
        itemForm.scrollIntoView({ behavior: 'smooth' });
    };

    // Delete item
    window.deleteItem = (index) => {
        const items = JSON.parse(localStorage.getItem('items')) || [];
        items.splice(index, 1);
        localStorage.setItem('items', JSON.stringify(items));
        displayItems();
    };

    // Clear form
    function clearForm() {
        itemForm.reset();
        itemIndexInput.value = '';
    }

    // Handle logout
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html'; // Redirect to login page
    });

    displayItems();
});
