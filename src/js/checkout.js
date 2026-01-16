// import { updateCartNum, loadHeaderFooter } from "./utils.mjs";
// import CheckoutProcess from "./CheckoutProcess.mjs";

// //The number of items in the cart (header)
// updateCartNum();

// document.addEventListener("DOMContentLoaded", () => {
//   loadHeaderFooter();

//   const order = new CheckoutProcess("so-cart", "#order-summary");
//   order.init();

//   const zipInput = document.querySelector("#zip");
//   if (zipInput) {
//     zipInput.addEventListener("blur", () => {
//       order.calculateOrderTotal();
//     });
//   }

//   const form = document.querySelector("#checkout-form");
//   if (form) {
//     form.addEventListener("submit", (e) => {
//       e.preventDefault();
//       if (!form.checkValidity()) {
//         form.reportValidity();
//         return;
//       }
//       order.calculateOrderTotal();  
//       order.checkout();           
//     });
//   }
// });


// // document.addEventListener("DOMContentLoaded", () => {
// //   const form = document.getElementById("newsletter-form");
// //   const emailInput = document.getElementById("email");

// //   form.addEventListener("submit", function (e) {
// //     e.preventDefault(); // stop default submission

// //     const email = emailInput.value.trim();

// //     if (validateEmail(email)) {
// //       alert("Thank you for subscribing!");
// //       form.reset();
// //       // If you want to redirect, uncomment:
// //       // window.location.href = "checkout/index.html";
// //     } else {
// //       alert("Please enter a valid email address.");
// //     }
// //   });
// // });

// // // Email validation function
// // function validateEmail(email) {
// //   return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
// // }
