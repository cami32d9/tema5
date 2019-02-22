document.addEventListener("DOMContentLoaded", start);

let dishes = [];
let dish;
const filterButtons = document.querySelectorAll(".filter_button");
const menu = document.querySelector("#menu");


let urlParams = new URLSearchParams(window.location.search);
let dishID = urlParams.get("dishID");

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
        dishes.forEach(obj => {
            if (obj.billede == dishID) {
                dish = obj;
            }
        });

        open();
    }

    function open() {
        document.querySelector(".content_page").innerHTML =
            `<img src="images/large/${dish.billede}.jpg">
                    <h2>${dish.navn}</h2>
                    <div class="origin">${dish.oprindelse}</div>
                    <p>${dish.lang}</p>
                    <div class="price">Pris: ${dish.pris},-</div>`;
        document.querySelector("title").textContent = `${dish.navn} - Bistro Babushka`;
    }

    getJson();

    document.querySelector(".back").addEventListener("click", () => {
        location.href="babushka_singleview_solution.html"
    });

}

