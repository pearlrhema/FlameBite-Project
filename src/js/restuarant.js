const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

hamButton.addEventListener('click', () => {
	navigation.classList.toggle('open');
	hamButton.classList.toggle('open');
});

/* Declare and initialize global variables */
const templesElement = document.getElementById("Delicacies");
let foodList = [];

/* async displayTemples Function */
const displayFoodList = (foods) => {
    for (const food of foods) {
        const myArticle = document.createElement("article");
        const h3 = document.createElement("h3");
        const h4 = document.createElement("h4");
        h3.textContent = food.foodName;
        h4.textContent = food.description;
        const img = document.createElement("img");
        img.src = food.imageUrl;
        img.setAttribute('alt', `${food.foodName}`);
        img.setAttribute("loading", "lazy");
        img.setAttribute("width", 400);
        img.setAttribute("height", 250);
        myArticle.appendChild(h3);
        myArticle.appendChild(img);
        myArticle.appendChild(h4);
        templesElement.appendChild(myArticle);
    };
}


/* async getTemples Function using fetch()*/
const getFoodListFromJsonFile = async () => {
    const myresponse = await fetch("https://pearlrhema.github.io/cse121b/fooditems.json");
    let foodData = await myresponse.json();
    foodList = foodData;
    displayFoodList(foodList);
    // console.log(foodList);
}

/* reset Function */
const reset = () => {
    templesElement.textContent = "";
}

/* sortBy Function */
const sortCategories = (Delicacies) => {
    reset();
    const filter = document.getElementById("sortBy").value;
    switch (filter) {
        case "breakfast":
            displayFoodList(Delicacies.filter(food => food.category.includes("Breakfast")));
            break;
        case "launch":
            displayFoodList(Delicacies.filter(food => food.category.includes("Lunch")));
            break;
        case "dinner":
            displayFoodList(Delicacies.filter(food => food.category.includes("Dinner")));
            break;
        default:
            displayFoodList(foodList);
            break;
    }
}


getFoodListFromJsonFile();
// reset();

/* Event Listener */
document.getElementById("sortBy").addEventListener('change', () => {sortCategories(foodList)});