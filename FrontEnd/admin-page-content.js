export const adminPage = `
<div class="black-banner">

<img src="./assets/icons/edit-white.svg" alt="edit" class="mod">

  <p>Mode édition</p>
</div>
<header>
  <h1>Sophie Bluel <span>Architecte d'intérieur</span></h1>
  <nav>
    <ul>
    <li><a href="#gallery">projets</a></li>
    <li><a href="#contact">contact</a></li>
    <li class="logout">logout</li>
    
    <li><img src="./assets/icons/instagram.png" alt="Instagram"></li>

    
    </ul>
  </nav>
</header>
<main>
  <section id="introduction">
    <figure>
      <img src="./assets/images/sophie-bluel.png" alt="">
    </figure>
    <article>
      <h2>Designer d'espace</h2>
      <p>Je raconte votre histoire, je valorise vos idées. Je vous accompagne de la conception à la livraison finale du chantier.</p>
      <p>Chaque projet sera étudié en commun, de façon à mettre en valeur les volumes, les matières et les couleurs dans le respect de l’esprit des lieux et le choix adapté des matériaux. Le suivi du chantier sera assuré dans le souci du détail, le respect du planning et du budget.</p>
      <p>En cas de besoin, une équipe pluridisciplinaire peut-être constituée : architecte DPLG, décorateur(trice)</p>
    </article>
  </section>
  <section id="portfolio">


  
  <div class="modifier">
    <h2 id="gallery">Mes Projets</h2>
    <img src="./assets/icons/edit.svg" alt="edit" class="mod">
    <a class="mod" href="#modal-container-js">Modifier</a>
  </div>



  <aside class="modal-container js-modal modal1" id="modal-container-js">
  <div class="modal">
      <h3>Gallerie photo</h3>

      <img src="./assets/icons/xmark.svg" alt="close-modal" class="x-modal">

      <div class="gallery-modal"></div>

      <div class="border-modal"></div>

      <button class="btn-ajouter">Ajouter un photo</button>

  </div>
  </aside>


  



  <aside class="modal-container js-modal modal2" id="modal-container-js">
  <div class="modal">
  <h3>Ajout photo</h3>

  <img src="./assets/icons/arrow-left.svg" alt="arrow-left" class="arrow-left">
  <img src="./assets/icons/xmark.svg" alt="close-modal" class="x-modal x-modal2">


  <form class="modal-form">
      
      
      <label for="file" class="custom-file-label">
          <img src="/assets/icons/file-input.svg" alt="uplod file" class="img-input">
          <button class="button-file-form" type="button">+ Ajouter photo</button>
          jpg, png : 4mo max</label>
      <input type="file" id="file" class="photo-input" accept="image/*">
    
  
      
      <label for="title" class="modal-form-text">Title</label>
      <input type="text" class="title-input" >
      

      <label for="Category" class="modal-form-text">Category</label>
      <select class="category-input">
          <option value="" disabled selected></option>
          <option value=1>Objets</option>
          <option value=2>Appartaments</option>
          <option value=3>Hôtels & restaurants</option>
      </select>
      
      <div class="border-modal"></div>
      
      <button type="submit" class="btn-ajouter btn-ajouter2">Valider</button>
  </form>

</div>


  </div>
  </aside>




  <div class="back-overlay"></div>




    <div class="gallery"></div>
  </section>
  <section id="contact">
    <h2>Contact</h2>
    <p>Vous avez un projet ? Discutons-en !</p>
    <form action="#" method="post">
      <label for="name">Nom</label>
      <input type="text" name="name" id="name">
      <label for="email">Email</label>
      <input type="email" name="email" id="email">
      <label for="message">Message</label>
      <textarea name="message" id="message" cols="30" rows="10"></textarea>
      <input type="submit" value="Envoyer">
    </form>
  </section>
</main>
<footer>
  <nav>
    <ul>
      <li>Mentions Légales</li>
    </ul>
  </nav>
</footer>
`;


export const modal1 = `
<h3>Gallerie photo</h3>

<img src="./assets/icons/xmark.svg" alt="close-modal" class="x-modal">

<div class="gallery-modal"></div>

<div class="border-modal"></div>

<button class="btn-ajouter">Ajouter un photo</button>

`;


export const modal2 = `
<h3>Ajout photo</h3>

        <img src="./assets/icons/arrow-left.svg" alt="arrow-left" class="arrow-left">
        <img src="./assets/icons/xmark.svg" alt="close-modal" class="x-modal">


        <form class="modal-form">
            
            
            <label for="file" class="custom-file-label">
                <img src="/assets/icons/file-input.svg" alt="uplod file" class="img-input">
                <button class="button-file-form" type="button">+ Ajouter photo</button>
                jpg, png : 4mo max</label>
            <input type="file" id="file" class="photo-input" accept="image/*">
          
        
            
            <label for="title" class="modal-form-text">Title</label>
            <input type="text" class="title-input" >
            

            <label for="Category" class="modal-form-text">Category</label>
            <select class="category-input">
                <option value="" disabled selected></option>
                <option value="category1">Objets</option>
                <option value="category2">Appartaments</option>
                <option value="category3">Hôtels & restaurants</option>
            </select>
            
            <div class="border-modal"></div>
            
            <button type="submit" class="btn-ajouter btn-ajouter2">Valider</button>
        </form>

    </div>
`;
