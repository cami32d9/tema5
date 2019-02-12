document.addEventListener("DOMContentLoaded", start);

let dishes = [];
let filtered = "";
const filterButtons = document.querySelectorAll(".filter_button");
const menu = document.querySelector("#menu");
const popup = document.querySelector(".popup");
const popupDim = document.querySelector(".popup_dim");

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
        let template =
            `<div class="dish_container">
                    <img src="images/small/${dish.billede}-sm.jpg">
                    <h2>${dish.navn}</h2>
                    <div class="origin">${dish.oprindelse}</div>
                    <p>${dish.kort}</p>
                    <div class="price">Pris: ${dish.pris},-</div>
                </div>`;
        menu.insertAdjacentHTML("beforeend", template);

        menu.lastElementChild.addEventListener("click", openPopup);
        popupDim.addEventListener("click", closePopup);
        document.querySelector(".close").addEventListener("click", closePopup);

        function openPopup() {
            document.querySelector(".popup_info").innerHTML =
                `<img src="images/large/${dish.billede}.jpg">
                    <h2>${dish.navn}</h2>
                    <div class="origin">${dish.oprindelse}</div>
                    <p>${dish.lang}</p>
                    <div class="price">Pris: ${dish.pris},-</div>`;
            popupDim.style.display = "block";
            popup.style.display = "block";
            document.body.style.overflow = "hidden";
        }
    });
}

function closePopup() {
    popupDim.style.display = "none";
    popup.style.display = "none";
    document.body.style.overflow = "visible";
}
