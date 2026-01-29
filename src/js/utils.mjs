// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

// Stretch Activity Week 2
export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position,
  clear = false,
) {
  // Clear the parent element if needed
  if (clear) {
    parentElement.innerHTML = "";
  }
  if (list.length === 0) {
    parentElement.insertAdjacentHTML(position, templateFn());
  } else {
    position = "afterbegin";
    const htmlStrings = list.map(templateFn);
    parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
  }
}

export function renderWithTemplate(templateFn, parentElement, data, callback) {
  parentElement.insertAdjacentHTML("afterbegin", templateFn);
  if (callback) {
    callback(data);
  }
}

async function loadTemplate(path) {
  // Fetch the template. Note: We removed the leading '/' 
  // to make it relative to the current location.
  const res = await fetch(path);
  if (res.ok) {
    const template = await res.text();
    return template;
  } else {
    console.error("Could not load template at:", path);
  }
}

// Function to dynamically load the header and footer into page
export async function loadHeaderFooter() {
  // Use relative paths (../ or ./) so Netlify finds them correctly
  // depending on where your index.html is located.
  // Pro-tip: Using relative paths helps prevent 404s on deployment.
  const headerTemplate = await loadTemplate("../partials/header.html");
  const footerTemplate = await loadTemplate("../partials/footer.html");

  const header = document.querySelector("#header");
  const footer = document.querySelector("#footer");

  if (header) renderWithTemplate(headerTemplate, header);
  if (footer) renderWithTemplate(footerTemplate, footer);

  searchProducts();
  cartSuperscript();
}

function searchProducts() {
  const sButton = document.getElementById("searchButton");
  if (sButton) {
    sButton.addEventListener("click", function (e) {
      const searchTerm = document.getElementById("searchInput").value;
      performSearch(searchTerm);
    });
  }
}

export function performSearch(term) {
  const searchParams = new URLSearchParams();
  searchParams.append("category", term);

  // Use relative navigation instead of hardcoding origin
  // This is much safer for Netlify deployments
  const newUrl = `../product-listing/index.html?${searchParams.toString()}`;
  window.location.href = newUrl;
}

//add superscript to cart icon
export function cartSuperscript() {
  const cartCountElement = document.querySelector(".cart .cart-superscript");
  if (!cartCountElement) return;

  const cartItems = getLocalStorage("so-cart") || [];
  const numCartItems = cartItems.reduce((acc, item) => acc + (item.Qtd || 0), 0);

  if (numCartItems === 0) {
    cartCountElement.classList.add("hide");
  } else {
    cartCountElement.classList.remove("hide");
    cartCountElement.textContent = numCartItems;
    cartCountElement.classList.add("updated");
  }

  setTimeout(() => {
    cartCountElement.classList.remove("updated");
  }, 300);
}