
import { displayAdminPage } from "./admin-main-page.js";

export function displayLogin() {
    const btnLogin = document.querySelector(".login-btn");
    const mainContent = document.querySelector("main");

    btnLogin.addEventListener("click", function () {
        mainContent.innerHTML = "";
        mainContent.innerHTML = displayLoginForm();
        loginProcess();
    });
}

function displayLoginForm() {
    return ' <section class="login">' +
        '<h2 class="login-title">Log in</h2>' +
        '<form class="login-form">' +
        '<label for="email">Email:</label>' +
        '<input type="email" id="email" name="email" required class="form-input email-input">' +
        '<label for="password">Mot de passe:</label>' +
        '<input type="password" id="password" name="password" required class="form-input password-input">' +
        '<p class="completed-login">Connexion réussie, redirection en cours...</p>' +
        '<div class="animation-loader">' +
        '<div class="circle purple"></div>' +
        '<div class="circle pink"></div>' +
        '<div class="circle green"></div>' +
        '</div>' +
        '<p class="failed-login"> Email ou mot de passe erronés</p>' +
        '<button type="submit" class="form-submit-btn">Se connecter</button>' +
        '<a class="pass-reset" href="#">Mot de passe oublié</a>' +
        '</form>' +
        '</section>';
}

async function loginProcess() {
    let form = document.querySelector(".login-form");
    const animationLoader = document.querySelector(".animation-loader");

    form.addEventListener("submit", async function (event) {
        event.preventDefault();
        const redSignal = document.querySelector(".failed-login");
        const greenSignal = document.querySelector(".completed-login");

        const credentialsLogin = {
            email: event.target.querySelector(".email-input").value,
            password: event.target.querySelector(".password-input").value,
        };

        try {
            const response = await fetch('http://localhost:5678/api/users/login', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(credentialsLogin),
            });

            if (response.ok) {
                greenSignal.style.display = "block";
                redSignal.style.display = "none";
                animationLoader.style.display = "block";
                const data = await response.json();
                const token = data.token;
                window.localStorage.setItem("token", token);

                console.log("Login successful");
                console.log(`token : ${token}`);
                
                setTimeout(displayAdminPage, 1000);
            } else {
                redSignal.style.display = "block";
                greenSignal.style.display = "none";
                throw new Error('Login failed');
            }
        } catch (error) {
            console.log(error);
        }
    });

    const logoHead = document.querySelector(".head-title");
    logoHead.addEventListener("click", function () {
        location.href = "/index.html";
    });
}
