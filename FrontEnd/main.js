//fetch work array from server and store in works variable and export it
export const works = await fetch('http://localhost:5678/api/works').then(works => works.json());


import { displayGallery } from "./gallery.js";
import { displayLogin } from "./login.js";
import { toggleActive, filterButtonsFunctionality } from "./filter-buttons.js";



//display gallery on load the page
displayGallery(works);

//display login screen when pressing login
displayLogin();

//adds functionality to the filter buttons
filterButtonsFunctionality();




