import { works } from "./main.js";
import { displayGallery } from "./gallery.js";

export function filterButtonsFunctionality() {
    //filter by all
    const btnAll = document.querySelector(".filter-all");
    btnAll.addEventListener("click", function () {
        toggleActive(btnAll);
        displayGallery(works);
    });




    //filter by objects
    const btnObjets = document.querySelector(".filter-objets");
    btnObjets.addEventListener("click", function () {
        const worksFiltered = works.filter(function (work) {
            return work.categoryId === 1;
        })
        toggleActive(btnObjets);
        displayGallery(worksFiltered);
    });



    //filter by appartments
    const btnAppartments = document.querySelector(".filter-appart");
    btnAppartments.addEventListener("click", function () {
        const worksFiltered = works.filter(function (work) {
            return work.categoryId === 2;
        })
        toggleActive(btnAppartments);
        displayGallery(worksFiltered);
    });


    //filter by hotels and restaurants
    const btnHotelRest = document.querySelector(".filter-hotel-rest");
    btnHotelRest.addEventListener("click", function () {
        const worksFiltered = works.filter(function (work) {
            return work.categoryId === 3;
        })
        toggleActive(btnHotelRest);
        displayGallery(worksFiltered);
    });
}


export function toggleActive(clickedButton) {
    let buttons = document.querySelectorAll('.btn-filter');

    // Remove active class from all buttons
    buttons.forEach(function (button) {
        button.classList.remove('btn-filter-active');

    });

    // Add active class to the clicked button
    clickedButton.classList.add('btn-filter-active');
}
