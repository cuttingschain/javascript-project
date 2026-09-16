let cart = [];
let currentProduct = null;
let currentQty = 1;

const PLACEHOLDER = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="462" height="462"><rect fill="%23f0ede8" width="462" height="462"/></svg>';

function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(name + '-page').classList.add('active');
  window.scrollTo(0, 0);
  if (name === 'cart') renderCart();
}

function renderCatalog(list) {
  const grid = document.getElementById('product-grid');
  grid.innerHTML = list.map(p => `
    <div class="card" onclick="openProduct(${p.id})">
      <img class="card-img" src="${p.image}" alt="${p.title}" loading="lazy" onerror="this.src='${PLACEHOLDER}'">
      <div class="card-body">
        <div class="card-title">${p.title}</div>
        <div class="card-price">$${p.price.toFixed(2)}</div>
      </div>
    </div>
  `).join('');
}

function filterProducts() {
  const q = document.getElementById('search-input').value.toLowerCase();
  renderCatalog(products.filter(p => p.title.toLowerCase().includes(q)));
}

function openProduct(id) {
  currentProduct = products.find(p => p.id === id);
  currentQty = 1;
  document.getElementById('pimg').src = currentProduct.image;
  document.getElementById('ptitle').textContent = currentProduct.title;
  document.getElementById('pprice').textContent = '$' + currentProduct.price.toFixed(2);
  document.getElementById('qty-val').textContent = 1;
  document.getElementById('toast').classList.remove('show');
  showPage('product');
}

function changeQty(delta) {
  currentQty = Math.max(1, currentQty + delta);
  document.getElementById('qty-val').textContent = currentQty;
}

function addToCart() {
  const existing = cart.find(i => i.id === currentProduct.id);
  if (existing) {
    existing.qty += currentQty;
  } else {
    cart.push({ ...currentProduct, qty: currentQty });
  }
  updateCartCount();
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2000);
}

function updateCartCount() {
  const total = cart.reduce((s, i) => s + i.qty, 0);
  const el = document.getElementById('cart-count');
  el.textContent = total;
  el.classList.toggle('visible', total > 0);
}

function renderCart() {
  const body = document.getElementById('cart-body');
  if (!cart.length) {
    body.innerHTML = `<div class="cart-empty"><span>🛒</span>Ваша корзина пуста</div>`;
    return;
  }
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  body.innerHTML = `
    <div class="cart-items">
      ${cart.map(item => `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.title}" onerror="this.src='${PLACEHOLDER}'">
          <div class="cart-item-info">
            <div class="cart-item-title">${item.title}</div>
            <div class="cart-item-price">$${item.price.toFixed(2)} за шт.</div>
          </div>
          <div class="cart-item-controls">
            <div class="ci-qty">
              <button onclick="updateQty(${item.id}, -1)">−</button>
              <span>${item.qty}</span>
              <button onclick="updateQty(${item.id}, 1)">+</button>
            </div>
            <button class="ci-remove" onclick="removeItem(${item.id})">✕</button>
          </div>
        </div>
      `).join('')}
    </div>
    <div class="cart-summary">
      <div class="summary-row"><span>Товары (${cart.reduce((s,i)=>s+i.qty,0)} шт.)</span><span>$${subtotal.toFixed(2)}</span></div>
      <div class="summary-row"><span>Доставка</span><span>${shipping === 0 ? 'Бесплатно' : '$' + shipping.toFixed(2)}</span></div>
      ${shipping > 0 ? `<div class="summary-row" style="font-size:12px;color:#8b3a0f;">Ещё $${(50 - subtotal).toFixed(2)} до бесплатной доставки</div>` : ''}
      <div class="summary-total"><span>Итого</span><span>$${total.toFixed(2)}</span></div>
      <button class="checkout-btn">Оформить заказ →</button>
    </div>
  `;
}

function updateQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  updateCartCount();
  renderCart();
}

function removeItem(id) {
  cart = cart.filter(i => i.id !== id);
  updateCartCount();
  renderCart();
}

renderCatalog(products);

const products = [
  {"id":1,"title":"2 Pack BC Grown Organic Ambrosia Apples","price":4.95,"image":"https://flourist.com/cdn/shop/products/23A5C20E-0F7B-408C-A66D-12D4C0BA102C-62D90A15-756F-4304-85A2-5D6E8DA7DA80_b40af341-8228-4974-85f5-c6dc09e9bf77.jpg?crop=center&height=462&v=1648735795&width=462"},
  {"id":2,"title":"2 Pack Blue Jay Red Grapefruit","price":4.95,"image":"https://flourist.com/cdn/shop/products/DD2F7939-CDF0-4395-A3A7-1FBF384EF028.jpg?crop=center&height=462&v=1646773214&width=462"},
  {"id":3,"title":"2 Pack Organic Blood Oranges","price":4.95,"image":"https://flourist.com/cdn/shop/files/IMG_3904_VSCO.jpg?crop=center&height=462&v=1779751124&width=462"},
  {"id":4,"title":"4 Pack BC Grown Organic Pink Lady Apples","price":7.95,"image":"https://flourist.com/cdn/shop/products/IMG_98152_8d4e8aff-b0e4-4fad-950c-8744d02463a9.jpg?crop=center&height=462&v=1646771038&width=462"},
  {"id":5,"title":"4 Pack Brioche Buns","price":12.00,"image":"https://flourist.com/cdn/shop/files/7196A97F-40A0-4211-BA5B-C32FF982AD8A.jpg?crop=center&height=462&v=1684682735&width=462"},
  {"id":6,"title":"4 Pack Main Street IPA","price":25.95,"image":"https://flourist.com/cdn/shop/files/1AABCA1F-9C0C-456B-91C3-2842C288BA24.jpg?crop=center&height=462&v=1701443675&width=462"},
  {"id":7,"title":"4 Pack Main Street Pilsner","price":25.95,"image":"https://flourist.com/cdn/shop/files/E9037757-9631-4AAD-B8ED-B5F916E7CEFE.jpg?crop=center&height=462&v=1701443713&width=462"},
  {"id":8,"title":"4 Pack Organic Nectarines","price":9.95,"image":"https://flourist.com/cdn/shop/products/DD68E449-51D0-4CFD-A098-070B25254251-49BF0B65-C75B-4567-8B76-4F660B137111.jpg?crop=center&height=462&v=1654619211&width=462"},
  {"id":9,"title":"4 Pack Organic Valencia Oranges","price":6.95,"image":"https://flourist.com/cdn/shop/files/CDA89550-32E6-4161-A9E1-F84D43500B1B.jpg?crop=center&height=462&v=1768337171&width=462"},
  {"id":10,"title":"4 Pack Premium Cosmic Crisp Apples","price":7.95,"image":"https://flourist.com/cdn/shop/products/IMG_2007_cac11871-e50a-4ff5-9ffe-b1b9f25a5231.jpg?crop=center&height=462&v=1648735729&width=462"},
  {"id":11,"title":"5 Quart Stainless Steel Bowl","price":21.95,"image":"https://flourist.com/cdn/shop/products/FullSizeRender89.jpg?crop=center&height=462&v=1646772021&width=462"},
  {"id":12,"title":"8 QT Stainless Steel Bowl","price":29.95,"image":"https://flourist.com/cdn/shop/products/FullSizeRender89_be5980ba-463d-424b-869a-31c0fe4baf73.jpg?crop=center&height=462&v=1646772413&width=462"},
  {"id":13,"title":"Apple Hazelnut Galette","price":8.00,"image":"https://flourist.com/cdn/shop/files/IMG-0016.jpg?crop=center&height=462&v=1732839402&width=462"},
  {"id":14,"title":"At Home In The Whole Foods Kitchen","price":40.00,"image":"https://flourist.com/cdn/shop/files/5EBD46D4-50FB-424F-8F7F-DA68619F8D5E.jpg?crop=center&height=462&v=1707764661&width=462"},
  {"id":15,"title":"Athiana Acres Organic Black Popcorn","price":9.95,"image":"https://flourist.com/cdn/shop/files/eau6s.jpg?crop=center&height=462&v=1775766837&width=462"},
  {"id":16,"title":"Baked Beans","price":11.95,"image":"https://flourist.com/cdn/shop/products/image_c107d851-0458-47dc-9de9-6352f5290759.jpg?crop=center&height=462&v=1674767041&width=462"},
  {"id":17,"title":"Baker's Yeast","price":6.95,"image":"https://flourist.com/cdn/shop/products/992A3125-6F5F-492C-BD05-68441AFF2443.jpg?crop=center&height=462&v=1646773310&width=462"},
  {"id":18,"title":"Balsamic Vinegar","price":15.95,"image":"https://flourist.com/cdn/shop/files/F0FE57AC-020B-4C57-9435-D860C22C7CFB2.jpg?crop=center&height=462&v=1685053750&width=462"},
  {"id":19,"title":"Banneton Oval","price":39.95,"image":"https://flourist.com/cdn/shop/files/IMG_2303_VSCO.jpg?crop=center&height=462&v=1718287697&width=462"},
  {"id":20,"title":"BC Grown Asparagus","price":8.95,"image":"https://flourist.com/cdn/shop/files/IMG_6025_VSCO.jpg?crop=center&height=462&v=1745882872&width=462"},
  {"id":21,"title":"BC Grown Grape Cherry Tomatoes","price":4.95,"image":"https://flourist.com/cdn/shop/files/FullSizeRender.png?crop=center&height=462&v=1778180841&width=462"},
  {"id":22,"title":"BC Grown Green Curly Kale Bunch","price":4.95,"image":"https://flourist.com/cdn/shop/files/IMG_3832_VSCO_07c33879-d1ac-46cf-af76-6319b54050e9.jpg?crop=center&height=462&v=1779406363&width=462"},
  {"id":23,"title":"BC Grown Lacinato Kale Bunch","price":6.95,"image":"https://flourist.com/cdn/shop/files/FullSizeRender_VSCO_38_a6e4c671-00dd-41c3-9259-27a695cc4f02.jpg?crop=center&height=462&v=1779406346&width=462"},
  {"id":24,"title":"BC Grown Mini Cucumbers","price":5.95,"image":"https://flourist.com/cdn/shop/files/IMG-4359.jpg?crop=center&height=462&v=1741960018&width=462"},
  {"id":25,"title":"BC Grown Organic Heirloom Tomatoes","price":8.95,"image":"https://flourist.com/cdn/shop/products/4017F492-0794-4AF3-BB93-2454EF92A605.jpg?crop=center&height=462&v=1751497055&width=462"},
  {"id":26,"title":"BC Grown Premium Rhubarb","price":6.95,"image":"https://flourist.com/cdn/shop/files/IMG_0130_VSCO.jpg?crop=center&height=462&v=1713378695&width=462"},
  {"id":27,"title":"BC Grown Premium Strawberries","price":7.95,"image":"https://flourist.com/cdn/shop/files/FullSizeRender_1.jpg?crop=center&height=462&v=1780267935&width=462"},
  {"id":28,"title":"BC Grown Shallots","price":7.95,"image":"https://flourist.com/cdn/shop/products/image_5a46442c-ed35-45db-947d-49144be0e91a.jpg?crop=center&height=462&v=1656611209&width=462"},
  {"id":29,"title":"Best Ever Chocolate Chip Cookie","price":4.50,"image":"https://flourist.com/cdn/shop/products/IMG_4955.jpg?crop=center&height=462&v=1646773370&width=462"},
  {"id":30,"title":"Best Ever Chocolate Chip Cookie Tote","price":29.95,"image":"https://flourist.com/cdn/shop/files/FullSizeRender_VSCO_21.jpg?crop=center&height=462&v=1724936982&width=462"},
  {"id":31,"title":"Bianco DiNapoli Crushed Tomatoes","price":9.95,"image":"https://flourist.com/cdn/shop/files/F7CBDBA8-7748-4198-925F-1CBA8711EA89.jpg?crop=center&height=462&v=1692807848&width=462"},
  {"id":32,"title":"Bianco DiNapoli Organic Fancy Grade Tomato Paste","price":2.95,"image":"https://flourist.com/cdn/shop/files/23147ECA-8032-457F-9BE0-E5521114F355.jpg?crop=center&height=462&v=1692807552&width=462"},
  {"id":33,"title":"Bianco DiNapoli Organic Fire Roasted Chopped Tomatoes","price":9.95,"image":"https://flourist.com/cdn/shop/files/1FD4E282-62D3-49DC-886B-ABD497B7EB7E.jpg?crop=center&height=462&v=1692807501&width=462"},
  {"id":34,"title":"Bianco DiNapoli Whole Tomatoes","price":9.95,"image":"https://flourist.com/cdn/shop/files/1FD4E282-62D3-49DC-886B-ABD497B7EB7E_efef2637-8faf-4228-b454-a744e7a389ac.jpg?crop=center&height=462&v=1692807915&width=462"},
  {"id":35,"title":"Bitter Honey","price":68.00,"image":"https://flourist.com/cdn/shop/files/FullSizeRender_VSCO_316f9945-f187-446a-8eb0-f34400efebab.jpg?crop=center&height=462&v=1762710753&width=462"},
  {"id":36,"title":"Black Beans","price":35.95,"image":"https://flourist.com/cdn/shop/products/FullSizeRender600.jpg?crop=center&height=462&v=1635543139&width=462"}
];