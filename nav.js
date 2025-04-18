
        fetch('apple.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('navigation').innerHTML = data;
            });
    

let cart = [];

function addToCart(productName, price, quantity) {
    const item = {
        name: productName,
        price: price,
        quantity: parseInt(quantity)
    };

    // Check if the product is already in the cart
    const existingItemIndex = cart.findIndex(item => item.name === productName);
    if (existingItemIndex > -1) {
        // Update quantity if it exists
        cart[existingItemIndex].quantity += item.quantity;
    } else {
        // Add new item to cart
        cart.push(item);
    }

    displayCart();
}


function displayCart() {
    const cartDiv = document.getElementById('cart');
    cartDiv.innerHTML = ''; // Clear previous cart content

    if (cart.length === 0) {
        cartDiv.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    let total = 0;
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        cartDiv.innerHTML += `<p>${item.name} - ₱${item.price.toFixed(2)} x ${item.quantity} = ₱${itemTotal.toFixed(2)}</p>`;
    });

    cartDiv.innerHTML += `<strong>Total: ₱${total.toFixed(2)}</strong>`;
}
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty. Please add items to your cart before checking out.');
        return;
    }

    // Here you can implement further checkout logic, like sending the order to a server
    alert('Thank you for your order!');
    cart = []; // Clear the cart after checkout
    displayCart(); // Update the cart display
}