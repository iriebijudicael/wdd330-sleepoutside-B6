// product.js
import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

const dataSource = new ProductData("tents");
const productID = getParam("product");

const product = new ProductDetails(productID, dataSource);
product.init();


//add to cart button event handler
async function addToCartHandler(e) {
  const productItem = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(productItem);
}

function addProductToCart(productObj) {
  const cartJson = localStorage.getItem("cart") || "[]";
  const cart = JSON.parse(cartJson);

  const existing = cart.find(p => p.id === productObj.id);
  if (existing) {
    existing.quantity = (existing.quantity || 1) + 1;
  } else {
    cart.push({
      id: productObj.id,
      title: productObj.title || "",
      price: productObj.price || 0,
      quantity: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  document.dispatchEvent(new CustomEvent("cart:updated", { detail: { cart } }));
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
