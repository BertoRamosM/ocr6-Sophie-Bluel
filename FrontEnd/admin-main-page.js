import { displayGallery } from "./gallery.js";
import { works } from "./main.js";
import { adminPage } from "./admin-page-content.js";



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


    //log out functionality
    const logout = document.querySelector(".logout");
    logout.addEventListener("click", logOut)

    function logOut() {
        window.localStorage.removeItem("token");
        location.href = "/index.html";
    }



    //display and hide the modal
    const back = document.querySelector(".back-overlay");

    //those are the buttons that display the modal
    const displayModal = document.querySelectorAll(".mod");


    function closeModalXButton() {
        const xSign = document.querySelector(".x-modal");
        const xSign2 = document.querySelector(".x-modal2");
        xSign.addEventListener("click", closeModal);
        xSign2.addEventListener("click", closeModal);
    }
    closeModalXButton();

    let isModalVisible = false;

    function showModal() {
        modal.classList.remove("modal-container-close");
        modal.style.display = "block";
        back.style.display = "block";
        isModalVisible = true;
    }


    function closeModal() {
        modal.classList.add("modal-container-close");
        modal1.classList.add("modal-container-close");
        modal2.classList.add("modal-container-close");
        setTimeout(() => {
            modal.style.display = "none";
            modal1.style.display = "none";
            modal2.style.display = "none";
            back.style.display = 'none';
            isModalVisible = false;
            modal.classList.remove("modal-container-close");
            modal1.classList.remove("modal-container-close");
            modal2.classList.remove("modal-container-close");
        }, 200);
    }





    displayModal.forEach(displayModal => {
        displayModal.addEventListener("click", function (event) {
            //event propagations its used to avoid closing rhe modal when clicking on it
            event.stopPropagation();
            showModal();
        });
    });

    modal.addEventListener("click", function (event) {
        event.stopPropagation();
        const isClickInsideModal = modal.contains(event.target);
        if (!isClickInsideModal) {
            closeModal();
        }
    });

    document.addEventListener("click", function (event) {
        event.stopPropagation();
        if (isModalVisible === true) {
            closeModal();
        }
    });



    //change the modal to the form to add new work
    const btnDisplayForm = document.querySelector(".btn-ajouter");


    const modal1 = document.querySelector(".modal1");
    const modal2 = document.querySelector(".modal2");



    modal2.addEventListener("click", function (event) {
        event.stopPropagation();

    })
    btnDisplayForm.addEventListener("click", function () {

        modal1.style.display = "none";
        modal2.style.display = "block";



        //by default the button dosnt trigger the file exploer
        const buttonFileForm = document.querySelector('.button-file-form');
        buttonFileForm.addEventListener('click', function () {
            document.querySelector('.photo-input').click();
        });

        //left arrow functionality to go back to previous modal
        document.querySelector(".arrow-left").addEventListener("click", function () {
            modal1.style.display = "block";
            modal2.style.display = "none";
        })


        const fileInput = document.getElementById('file');
        const imageFile = document.querySelector(".img-input");


        fileInput.addEventListener('change', function (event) {
            const file = event.target.files[0];

            if (file) {
                const reader = new FileReader();

                // When the file is read, set the background image and update image
                reader.onload = function (image) {
                    imageFile.src = image.target.result;
                    const fileLabel = document.querySelector(".custom-file-label");
                    fileLabel.innerHTML = "";
                    fileLabel.innerHTML = `<img src="${image.target.result}" alt="uploaded file" class="img-uploaded">`;
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






        function showModalFormWindow() {
            //SUBMIT FORM DOSNT WORKKKKKK 
            const submitModalForm = document.querySelector(".btn-ajouter2");
            submitModalForm.addEventListener("click", function (event) {
                event.preventDefault();

                const token = localStorage.getItem("token");


                const textInput = document.querySelector('.title-input').value;
                const categoryInput = document.querySelector('.category-input').value;
                const photoInput = document.querySelector('.photo-input').files[0];

                const formData = new FormData();

                formData.append("title", textInput);
                formData.append("image", photoInput);
                formData.append("category", parseInt(categoryInput.replace(/[^0-9]/g, '')));




                uploadWork(formData, token)
            });

        }
        showModalFormWindow();
    })
    async function uploadWork(formData, token) {
        try {
            const response = await fetch('http://localhost:5678/api/works/', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Error sending the work');
            }

            const data = await response.json();
            closeModal();
            console.log('Work uploaded successfully:', data);
            works.push(data);
            displayGallery(works);
            displayModalGallery();
        } catch (error) {
            console.error('Error:', error);
        }
    }


}






