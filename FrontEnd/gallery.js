export function displayGallery(array) {

    //empty gallery for re-creation
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = "";


    for (let i = 0; i < array.length; i++) {
        //create a figure for each element in the array and append to gallery
        const figureElement = document.createElement("figure");
        gallery.appendChild(figureElement);

        //create an image for each element of the array with each url and append
        const imageElement = document.createElement("img");
        imageElement.src = array[i].imageUrl;
        figureElement.appendChild(imageElement);


        //same for the caption
        const captionElement = document.createElement("figcaption");
        captionElement.innerHTML = array[i].title;
        figureElement.appendChild(captionElement);
    }

}