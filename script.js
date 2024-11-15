// Show sign-up form
function showSignupForm() {
    document.getElementById("signup-form").classList.remove("hidden");
    document.getElementById("login-form").classList.add("hidden");
}

// Show login form
function showLoginForm() {
    document.getElementById("signup-form").classList.add("hidden");
    document.getElementById("login-form").classList.remove("hidden");
}

// Sign up function
function signUp() {
    const role = document.getElementById("signup-role").value;
    const username = document.getElementById("signup-username").value.trim();
    const password = document.getElementById("signup-password").value.trim();

    if (!username || !password) {
        alert("Username and password cannot be empty!");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if username already exists
    if (users.some(user => user.username === username)) {
        alert("Username already exists. Please choose another.");
        return;
    }

    // Save user data
    users.push({ role, username, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Sign-up successful! Please log in.");
    showLoginForm();
}

// Login function
function login() {
    const username = document.getElementById("login-username").value.trim();
    const password = document.getElementById("login-password").value.trim();

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Validate user
    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
        alert("Invalid username or password!");
        return;
    }

    localStorage.setItem("role", user.role);
    localStorage.setItem("currentUser", username);

    if (user.role === "customer") {
        showCustomerInterface();
    } else if (user.role === "admin") {
        showAdminInterface();
    }
}

// Show customer interface
function showCustomerInterface() {
    document.getElementById("signup-form").classList.add("hidden");
    document.getElementById("login-form").classList.add("hidden");
    document.getElementById("admin-interface").classList.add("hidden");
    document.getElementById("customer-interface").classList.remove("hidden");
}

// Show admin interface
function showAdminInterface() {
    document.getElementById("signup-form").classList.add("hidden");
    document.getElementById("login-form").classList.add("hidden");
    document.getElementById("customer-interface").classList.add("hidden");
    document.getElementById("admin-interface").classList.remove("hidden");
    loadOrders();
}

// Logout function
function logout() {
    localStorage.removeItem("role");
    localStorage.removeItem("currentUser");
    showLoginForm();
}

// Place an order (Customer)
function placeOrder() {
    const orderDetails = document.getElementById("order").value;
    if (!orderDetails) {
        alert("Please enter order details");
        return;
    }
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(orderDetails);
    localStorage.setItem("orders", JSON.stringify(orders));
    alert("Order placed!");
    document.getElementById("order").value = ""; // Clear input field
}

// Load orders (Admin)
function loadOrders() {
    const ordersList = document.getElementById("orders-list");
    ordersList.innerHTML = ""; // Clear current list
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.forEach((order, index) => {
        const li = document.createElement("li");
        li.textContent = `Order ${index + 1}: ${order}`;
        ordersList.appendChild(li);
    });
}

// Clear orders (Admin)
function clearOrders() {
    if (confirm("Are you sure you want to clear all orders?")) {
        localStorage.removeItem("orders");
        loadOrders(); // Refresh orders list
    }
}
