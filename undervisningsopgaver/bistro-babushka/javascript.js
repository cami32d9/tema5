let dishes = [];

document.addEventListener("DOMContentLoaded", start);

function start() {
    console.log("start");

    let menu = document.querySelector("#menu");
    document.querySelector("#show_all").addEventListener("click", showMenu);
    document.querySelector("#starters").addEventListener("click", function() {
        dishesByCategory("forretter");
    });
    document.querySelector("#main_course").addEventListener("click", function() {
        dishesByCategory("hovedretter");
    });
    document.querySelector("#desserts").addEventListener("click", function() {
        dishesByCategory("desserter");
    });

    async function getJson() {
        console.log("getJson");
        let jsonData = await fetch("dishes.json");
        dishes = await jsonData.json();
        showMenu();
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
                    <div class="price">Pris: ${dish.pris},-</div>
                </div>
                </div>`;
        });
    }

    getJson();

}

function dishesByCategory(category) {
    console.log("Filtered");
    menu.innerHTML = "";
    const filtered = dishes.filter(dish => dish.kategori === category);
    filtered.forEach(dish => {
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
