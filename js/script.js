const medicines = [
    {
        id: 1,
        name: "Paracetamol 500mg",
        category: "Pain Relief",
        price: 30,
        stock: 100,
        manufacturer: "Generic",
        description: "Used for temporary relief of mild to moderate pain and fever.",
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600"
    },

    {
        id: 2,
        name: "Cetirizine 10mg",
        category: "Allergy Relief",
        price: 45,
        stock: 80,
        manufacturer: "Generic",
        description: "An antihistamine commonly used to relieve allergy symptoms.",
        image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600"
    },

    {
        id: 3,
        name: "Vitamin C 500mg",
        category: "Vitamins",
        price: 150,
        stock: 60,
        manufacturer: "Wellness Care",
        description: "Vitamin C supplement for supporting everyday nutritional needs.",
        image: "images.jpg"
    },

    {
        id: 4,
        name: "Omeprazole 20mg",
        category: "Digestive Health",
        price: 85,
        stock: 70,
        manufacturer: "Generic",
        description: "Medicine used to reduce stomach acid and manage acid-related conditions.",
        image: "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=600"
    },

    {
        id: 5,
        name: "Ibuprofen 400mg",
        category: "Pain Relief",
        price: 65,
        stock: 90,
        manufacturer: "Generic",
        description: "Used for temporary relief of pain, inflammation, and fever.",
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600"
    },

    {
        id: 6,
        name: "Multivitamin Tablets",
        category: "Vitamins",
        price: 220,
        stock: 50,
        manufacturer: "Wellness Care",
        description: "A daily multivitamin supplement containing essential nutrients.",
        image: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=600"
    },

    {
        id: 7,
        name: "Antiseptic Solution",
        category: "First Aid",
        price: 120,
        stock: 45,
        manufacturer: "HealthCare Plus",
        description: "Antiseptic solution for general first-aid and wound-cleaning purposes.",
        image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600"
    },

    {
        id: 8,
        name: "ORS Electrolyte Powder",
        category: "Wellness",
        price: 25,
        stock: 120,
        manufacturer: "HealthCare Plus",
        description: "Electrolyte solution powder used to help replace fluids and salts.",
        image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600"
    }
];
let cart = JSON.parse(localStorage.getItem("cart")) || [], orders = JSON.parse(localStorage.getItem("orders")) || [];
function save() { localStorage.setItem("medicines", JSON.stringify(medicines)); localStorage.setItem("cart", JSON.stringify(cart)); localStorage.setItem("orders", JSON.stringify(orders)) }
function loadNavbar() { let n = document.getElementById("navbar"); if (!n) return; n.innerHTML = `<nav class="navbar navbar-expand-lg bg-white sticky-top"><div class="container"><a class="navbar-brand" href="index.html">💚 MediCare</a><button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#nav"><span class="navbar-toggler-icon"></span></button><div class="collapse navbar-collapse" id="nav"><ul class="navbar-nav ms-auto">${[["Home", "index.html"], ["Medicines", "medicines.html"], ["Categories", "categories.html"], ["Health Products", "health-products.html"], ["Offers", "offers.html"], ["About", "about.html"], ["Services", "services.html"], ["Contact", "contact.html"], ["🛒 Cart", "cart.html"], ["Login", "login.html"]].map(x => `<li class="nav-item"><a class="nav-link" href="${x[1]}">${x[0]}</a></li>`).join("")}<li class="nav-item"><a class="nav-link" href="admin.html">Admin</a></li></ul></div></div></nav>` }
function loadFooter() { let f = document.getElementById("footer"); if (f) f.innerHTML = `<footer><div class="container"><div class="row"><div class="col-md-4"><h4>💚 MediCare</h4><p>Healthcare essentials in one convenient place.</p></div><div class="col-md-4"><h5>Quick Links</h5><p><a href="about.html">About</a> · <a href="services.html">Services</a> · <a href="offers.html">Offers</a></p></div><div class="col-md-4"><h5>Contact</h5><p>support@medicare.example</p><p>+91 98765 43210</p></div></div><hr><p class="text-center mb-0">© 2026 MediCare Pharmacy</p></div></footer>` }
function card(m) {
    return `
        <div class="col-12 col-sm-6 col-lg-3 mb-4">

            <div class="product-card h-100">

                <div class="product-image">
                    <img
                        src="${m.image}"
                        alt="${m.name}"
                        loading="lazy"
                    >
                </div>

                <div class="product-info">

                    <span class="product-category">
                        ${m.category}
                    </span>

                    <h5>${m.name}</h5>

                    <p>${m.description}</p>

                    <div class="product-price">
                        ₹${m.price}
                    </div>

                    <button
                        class="btn btn-primary w-100"
                        onclick="addToCart(${m.id})"
                    >
                        🛒 Add to Cart
                    </button>

                </div>

            </div>

        </div>
    `;
}
function displayMedicines(list = medicines, id = "medicineList") { let el = document.getElementById(id); if (el) el.innerHTML = list.length ? list.map(card).join() : '<p class="text-muted">No products found.</p>' }
function searchMedicines() { let q = (document.getElementById("searchInput")?.value || "").toLowerCase(); displayMedicines(medicines.filter(m => (m.name + " " + m.category).toLowerCase().includes(q))) }
function addToCart(id) { let m = medicines.find(x => x.id === id), item = cart.find(x => x.id === id); if (!m) return; if (item) item.quantity++; else cart.push({ ...m, quantity: 1 }); save(); alert("Added to cart"); updateCartCount() }
function updateCartCount() { let el = document.getElementById("cartCount"); if (el) el.textContent = cart.reduce((s, x) => s + x.quantity, 0) }
function displayCart() { let el = document.getElementById("cartItems"); if (!el) return; el.innerHTML = cart.length ? cart.map(x => `<div class="card mb-3"><div class="card-body row align-items-center"><div class="col-md-4">${x.name}</div><div class="col-md-2">₹${x.price}</div><div class="col-md-3"><button class="btn btn-sm btn-outline-secondary" onclick="changeQty(${x.id},-1)">−</button> ${x.quantity} <button class="btn btn-sm btn-outline-secondary" onclick="changeQty(${x.id},1)">+</button></div><div class="col-md-2">₹${x.price * x.quantity}</div><div class="col-md-1"><button class="btn btn-danger btn-sm" onclick="removeCart(${x.id})">×</button></div></div></div>`).join() : '<div class="alert alert-info">Your cart is empty.</div>'; let total = cart.reduce((s, x) => s + x.price * x.quantity, 0); if (document.getElementById("cartTotal")) document.getElementById("cartTotal").textContent = "₹" + total }
function changeQty(id, n) { let x = cart.find(x => x.id === id); if (x) x.quantity += n; cart = cart.filter(x => x.quantity > 0); save(); displayCart(); updateCartCount() }
function removeCart(id) { cart = cart.filter(x => x.id !== id); save(); displayCart(); updateCartCount() }
function placeOrder() { let name = document.getElementById("customerName")?.value.trim(), phone = document.getElementById("customerPhone")?.value.trim(), address = document.getElementById("customerAddress")?.value.trim(); if (!cart.length) return alert("Your cart is empty."); if (!name || !phone || !address) return alert("Fill in all delivery details."); orders.push({ id: Date.now(), customer: name, phone, address, items: [...cart], total: cart.reduce((s, x) => s + x.price * x.quantity, 0), status: "Pending", date: new Date().toLocaleDateString() }); cart = []; save(); location.href = "orders.html" }
function displayOrders(id = "orderList") { let el = document.getElementById(id); if (!el) return; el.innerHTML = orders.length ? orders.map(o => `<div class="card mb-3"><div class="card-body"><h5>Order #${o.id}</h5><p>${o.date} · ${o.customer}</p><p>Total: ₹${o.total} · Status: ${o.status}</p>${o.items.map(x => `<p>${x.name} × ${x.quantity}</p>`).join("")}</div></div>`).join() : '<div class="alert alert-info">No orders found.</div>' }
function displayDetails() { let el = document.getElementById("medicineDetails"); if (!el) return; let id = Number(new URLSearchParams(location.search).get("id")), m = medicines.find(x => x.id === id); el.innerHTML = m ? `<div class="row align-items-center"><div class="col-md-5"><div class="product-image rounded" style="height:300px">${m.icon}</div></div><div class="col-md-7"><h2>${m.name}</h2><p>${m.category}</p><h3 class="product-price">₹${m.price}</h3><p>${m.description}</p><button class="btn btn-primary" onclick="addToCart(${m.id})">Add to Cart</button></div></div>` : '<div class="alert alert-warning">Product not found.</div>' }
function adminMedicines() { let el = document.getElementById("adminMedicineList"); if (el) el.innerHTML = medicines.map(m => `<tr><td>${m.id}</td><td>${m.name}</td><td>${m.category}</td><td>₹${m.price}</td><td><button class="btn btn-danger btn-sm" onclick="deleteMedicine(${m.id})">Delete</button></td></tr>`).join() }
function addMedicine(e) { e.preventDefault(); let name = medName.value.trim(), category = medCategory.value.trim(), price = Number(medPrice.value), description = medDescription.value.trim(); if (!name || !category || price <= 0 || !description) return alert("Enter valid details."); medicines.push({ id: Date.now(), name, category, price, description, icon: "💊" }); save(); e.target.reset(); adminMedicines(); document.getElementById("totalMedicines").textContent = medicines.length }
function deleteMedicine(id) { if (confirm("Delete this medicine?")) { medicines = medicines.filter(m => m.id !== id); save(); adminMedicines(); let el = document.getElementById("totalMedicines"); if (el) el.textContent = medicines.length } }
function loginUser(e) {

    e.preventDefault();

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (
        email === "admin@medicare.com" &&
        password === "admin123"
    ) {

        // Save login status
        localStorage.setItem("adminLoggedIn", "true");

        alert("Login successful!");

        window.location.href = "admin.html";

    } else {

        alert("Invalid email or password.");

    }
}
document.addEventListener("DOMContentLoaded", () => { loadNavbar(); loadFooter(); displayMedicines(); displayCart(); displayOrders(); displayDetails(); adminMedicines(); updateCartCount(); let tm = document.getElementById("totalMedicines"); if (tm) tm.textContent = medicines.length; let to = document.getElementById("totalOrders"); if (to) to.textContent = orders.length; });
function logoutAdmin() {

    // Remove admin login
    localStorage.removeItem("adminLoggedIn");

    // Show message
    alert("You have been logged out successfully.");

    // Go to login page
    window.location.href = "login.html";
}