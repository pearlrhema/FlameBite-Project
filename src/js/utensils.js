const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

hamButton.addEventListener('click', () => {
	navigation.classList.toggle('open');
	hamButton.classList.toggle('open');
});

/* Declare and initialize global variables */
const templesElement = document.getElementById("Delicacies");
let UtensilsList = [];

/* async displayTemples Function */
const displayFoodList = (foods) => {
    for (const food of foods) {
        const myArticle = document.createElement("article");
        const h3 = document.createElement("h3");
        const h4 = document.createElement("h4");
        h3.textContent = food.productName;
        h4.textContent = food.Description;
        const img = document.createElement("img");
        img.src = food.imageSource;
        img.setAttribute('alt', `${food.productName}`);
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
    const myresponse = await fetch("https://pearlrhema.github.io/wdd131/utensils.json");
    let foodData = await myresponse.json();
    UtensilsList = foodData;
    displayFoodList(UtensilsList);
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
        case "cylinder":
            displayFoodList(Delicacies.filter(food => food.category.includes("cylinder")));
            break;
        case "burner":
            displayFoodList(Delicacies.filter(food => food.category.includes("burner")));
            break;
        case "stove":
            displayFoodList(Delicacies.filter(food => food.category.includes("stove")));
            break;
        default:
            reset();
            // displayFoodList(foodList);
            break;
    }
}


getFoodListFromJsonFile();
reset();

/* Event Listener */
document.getElementById("sortBy").addEventListener('change', () => {sortCategories(UtensilsList)});