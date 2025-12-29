/* ===================== DATA ===================== */
const products = [
  { id: 1, name: "Shoes", price: 5, image: "https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg" },
  { id: 2, name: "Men T-Shirt", price: 6.34, image: "https://images.pexels.com/photos/3649765/pexels-photo-3649765.jpeg" },
  { id: 3, name: "Jeans", price: 9, image: "https://media.istockphoto.com/photos/folded-blue-jeans-on-a-white-background-modern-casual-clothing-flat-picture-id1281304280" },
  { id: 4, name: "Watch", price: 9.1, image: "https://images.pexels.com/photos/8839887/pexels-photo-8839887.jpeg" },
  { id: 5, name: "Laptop", price: 99, image: "https://images.pexels.com/photos/2659939/pexels-photo-2659939.jpeg" }
];

/* ===================== STATE ===================== */
let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* ===================== SELECTORS ===================== */
const productGrid = document.querySelector(".product-grid");
const searchInput = document.querySelector(".search-box input");

/* ===================== RENDER PRODUCTS ===================== */
function renderProducts(productList) {
  productGrid.innerHTML = "";

  if (productList.length === 0) {
    productGrid.innerHTML = `<p>No products found.</p>`;
    return;
  }

  productList.forEach(product => {
    const card = document.createElement("article");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p class="price">$${product.price}</p>
      <button class="btn" onclick="addToCart(${product.id})">Add to Cart</button>
    `;

    productGrid.appendChild(card);
  });
}

/* ===================== CART LOGIC ===================== */
function addToCart(productId) {
  const product = products.find(p => p.id === productId);

  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${product.name} added to cart`);
}

/* ===================== SEARCH (DEBOUNCED) ===================== */
function debounce(fn, delay = 300) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

const handleSearch = debounce((e) => {
  const value = e.target.value.toLowerCase();
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(value)
  );
  renderProducts(filtered);
}, 300);

searchInput.addEventListener("input", handleSearch);

/* ===================== INIT ===================== */
document.addEventListener("DOMContentLoaded", () => {
  renderProducts(products);
});
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price) {
  cart.push({ name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(name + " added to cart!");
}
