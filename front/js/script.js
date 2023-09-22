fetch('http://localhost:3000/api/products')
.then((response)=>response.json())
.then((data)=>{
    displayProduct(data);
})
.catch((error)=>{
    console.log(error);
})
//fonction afficher la liste des produits
function displayProduct(products){
    for(product of products){
        const products=`
        <a href="./product.html?id=${product._id}">
        <article>
          <img src="${product.imageUrl}" alt="${product.altTxt}">
          <h3 class="productName">${product.name}</h3>
          <p class="productDescription">${product.description}</p>
        </article>
      </a>
      `;
      document.getElementById('items')
      .insertAdjacentHTML('beforeend',products)
    }
  } 
  
