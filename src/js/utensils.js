// const templesElement = document.getElementById("Delicacies");
// const detailsContainer = document.createElement("div");
// detailsContainer.id = "productDetails";
// document.body.appendChild(detailsContainer);

// let UtensilsList = [];

// /* Function to display food list */
// const displayFoodList = (foods) => {
//     templesElement.innerHTML = ""; // Clear previous entries

//     foods.forEach(food => {
//         const myArticle = document.createElement("article");
//         myArticle.classList.add("product");

//         const h3 = document.createElement("h3");
//         h3.textContent = food.productName;

//         const img = document.createElement("img");
//         img.src = food.imageSource;
//         img.alt = food.productName;
//         img.loading = "lazy";
//         img.width = 400;
//         img.height = 250;

//         const h4 = document.createElement("h4");
//         h4.textContent = food.Description;

//         myArticle.appendChild(h3);
//         myArticle.appendChild(img);
//         myArticle.appendChild(h4);

//         // Add click event listener to display details
//         myArticle.addEventListener("click", () => showProductDetails(food));

//         templesElement.appendChild(myArticle);
//     });
// };

// /* Function to show product details */
// const showProductDetails = (food) => {
//     detailsContainer.innerHTML = `
//         <div class="details-box">
//             <h2>${food.productName}</h2>
//             <img src="${food.imageSource}" alt="${food.productName}" width="400" height="250">
//             <p>${food.Description}</p>
//             <p><strong>Category:</strong> ${food.category}</p>
//             <button id="addToCart">Add to Cart</button>
//             <button id="closeDetails">Close</button>
//         </div>
//     `;

//     detailsContainer.style.display = "block";

//     document.getElementById("addToCart").addEventListener("click", () => {
//         alert(`${food.productName} added to cart!`);
//         // You can expand this to actually store the item in localStorage or a cart array
//     });

//     document.getElementById("closeDetails").addEventListener("click", () => {
//         detailsContainer.style.display = "none";
//     });
// };

// /* Fetch and display food list */
// const getFoodListFromJsonFile = async () => {
//     const myresponse = await fetch("https://pearlrhema.github.io/wdd131/utensils.json");
//     UtensilsList = await myresponse.json();
//     displayFoodList(UtensilsList);
// };

// getFoodListFromJsonFile();

// /* Sorting logic */
// document.getElementById("sortBy").addEventListener("change", () => {
//     const filter = document.getElementById("sortBy").value;
//     const filteredList = UtensilsList.filter(food => food.category.includes(filter));
//     displayFoodList(filteredList);
// });


// new utensils.js
const templesElement = document.getElementById("Delicacies");
const detailsContainer = document.createElement("div");
detailsContainer.id = "productDetails";
document.body.appendChild(detailsContainer);

let UtensilsList = [];

/* Function to display utensils list */
const displayFoodList = (foods) => {
    templesElement.innerHTML = ""; // Clear previous entries

    foods.forEach(food => {
        const myArticle = document.createElement("article");
        myArticle.classList.add("product");

        const h3 = document.createElement("h3");
        h3.textContent = food.productName;

        const img = document.createElement("img");
        img.src = food.imageSource;
        img.alt = food.productName;
        img.loading = "lazy";
        img.width = 400;
        img.height = 250;

        const h4 = document.createElement("h4");
        h4.textContent = food.Description;

        myArticle.appendChild(h3);
        myArticle.appendChild(img);
        myArticle.appendChild(h4);

        // Add click event listener to display details
        myArticle.addEventListener("click", () => showProductDetails(food));

        templesElement.appendChild(myArticle);
    });
};

/* Function to show product details */
const showProductDetails = (food) => {
    detailsContainer.innerHTML = `
        <div class="details-box">
            <h2>${food.productName}</h2>
            <img src="${food.imageSource}" alt="${food.productName}" width="400" height="250">
            <p>${food.Description}</p>
            <p><strong>Category:</strong> ${food.category}</p>
            <p><strong>Price:</strong> $${food.price}</p>
            <button id="addToCart">Add to Cart</button>
            <button id="closeDetails">Close</button>
        </div>
    `;

    detailsContainer.style.display = "block";

    document.getElementById("addToCart").addEventListener("click", () => {
        addToCart(food);
    });

    document.getElementById("closeDetails").addEventListener("click", () => {
        detailsContainer.style.display = "none";
    });
};

/* Function to add item to cart in localStorage */
// const addToCart = (food) => {
//     let cart = JSON.parse(localStorage.getItem("cart")) || [];
//     const existingItem = cart.find(item => item.productName === food.productName);

//     if (existingItem) {
//         existingItem.quantity += 1;
//     } else {
//         cart.push({ ...food, quantity: 1 });
//     }

//     localStorage.setItem("cart", JSON.stringify(cart));
//     alert(`${food.productName} added to cart!`);
// };

// add to cart with animation
const addToCart = (food) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = cart.find((item) => item.foodName === food.foodName);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...food, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert(`${food.foodName} added to cart!`);

    // Add animation effect to cart container
    const cartContainer = document.querySelector(".cart-container");
    if (cartContainer) {
        cartContainer.classList.add("cart-animate");
        setTimeout(() => cartContainer.classList.remove("cart-animate"), 500);
    }
};


/* Fetch and display utensils list */
const getFoodListFromJsonFile = async () => {
    const myresponse = await fetch("https://pearlrhema.github.io/wdd131/utensils.json");
    UtensilsList = await myresponse.json();
    displayFoodList(UtensilsList);
};

getFoodListFromJsonFile();

/* Sorting logic */
document.getElementById("sortBy").addEventListener("change", () => {
    const filter = document.getElementById("sortBy").value;
    const filteredList = UtensilsList.filter(food => food.category.includes(filter));
    displayFoodList(filteredList);
});
