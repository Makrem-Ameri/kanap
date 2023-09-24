
const productId = new URLSearchParams(window.location.search).get("id");
console.log(productId);

if (productId !== null){
fetch(`http://localhost:3000/api/products/${productId}`)
  .then(response => response.json())
  .then(selectProduct => {
    console.log(selectProduct);
    document.title = selectProduct.name;
    const img = document.createElement("img");
img.src = selectProduct.imageUrl;
img.alt = selectProduct.altTxt;
document.getElementsByClassName("item__img")[0].appendChild(img);
document.getElementById("title").innerText = selectProduct.name;
document.getElementById("price").innerText = selectProduct.price + " ";
 document.getElementById("description").innerText = selectProduct.description;

 // Boucle forEach pour ajouter toutes les couleurs en option du select en HTML
  selectProduct.colors.forEach(function (color) {
  const option = document.createElement("option");
  const select = document.getElementById("colors");
    
// Récupération des données de l'API
option.value = color;
   option.innerText = color;
    
  // Ajout de l'option à la sélection (select en HTML)
   select.appendChild(option);
 })

    //bouton Ajouter au panier puis.....
    const selectBoutonPanier = document.querySelector("#addToCart");
  // .....Ecoute du bouton Panier pour envoyer les choix de l'utilisateur
 selectBoutonPanier.addEventListener("click", (event)=>{
 event.preventDefault();
 // Sélection de l'id pour le choix de la couleur et....
 const colorId = document.querySelector("#colors");
// insertion de la couleur choisie par l'utilisateur dans une variable
   choiceColor = colorId.value;
  // Sélection de l'id pour le choix de la quantité et insertion de la quantité choisie par l'utilisateur dans une variable
 const quantity = document.querySelector("#quantity");
 choiceQuantity = Number(quantity.value);
console.log(choiceQuantity);

 if (choiceColor !== "" && choiceQuantity > 0 && choiceQuantity <= 100 && Number.isInteger(choiceQuantity)) {
 let optionsProduct = {
  idProduct: selectProduct._id ,
 colorProduct: choiceColor ,
 quantityProduct: choiceQuantity
 }
  console.log(optionsProduct);
              
let messageLocalStorageUpdating = false;
//Fonction ajouter dans le localStorage un produit sélectionné par l'utilisatueur, avec ses options (id, couleur, quantité)
const addProductLocalStorage = () => {
                    
// Si le produit et la couleur choisis existent déjà dans le localStorage alors on incrémente uniquement la quantité
let findProduct = produitEnregistreDansLocalStorage.find((x) => {return x.idProduct === optionsProduct.idProduct && x.colorProduct === optionsProduct.colorProduct});
if(findProduct){
const total = Number(findProduct.quantityProduct) + Number(optionsProduct.quantityProduct);
if(total <= 100){
 // On met la variable message sur false pour pouvoir afficher un message plus approprié
 messageLocalStorageUpdating = false;
 findProduct.quantityProduct = Number(findProduct.quantityProduct) + Number(optionsProduct.quantityProduct);
   alert(`La quantité du produit ${selectProduct.name} de couleur ${choiceColor} a bien été mise à jour.`);
 }
 else{
// On met la variable message sur false pour pouvoir afficher un message plus approprié
 messageLocalStorageUpdating = false;
 alert("La quantité d'un article (même référence et même couleur) ne peut pas dépasser 100. Merci de rectifier la quantité choisie.");
}
 }
 else{
 // On met la variable message sur true car c'est bien ce message là qu'on veut afficher
 messageLocalStorageUpdating = true;
 // on met les options du produit choisi dans une variable "produitEnregistreDansLocalStorage"
 produitEnregistreDansLocalStorage.push(optionsProduct);
}
                    
 // Transformation en format JSON et envoi des infos dans la clé "produit" du localStorage
 localStorage.setItem("produit", JSON.stringify(produitEnregistreDansLocalStorage))
}
  let produitEnregistreDansLocalStorage = JSON.parse(localStorage.getItem("produit"));
  if(produitEnregistreDansLocalStorage){
  addProductLocalStorage();
  console.log(produitEnregistreDansLocalStorage);
                }
  // si le localStorage est vide
  else{
  produitEnregistreDansLocalStorage = [];
 addProductLocalStorage();
console.log(produitEnregistreDansLocalStorage);
  // On met la variable message sur false pour pouvoir afficher un message plus approprié
  messageLocalStorageUpdating = false;
// alert(`Félicitations !! Vous venez d'ajouter votre premier produit dans le panier ! `);
 window.location.href="cart.html"
  }
// si la variable messageLocalStorageUpdating est vrai alors on affiche ce message :
if(messageLocalStorageUpdating){
 //alert(`Le produit ${selectProduct.name} de couleur ${choiceColor} a bien été ajouté au panier.`);
 window.location.href="cart.html"
}

}
// si la couleur n'est pas sélectionnée ou la quantité non comprise entre 1 et 100 alors on affiche un message d'alerte
  else { alert(`sélectionner une couleur et une quantité de nombre entier entre 1 et 100`);
            }
        });
    })
    .catch((err) => {
        console.log("Erreur Fetch product.js : l'id du produit est incorrect.", err);
        alert(`Le produit sélectionné n'a pas été trouvé !`);
        window.location.href = "index.html";
    })
}
