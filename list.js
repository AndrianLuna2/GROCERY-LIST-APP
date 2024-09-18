document.addEventListener('DOMContentLoaded', () => {
    const listItems = JSON.parse(localStorage.getItem('addedList')) || [];
    const listItemsContainer = document.getElementById('list-items');
    const emptyListMessage = document.getElementById('empty-list-message');
    const addListBtn = document.getElementById('add-list-btn');
    const hideCheckedItemsCheckbox = document.getElementById('hide-checked-items');

    // Function to display list items
    function displayListItems() {
        listItemsContainer.innerHTML = '';

        listItems.forEach((item, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <input type="checkbox" class="item-checkbox" data-index="${index}">
                <strong>${item.productName}</strong><br>
                Brand: ${item.brand}<br>
                Price: ₱${item.price}<br>
                Weight/Volume: ${item.weightVolume}<br>
                Quantity: ${item.quantity}<br>
                Store: ${item.store}<br>
                Category: ${item.category}<br>
                ${item.image ? `<img src="${item.image}" alt="${item.productName}" style="max-width: 100px; max-height: 100px;">` : ''}
            `;
            listItemsContainer.appendChild(li);
        });

        // Check off items if they're marked as checked
        listItems.forEach((item, index) => {
            const checkbox = document.querySelector(`.item-checkbox[data-index="${index}"]`);
            checkbox.checked = item.checked;
            checkbox.addEventListener('change', () => {
                item.checked = checkbox.checked;
                localStorage.setItem('addedList', JSON.stringify(listItems));
                handleHideCheckedItems();
            });
        });
    }

    // Handle hiding of checked items
    function handleHideCheckedItems() {
        const shouldHide = hideCheckedItemsCheckbox.checked;
        const checkboxes = document.querySelectorAll('.item-checkbox');

        checkboxes.forEach(checkbox => {
            const li = checkbox.closest('li');
            if (checkbox.checked && shouldHide) {
                li.style.display = 'none';
            } else {
                li.style.display = 'block';
            }
        });
    }

    // Display items initially
    if (listItems.length > 0) {
        emptyListMessage.style.display = 'none';
        displayListItems();
    } else {
        listItemsContainer.style.display = 'none';
        emptyListMessage.style.display = 'block';
    }

    // Add event listener to hide checked items checkbox
    hideCheckedItemsCheckbox.addEventListener('change', handleHideCheckedItems);

    // Redirect to the dashboard to add more items
    addListBtn.addEventListener('click', () => {
        window.location.href = 'grocerydashboard.html';
    });

    // Handle logout
    const logoutBtn = document.getElementById('logout-btn');
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    });
});
