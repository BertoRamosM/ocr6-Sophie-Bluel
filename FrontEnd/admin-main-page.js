import { displayGallery } from "./gallery.js";
import { works } from "./main.js";
import { adminPage, modal1, modal2 } from "./admin-page-content.js";

//new array to dont loose the deleted items?????
let deletedWorks = [];


export function displayAdminPage() {
    
    document.body.innerHTML = adminPage;

    displayGallery(works);


    const modal = document.querySelector(".modal-container");
    
    function displayModalGallery() {
        const modalGallery = document.querySelector(".gallery-modal");


        modalGallery.innerHTML = "";


        for (let i = 0; i < works.length; i++) {
            //create a figure for each element in the array and append to gallery
            const figureElement = document.createElement("figure");
            figureElement.classList.add("figure-modal");
            modalGallery.appendChild(figureElement);

            //create an image for each element of the array with each url and append
            const imageElement = document.createElement("img");
            imageElement.src = works[i].imageUrl;
            imageElement.classList.add("modal-gallery-pictures");
            figureElement.appendChild(imageElement);


            //delete icon
            const binElement = document.createElement("div");
            binElement.classList.add("bin");
            figureElement.appendChild(binElement);



            //delete functionality
            binElement.addEventListener("click", function () {
                //get the index of the itm to be deletd
                const workIdToDelete = works[i].id; 
                const token = localStorage.getItem("token");

                fetch(`http://localhost:5678/api/works/${workIdToDelete}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                    .then(response => {
                        if (response.ok) {
                            console.log("work removed");
                            works.splice(i, 1);

                            displayModalGallery();
                            displayGallery(works);
                        } else {
                            throw new Error('Failed to delete work');
                        }
                    })
                    .catch(error => {
                        console.error("Error:", error);
                    });
            });

        }

    }

    displayModalGallery();


    function logOut() {
        const logout = document.querySelector(".logout");
        logout.addEventListener("click", function () {

            window.localStorage.removeItem("token");

            location.href = "/index.html";


        })
    }
    logOut();

    let isModalVisible = false;


    function showModal() {
        const back = document.querySelector(".back-overlay");
        const displayModal = document.querySelectorAll(".mod"); 
        displayModal.forEach(displayModal => {
            displayModal.addEventListener("click", function () {
                modal.style.display = "block";
                back.style.display = "block";
                isModalVisible = true;
            })
        })
    }
    showModal();



    function closeModal() {
        const back = document.querySelector(".back-overlay");
        const xSign = document.querySelector(".x-modal");

        xSign.addEventListener("click", function () {
            modal.style.display = "none";
            back.style.display = 'none';
            isModalVisible = false;
        })
    }
    closeModal();

    
    /*function closeModalOnClick(modal) {
        const back = document.querySelector(".back-overlay");
        document.addEventListener('click', function(event) {
            const isClickInsideModal = modal.contains(event.target);
            if (isModalVisible && !isClickInsideModal) {
                modal.style.display = 'none';
                back.style.display = "none";
                isModalVisible = false;
            }
        });
    }
    closeModalOnClick(modal)*/



    //change the modal to the form to add new work
    function displayModalForm() {
        const modal = document.querySelector(".modal");
        const btnDisplayForm = document.querySelector(".btn-ajouter");

        btnDisplayForm.addEventListener("click", function () {


            modal.innerHTML = "";
            modal.innerHTML = modal2;
            closeModal();

            //by default the button dosnt trigger the file exploer
            const buttonFileForm = document.querySelector('.button-file-form');
            buttonFileForm.addEventListener('click', function () {
                document.querySelector('.photo-input').click();
            });

            //left arrow functionality to go back to previous modal
            document.querySelector(".arrow-left").addEventListener("click", function () {
                modal.innerHTML = "";
                modal.innerHTML = modal1;
                displayModalGallery();
                displayModalForm();
                closeModal();
            })

            const fileInput = document.getElementById('file');
            const imageFile = document.querySelector(".img-input");
            let newImage = null;

            fileInput.addEventListener('change', function (event) {
                const file = event.target.files[0];

                if (file) {
                    const reader = new FileReader();

                    // When the file is read, set the background image and update file name display
                    reader.onload = function (e) {
                        imageFile.src = e.target.result;
                        const fileLabel = document.querySelector(".custom-file-label");
                        fileLabel.innerHTML = "";
                        fileLabel.innerHTML = `<img src="${e.target.result}" alt="uploaded file" class="img-uploaded">`;                        // Store the file in a variable
                        newImage = file;
                    };

                    // Read the file as a data URL
                    reader.readAsDataURL(file);
                } else {
                    // Handle case where no file is selected
                    return;
                }
            });



            //if all inputs in the form arre filled ...
            const photoInput = document.querySelector(".photo-input");
            const textInput = document.querySelector(".title-input");
            const selectInput = document.querySelector(".category-input");
            const submitButton = document.querySelector(".btn-ajouter2");

            function checkInputs() {
                let formFilled = false;


                if (
                    photoInput.files.length > 0 &&
                    textInput.value.trim() !== "" &&
                    selectInput.value !== ""
                ) {
                    formFilled = true;
                } else {
                    formFilled = false;
                }

                if (formFilled === true) {
                    submitButton.classList.add("btn-ajouter2-active");
                    submitButton.disabled = false;
                } else if (formFilled === false) {
                    submitButton.classList.remove("btn-ajouter2-active");
                    submitButton.disabled = true;
                }


            }

            
            photoInput.addEventListener('change', checkInputs);
            textInput.addEventListener('input', checkInputs);
            selectInput.addEventListener('change', checkInputs);






            //SUBMIT FORM DOSNT WORKKKKKK 
            const submitModalForm = document.querySelector(".btn-ajouter2");
            submitModalForm.addEventListener("click", function (event) {
                event.preventDefault();
                const formData = new FormData();
                formData.append("id", 1);
                if (newImage !== null) {
                    formData.append('image', newImage);
                }
                formData.append('title', textInput.value);
                formData.append('categoryId', selectInput.value);
                formData.append('userId', 1);

                const token = localStorage.getItem("token");

                console.log(textInput.value + selectInput.value + newImage)
                console.log('Form Data:', formData);
                console.log('Token:', token);

                fetch('http://localhost:5678/api/works', {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,

                    },
                    body: formData,
                })
                    .then(response => {
                        if (response.ok) {
                            console.log("New work added", response);
                            return response.json();
                        } else {
                            throw new Error('ERROR');
                        }
                    })
                    .then(data => {
                        console.log("Response Data:", data);
                        works = data;
                    })
                    .catch(error => {
                        console.log("ERROR:", error);
                    });
            });



        })





    }
    displayModalForm();


}


