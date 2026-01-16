// import { getLocalStorage, setLocalStorage, alertMessage, removeAllAlerts } from "./utils.mjs";
// import ExternalServices from "./ExternalServices.mjs";

// const services = new ExternalServices();

// function formDataToJSON(formElement) {
//   const formData = new FormData(formElement);
//   const convertedJSON = {};
//   formData.forEach((value, key) => {
//     convertedJSON[key] = value;
//   });
//   return convertedJSON;
// }

// function packageItems(items) {
//   return items.map((item) => ({
//     id: item.Id,
//     price: item.FinalPrice,
//     name: item.Name,
//     quantity: 1,
//   }));
// }

// export default class CheckoutProcess {
//   constructor(key, outputSelector) {
//     this.key = key;
//     this.outputSelector = outputSelector;
//     this.list = [];
//     this.itemTotal = 0;
//     this.shipping = 0;
//     this.tax = 0;
//     this.orderTotal = 0;
//   }

//   init() {
//     this.list = getLocalStorage(this.key);
//     this.calculateItemSummary();
//   }

//   calculateItemSummary() {
//     const amounts = this.list.map((item) => item.FinalPrice);
//     this.itemTotal = amounts.reduce((sum, item) => sum + item, 0);
//     document.querySelector("#subtotal").innerText = this.itemTotal.toFixed(2);
//   }

//   calculateOrderTotal() {
//     this.tax = this.itemTotal * 0.06;
//     this.shipping = 10 + (this.list.length - 1) * 2;
//     this.orderTotal = this.itemTotal + this.tax + this.shipping;
//     this.displayOrderTotals();
//   }

//   displayOrderTotals() {
//     document.querySelector(`${this.outputSelector} #tax`).innerText = `$${this.tax.toFixed(2)}`;
//     document.querySelector(`${this.outputSelector} #shipping`).innerText = `$${this.shipping.toFixed(2)}`;
//     document.querySelector(`${this.outputSelector} #total`).innerText = `$${this.orderTotal.toFixed(2)}`;
//   }

//   async checkout() {
//     const formElement = document.forms["checkout-form"];
//     const json = formDataToJSON(formElement);
//     // add totals, and item details
//     json.orderDate = new Date();
//     json.orderTotal = this.orderTotal;
//     json.tax = this.tax;
//     json.shipping = this.shipping;
//     json.items = packageItems(this.list);
//     console.log(json);
//     try {
//       const res = await services.checkout(json);
//       console.log(res);
//       setLocalStorage("so-cart", []);
//       location.assign("/checkout/success.html");
//     } catch (err) {
//       removeAllAlerts();
//       for (let message in err.message) {
//         alertMessage(err.message[message]);
//       }

//       console.log(err);
//     }
//   }
// }