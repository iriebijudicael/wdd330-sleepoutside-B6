import { updateCartNum, loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

//The number of items in the cart (header)
updateCartNum();

document.addEventListener("DOMContentLoaded", () => {
  loadHeaderFooter();

  const order = new CheckoutProcess("so-cart", "#order-summary");
  order.init();

  const zipInput = document.querySelector("#zip");
  if (zipInput) {
    zipInput.addEventListener("blur", () => {
      order.calculateOrderTotal();
    });
  }

  const form = document.querySelector("#checkout-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      order.calculateOrderTotal();  
      order.checkout();           
    });
  }
});