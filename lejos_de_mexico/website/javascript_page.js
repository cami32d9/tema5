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
            if (obj.image == dishID) {
                dish = obj;
            }
        });

        open();
    }

    function open() {
        document.querySelector("h1").textContent = `${dish.title}`;
        document.querySelector(".content_page").innerHTML =
            `<h2>${dish.longtitle}</h2><img src="elements/dishes/${dish.image}.jpg">
                    <p>${dish.longtext}</p>
                    <div class="price">Price: ${dish.price},-</div>`;
        document.querySelector("title").textContent = `${dish.title} - Lejos de Mexico`;
    }

    getJson();

}

