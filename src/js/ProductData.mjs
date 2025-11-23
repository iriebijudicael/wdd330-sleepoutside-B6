// ProductData.mjs

// Define baseURL at the top using the environment variable
const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  // Constructor no longer needs category or path since we're using the API
  constructor() {}

  // Updated getData method to use async/await and accept category as a parameter
  async getData(category) {
    try {
      const response = await fetch(`${baseURL}products/search/${category}`);
      const data = await convertToJson(response);
      return data.Result; // Return the Result array from the API
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }

  // Updated findProductById to query API directly by ID
  async findProductById(id) {
    try {
      const response = await fetch(`${baseURL}product/${id}`);
      const data = await convertToJson(response);
      return data; // Returns single product object
    } catch (error) {
      console.error(`Error fetching product with id ${id}:`, error);
      return null;
    }
  }
}