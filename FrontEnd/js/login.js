// Sélectionne l'élément de soumission du formulaire.
const submit = document.querySelector('input[type="submit"]');

// Sélectionne l'élément d'affichage des messages d'erreur.
const errorMsg = document.querySelector(".erreur-msg");

// Lorsque le bouton est cliqué, cette fonction est exécutée.
submit.addEventListener("click", async function (e) {
  e.preventDefault();
  try {
    // Appelle la fonction de connexion asynchrone
    await login();
    // Redirige vers la page d'accueil
    window.location.href = "./index.html";
  } catch (err) {
    console.log(err);
    errorMsg.innerText = "Erreur dans l’identifiant ou le mot de passe";
  }
});

// Fonction pour récupérer les informations de connexion à partir des champs du formulaire.
function pageCredentials() {
  // Retourne un objet contenant l'email et le mot de passe.
  const fields = {
    email: "email",
    password: "password",
  };
  const email = document.getElementById(fields.email).value;
  const password = document.getElementById(fields.password).value;
  return { email, password };
}

// Fonction pour enregistrer le token d'authentification dans le stockage local du navigateur.
function saveToken(data) {
  localStorage.setItem("token", data.token);
  localStorage.setItem("login", true);
}

// Fonction asynchrone pour effectuer la connexion de l'utilisateur.
async function login() {
  const url = "http://localhost:5678/api/users/login";
  // Récupère les informations de connexion à partir des champs du formulaire
  const creds = pageCredentials();

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    // Convertit les informations de connexion en JSON et les envoie dans le corps de la requête
    body: JSON.stringify(creds),
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la requête de connexion");
  }

  const json = await response.json();
  console.log("Je suis log et j'ai la réponse en JSON");
  saveToken(json);
}
