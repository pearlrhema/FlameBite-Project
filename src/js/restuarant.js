// const hamButton = document.querySelector('#menu');
// const navigation = document.querySelector('.navigation');

// hamButton.addEventListener('click', () => {
// 	navigation.classList.toggle('open');
// 	hamButton.classList.toggle('open');
// });

// /* Declare and initialize global variables */
// const templesElement = document.getElementById("Delicacies");
// let foodList = [];

// /* async displayTemples Function */
// const displayFoodList = (foods) => {
//     for (const food of foods) {
//         const myArticle = document.createElement("article");
//         const h3 = document.createElement("h3");
//         const h4 = document.createElement("h4");
//         h3.textContent = food.foodName;
//         h4.textContent = food.description;
//         const img = document.createElement("img");
//         img.src = food.imageUrl;
//         img.setAttribute('alt', `${food.foodName}`);
//         img.setAttribute("loading", "lazy");
//         img.setAttribute("width", 400);
//         img.setAttribute("height", 250);
//         myArticle.appendChild(h3);
//         myArticle.appendChild(img);
//         myArticle.appendChild(h4);
//         templesElement.appendChild(myArticle);
//     };
// }


// /* async getTemples Function using fetch()*/
// const getFoodListFromJsonFile = async () => {
//     const myresponse = await fetch("https://pearlrhema.github.io/cse121b/fooditems.json");
//     let foodData = await myresponse.json();
//     foodList = foodData;
//     displayFoodList(foodList);
//     // console.log(foodList);
// }

// /* reset Function */
// const reset = () => {
//     templesElement.textContent = "";
// }

// /* sortBy Function */
// const sortCategories = (Delicacies) => {
//     reset();
//     const filter = document.getElementById("sortBy").value;
//     switch (filter) {
//         case "breakfast":
//             displayFoodList(Delicacies.filter(food => food.category.includes("Breakfast")));
//             break;
//         case "launch":
//             displayFoodList(Delicacies.filter(food => food.category.includes("Lunch")));
//             break;
//         case "dinner":
//             displayFoodList(Delicacies.filter(food => food.category.includes("Dinner")));
//             break;
//         default:
//             displayFoodList(foodList);
//             break;
//     }
// }


// getFoodListFromJsonFile();
// // reset();

// /* Event Listener */
// document.getElementById("sortBy").addEventListener('change', () => {sortCategories(foodList)});

// new restaurant js
const hamButton = document.querySelector("#menu");
const navigation = document.querySelector(".navigation");

hamButton.addEventListener("click", () => {
    navigation.classList.toggle("open");
    hamButton.classList.toggle("open");
});

/* Declare and initialize global variables */
const templesElement = document.getElementById("Delicacies");
let foodList = [];

/* Function to display food items */
const displayFoodList = (foods) => {
    templesElement.innerHTML = ""; // Clear previous entries

    for (const food of foods) {
        const myArticle = document.createElement("article");
        const h3 = document.createElement("h3");
        const h4 = document.createElement("h4");
        const img = document.createElement("img");

        h3.textContent = food.foodName;
        h4.textContent = food.description;
        img.src = food.imageUrl;
        img.setAttribute("alt", food.foodName);
        img.setAttribute("loading", "lazy");
        img.setAttribute("width", 400);
        img.setAttribute("height", 250);

        myArticle.appendChild(h3);
        myArticle.appendChild(img);
        myArticle.appendChild(h4);

        // Add event listener to open details page
        myArticle.addEventListener("click", () => showFoodDetails(food));

        templesElement.appendChild(myArticle);
    }
};

/* Function to show food details */
const showFoodDetails = (food) => {
    templesElement.innerHTML = ""; // Clear the food list and show only details

    const detailsSection = document.createElement("section");
    const title = document.createElement("h2");
    const img = document.createElement("img");
    const description = document.createElement("p");
    const price = document.createElement("p");
    const addToCartButton = document.createElement("button");
    const backButton = document.createElement("button");

    title.textContent = food.foodName;
    img.src = food.imageUrl;
    img.setAttribute("alt", food.foodName);
    img.setAttribute("loading", "lazy");
    img.setAttribute("width", 400);
    img.setAttribute("height", 250);
    description.textContent = food.description;
    price.textContent = `Price: $${food.price}`;
    addToCartButton.textContent = "Add to Cart";
    backButton.textContent = "Back to Menu";

    // Add event listener to add the item to cart
    addToCartButton.addEventListener("click", () => addToCart(food));

    // Add event listener to go back to menu
    backButton.addEventListener("click", () => displayFoodList(foodList));

    detailsSection.appendChild(title);
    detailsSection.appendChild(img);
    detailsSection.appendChild(description);
    detailsSection.appendChild(price);
    detailsSection.appendChild(addToCartButton);
    detailsSection.appendChild(backButton);

    templesElement.appendChild(detailsSection);
};

/* Function to add items to cart (local storage) */
// const addToCart = (food) => {
//     let cart = JSON.parse(localStorage.getItem("cart")) || [];

//     // Check if item is already in cart
//     const existingItem = cart.find((item) => item.foodName === food.foodName);
//     if (existingItem) {
//         existingItem.quantity += 1; // Increase quantity if it already exists
//     } else {
//         cart.push({ ...food, quantity: 1 }); // Add new item
//     }

//     localStorage.setItem("cart", JSON.stringify(cart));
//     alert(`${food.foodName} added to cart!`);
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


/* Function to get food list from JSON */
const getFoodListFromJsonFile = async () => {
    const response = await fetch("https://pearlrhema.github.io/cse121b/fooditems.json");
    foodList = await response.json();
    displayFoodList(foodList);
};

/* Function to filter food items */
const sortCategories = (foods) => {
    const filter = document.getElementById("sortBy").value;
    reset();
    switch (filter) {
        case "breakfast":
            displayFoodList(foods.filter(food => food.category.includes("Breakfast")));
            break;
        case "launch":
            displayFoodList(foods.filter(food => food.category.includes("Lunch")));
            break;
        case "dinner":
            displayFoodList(foods.filter(food => food.category.includes("Dinner")));
            break;
        default:
            displayFoodList(foodList);
            break;
    }
};

/* Reset the display */
const reset = () => {
    templesElement.innerHTML = "";
};

/* Fetch and display food list on page load */
getFoodListFromJsonFile();

/* Event listener for sorting */
document.getElementById("sortBy").addEventListener("change", () => {
    sortCategories(foodList);
});
