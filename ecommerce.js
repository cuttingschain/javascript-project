  // let colors = ["red", "green", "blue"]
  // localStorage.setItem("rengler",JSON.stringify(colors))

  // let reng = JSON.parse(localStorage.getItem("rengler"))
  // console.log(reng); bele neyiseni goturmek istiyende isdifade edirik goturub isdifade eliyende ele eliyirik

  // localStorage.removeItem("rengler") silmek istiyende ise remove
  // localStorage.clear() birden 5 6 dene 10 dene falan olanda cox olanda localStorage.clear() ile silirik hamsini

function getAllproducts() {
  fetch("http://localhost:3000/products")
    .then(res => res.json())
    .then(data => {
      let cards = document.querySelector(".cards");
      cards.innerHTML = "";
      data.forEach(product => {
        let href = "#";
        if (product.id == 1) href = "ecimg1.html";
        if (product.id == 2) href = "ecimg2.html";
        if (product.id == 3) href = "ecimg3.html";
        if (product.id == 4) href = "ecimg4.html";
        if (product.id == 5) href = "ecimg5.html";
        if (product.id == 6) href = "ecimg6.html";
        if (product.id == 7) href = "ecimg7.html";
        if (product.id == 8) href = "ecimg8.html";
        if (product.id == 9) href = "ecimg9.html";
        if (product.id == 10) href = "ecimg10.html";
        if (product.id == 11) href = "ecimg11.html";
        if (product.id == 12) href = "ecimg12.html";

        cards.innerHTML += `
          <div class="card">
            <a href="${href}">
              <img src="${product.image}" alt="${product.title}">
            </a>
            <h1>${product.title}</h1>
            <h3>${product.description}</h3>
          </div>
        `;
      });
    });
}

getAllproducts();




  // let gmail = "12345"
  // let input = document.querySelector(".input")

  // if(input.value === gmail){
  // console.log("✅ qeydiyatdan duz kecdiz");
  // }else{
  // console.log("❌ qeydiyatdan duz kecmediz ");

  // }

  const cartIcon = document.getElementById("cartIcon");
  const cartPanel = document.getElementById("cartPanel");
  const overlay = document.getElementById("overlay");
  const closeCartBtn = document.getElementById("closeCart");
  const continueBrowsing = document.getElementById("continueBrowsing");

  function openCart() {
    cartPanel.classList.add("open");
    overlay.classList.add("active");
  }
  function closeCartPanel() {
    cartPanel.classList.remove("open");
    overlay.classList.remove("active");
  }

  cartIcon.addEventListener("click", (e) => {
    e.preventDefault();   
    openCart();
  });
  closeCartBtn.addEventListener("click", closeCartPanel);
  overlay.addEventListener("click", closeCartPanel);
  continueBrowsing.addEventListener("click", closeCartPanel);

  window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
      nav.classList.add('transparent');
    } else {
      nav.classList.remove('transparent');
    }
  });

  function openCart() {
    cartPanel.classList.add("open");
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }
  function closeCartPanel() {
    cartPanel.classList.remove("open");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  }
let listproduct = [
    { id: 1,  name: "ST.LAURENT",    price: 178, image: "https://embawood.az/image/catalog/Yeni%20stullar/ST%20Loren%20/5_1.png" },
    { id: 2,  name: "ST Pandora",    price: 300, image: "https://embawood.az/image/catalog/Yeni%20stullar/ST%20Pandora/Pandora3.png" },
    { id: 3,  name: "ST Alfa",       price: 212, image: "https://embawood.az/image/catalog/Stullar/Alfa/ST%20alfa1.png" },
    { id: 4,  name: "ST Sento",      price: 100, image: "https://embawood.az/image/catalog/Stullar/vertex%20ve%20sento/St%20Sento.png" },
    { id: 5,  name: "ST Vertex",     price: 250, image: "https://embawood.az/image/catalog/Stullar/vertex%20ve%20sento/St%20vertex.png" },
    { id: 6,  name: "ST TARAN",      price: 210, image: "https://embawood.az/image/catalog/Stullar/Taran/ST%20Taran%207.png" },
    { id: 7,  name: "ST CORELLA",    price: 80,  image: "https://embawood.az/image/catalog/Table%20x%20Chairs/ST%20Moon/ST_moon_1.png" },
    { id: 8,  name: "MANILA MNL 04", price: 150, image: "https://admin.gardashlar.com/storage/products/manila-mnl-04-qara_1761893870_6175.webp" },
    { id: 9,  name: "WN1402A",       price: 260, image: "https://admin.gardashlar.com/storage/products/wn1402a-black_1761842207_4785.webp" },
    { id: 10, name: "Murano MRN 20", price: 205, image: "https://admin.gardashlar.com/storage/products/mrn-20-1_1761841678_1823.webp" },
    { id: 11, name: "EDEN 73",       price: 225, image: "https://admin.gardashlar.com/storage/products/eden-73-1_1761841639_7121.webp" },
    { id: 12, name: "Otm 01",        price: 400, image: "https://admin.gardashlar.com/storage/products/otm-01_1761841563_1052.webp" },
];

let carts = [];

let iconcart = document.querySelector(".icon-cart");
let close = document.querySelector(".close");
let body = document.querySelector("body");
let listproductHTML = document.querySelector(".listproduct");
let listcartHTML = document.querySelector(".listcart");
let iconcartspan = document.querySelector(".icon-cart span");

iconcart.addEventListener("click", () => {
    body.classList.toggle("showcart");
});

close.addEventListener("click", () => {
    body.classList.toggle("showcart");
});

const addDataToHTML = () => {
    listproductHTML.innerHTML = "";                   
    if (listproduct.length > 0) {
        listproduct.forEach(product => {             
            let newproduct = document.createElement("div");
            newproduct.classList.add("item");          
            newproduct.dataset.id = product.id;
            newproduct.innerHTML = `                   
                <img src="${product.image}" alt="${product.name}">
                <h2>${product.name}</h2>
                <div class="price">$${product.price}</div>
                <button class="addcart">add to cart</button>
            `;                                        
            listproductHTML.appendChild(newproduct);  
        });
    }
};

listproductHTML.addEventListener("click", (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains("addcart")) {
        let product_id = positionClick.parentElement.dataset.id;
        addcart(product_id);
    }
});

 const addcart = (product_id) => {
    product_id = parseInt(product_id);
    let positionThisproductincart = carts.findIndex((value) => value.product_id == product_id);
    if (carts.length <= 0) {
        carts = [{ product_id: product_id, quantity: 1 }];
    } else if (positionThisproductincart < 0) {
        carts.push({ product_id: product_id, quantity: 1 });
    } else {
        carts[positionThisproductincart].quantity += 1;
    }
    addcartHTML();
    addcartMemory();
};
localStorage.clear()
const addcartMemory = () => {
    localStorage.setItem("cart",JSON.stringify(carts));
}
const addcartHTML = () => {
    listcartHTML.innerHTML = "";
    let totalquantity = 0;
    if (carts.length > 0) {
        carts.forEach(cart => {
            totalquantity = totalquantity + cart.quantity;
            let newcart = document.createElement("div");
            newcart.classList.add("item");
         newcart.dataset.id = cart.product_id;
            let positionproduct = listproduct.findIndex((value) => value.id == cart.product_id);
            let info = listproduct[positionproduct];
            newcart.innerHTML = `
                <div class="image">
                    <img src="${info.image}" alt="${info.name}">
                </div>
                <div class="name">${info.name}</div>
                <div class="totalprice">$${info.price * cart.quantity}</div>
                <div class="quantity">
                    <span class="pilus">+</span>
                    <span>${cart.quantity}</span>
                    <span class="mnus">-</span>
                </div>
            `;
            listcartHTML.appendChild(newcart);
        });
    }
    iconcartspan.innerText = totalquantity;
};
listcartHTML.addEventListener("click",(event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains("mnus") || positionClick.classList.contains("pilus")){
   let product_id = positionClick.parentElement.parentElement.dataset.id;
        let type = "minus";
        if(positionClick.classList.contains("pilus")){
            type = "pilus";
        }
       changeQuantity(product_id,type)
    }
})
const changeQuantity = (product_id, type) => {
    let positionitemincart = carts.findIndex((value) => value.product_id == product_id)
    if (positionitemincart >= 0) {
        switch (type) {
            case "pilus":
                carts[positionitemincart].quantity = carts[positionitemincart].quantity + 1;
                break;

            default:
                let valuechange = carts[positionitemincart].quantity - 1;
                if (valuechange > 0) {
                    carts[positionitemincart].quantity = valuechange;
                } else {
                    carts.splice(positionitemincart, 1)
                }
                break;
        }
    }
    addcartMemory();
    addcartHTML();
}
const initApp = () => {
    addDataToHTML();
    // get cart from memory
    if(localStorage.getItem("cart")){
        carts = JSON.parse(localStorage.getItem("cart"))
        addcartHTML();
    }
};

initApp();

