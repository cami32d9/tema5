document.addEventListener("DOMContentLoaded", start);

let dishes = [];
let filtered = "";
const filterButtons = document.querySelectorAll(".filter_button");


function start() {
    filterButtons.forEach(button => {
        button.addEventListener("click", function () {
                let category = this.getAttribute("data-type");
                dishesByCategory(category);
                document.querySelectorAll("button").forEach(button => {
                    button.classList.remove("button_chosen");
                    this.classList.add("button_chosen");
                    document.querySelector("h1").textContent = this.textContent;
                })
            }
        )
    });

    async function getJson() {
        console.log("getJson");
        let jsonData = await fetch("dishes.json");
        dishes = await jsonData.json();
        dishesByCategory("all");
    }
    getJson();
}

function dishesByCategory(category) {
    menu.innerHTML = "";

    if (category == "all") {
        filtered = dishes;
    }
    else {
        filtered = dishes.filter(dish => dish.kategori === category);
    }

    filtered.forEach(dish => {
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
