document.addEventListener('DOMContentLoaded', () => {
    const itemList = document.getElementById('item-list');
    const searchInput = document.getElementById('search');
    const categoryFilter = document.getElementById('category-filter');
    const logoutBtn = document.getElementById('logout-btn');
    const backBtn = document.getElementById('back-btn');
    
    let addedList = [];

    // Load and display items
    function displayItems() {
        const items = JSON.parse(localStorage.getItem('items')) || [];
        const searchText = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value;

        itemList.innerHTML = '';

        items
            .filter(item => 
                (selectedCategory === '' || item.category === selectedCategory) &&
                (item.productName.toLowerCase().includes(searchText) ||
                 item.brand.toLowerCase().includes(searchText) ||
                 item.store.toLowerCase().includes(searchText))
            )
            .forEach((item, index) => {
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
                    <button onclick="addToList(${index})">Add to List</button>
                `;
                itemList.appendChild(li);
            });
    }

    // Add item to list
    window.addToList = (index) => {
        const items = JSON.parse(localStorage.getItem('items')) || [];
        const item = items[index];

        // Add the item to the addedList array
        addedList.push(item);

        // Store the added list in localStorage
        localStorage.setItem('addedList', JSON.stringify(addedList));
    };

    // Handle search input
    searchInput.addEventListener('input', () => {
        displayItems();
    });

    // Handle category filter change
    categoryFilter.addEventListener('change', () => {
        displayItems();
    });

    // Handle logout
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html'; // Redirect to login page
    });

    // Handle back button
    backBtn.addEventListener('click', () => {
        window.location.href = 'additems.html'; // Redirect to add items page
    });

    displayItems();
});
