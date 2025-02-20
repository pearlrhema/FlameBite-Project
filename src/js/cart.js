// // import { loadHeaderFooter } from "./utils.mjs";
// // import ShoppingCart from "./ShoppingCart.mjs";

// // loadHeaderFooter();

// // const cart = new ShoppingCart("so-cart", ".product-list");
// // cart.renderCartContents();

// // update the cart count
// import { loadHeaderFooter } from "./utils.mjs";
// import ShoppingCart from "./ShoppingCart.mjs";

// loadHeaderFooter();

// const cart = new ShoppingCart("so-cart", ".product-list");
// cart.init();
// if (cart.total > 0) {
//   // show our checkout button and total if there are items in the cart.
//   // document.querySelector(".list-footer ").classList.remove("hide");
//   document.querySelector(".list-footer hide").classList.remove("hide");

// }

// // Function to update cart count in the header
// function updateCartCount() {
//   const cartItems = JSON.parse(localStorage.getItem("so-cart")) || [];
//   const cartCountElement = document.querySelector(".cart-count");
//   const itemCount = cartItems.length;

//   if (itemCount > 0) {
//     cartCountElement.textContent = itemCount;
//     cartCountElement.style.display = "inline";
//   } else {
//     cartCountElement.style.display = "none"; // Hide if cart is empty
//   }
// }

// // Call the function on page load
// updateCartCount();

// // Optional: Update the count whenever cart changes
// window.addEventListener("storage", updateCartCount);


// function renderCartContents() {
//   const cartItems = getLocalStorage("so-cart");
//   const htmlItems = cartItems.map((item) => cartItemTemplate(item));
//   document.querySelector(".product-list").innerHTML = htmlItems.join("");
// }

// function cartItemTemplate(item) {
//   const newItem = `<li class="cart-card divider">
//   <a href="#" class="cart-card__image">
//     <img
//       src="${item.Image}"
//       alt="${item.Name}"
//     />
//   </a>
//   <a href="#">
//     <h2 class="card__name">${item.Name}</h2>
//   </a>
//   <p class="cart-card__color">${item.Colors[0].ColorName}</p>
//   <p class="cart-card__quantity">qty: 1</p>
//   <p class="cart-card__price">$${item.FinalPrice}</p>
// </li>`;

//   return newItem;
// }

// New cart js
document.addEventListener("DOMContentLoaded", () => {
    const cartContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    const clearCartButton = document.getElementById("clear-cart");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const displayCart = () => {
        cartContainer.innerHTML = "";
        let totalPrice = 0;

        if (cart.length === 0) {
            cartContainer.innerHTML = "<p>Your cart is empty.</p>";
            totalPriceElement.textContent = "";
            return;
        }

        cart.forEach((item, index) => {
            const itemElement = document.createElement("div");
            itemElement.classList.add("cart-item");

            // Use imageUrl if available, otherwise fallback to imageSource
            const imageSrc = item.imageUrl || item.imageSource;
            const productSrc = item.foodName || item.productName;

            itemElement.innerHTML = `
            <img src="${imageSrc}" alt="${item.foodName}" width="100">
            <p>${productSrc}</p>
            <p>Price: $${item.price} x ${item.quantity}</p>
            <button class="remove-item" data-index="${index}">Remove</button>
        `;

            totalPrice += item.price * item.quantity;
            cartContainer.appendChild(itemElement);
        });


        totalPriceElement.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
    };

    cartContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("remove-item")) {
            const index = event.target.getAttribute("data-index");
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            displayCart();
        }
    });

    clearCartButton.addEventListener("click", () => {
        localStorage.removeItem("cart");
        cart = [];
        displayCart();
    });

    displayCart();
});
