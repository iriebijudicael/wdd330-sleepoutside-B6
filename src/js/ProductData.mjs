// ProductData.mjs
// Utility function to convert fetch response to JSON
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

// Base URL coming from Vite environment variables
const baseURL = import.meta.env.VITE_SERVER_URL;

// A separate function for API-based product lookup
export async function getServerData(category) {
  const response = await fetch(`${baseURL}products/search/${category}`);
  const data = await convertToJson(response);
  return data.Result;
}

// Main class for loading local JSON product files
export default class ProductData {
  constructor(category) {
    this.category = category;
    this.path = `../json/${this.category}.json`;
  }

  // Load products from local JSON file
  getData() {
    return fetch(this.path)
      .then(convertToJson)
      .then((data) => data);
  }

  // Find one product by ID
  async findProductById(id) {
    const products = await this.getData();
    return products.find((item) => item.Id === id);
  }
}
