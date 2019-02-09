let dishes = [];

document.addEventListener("DOMContentLoaded", start);

function start() {
    console.log("start");

    let menu = document.querySelector("#menu");

    async function getJson() {
        console.log("getJson");
        let jsonData = await fetch("dishes.json");
        dishes = await jsonData.json();
        const forretter = dishesByCategory("forretter");
        showMenu();
        console.log(forretter);
    }

    function showMenu() {
        console.log("showMenu");
        dishes.forEach(dish => {
            menu.innerHTML +=
                `<div class="dish_container">
                    <img src="images/small/${dish.billede}-sm.jpg">
                    <h2>${dish.navn}</h2>
                    <div class="origin">${dish.oprindelse}</div>
                    <p>${dish.kort}</p>
                    <div class="price">Pris: ${dish.pris}</div>
                </div>
                </div>`;
        });
    }

    getJson();

}

function dishesByCategory(category) {
    menu.innerHTML = "";
    const category = dishes.filter(dish => dish.kategori === category);
}

// function dishesByCategory(category) {
//     return dishes.filter(dish => dish.kategori === category);
// }
