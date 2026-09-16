

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

