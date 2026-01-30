import { resolve } from "path";
import { defineConfig } from "vite";
// import dns from "dns";

export default defineConfig({
  root: "src/",

  // server: {
  //   host: "localhost",
  //   port: 5500,
  //   open: true,
  // },

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        cart: resolve(__dirname, "src/cart/index.html"),
        checkout: resolve(__dirname, "src/checkout/index.html"),
        product: resolve(__dirname, "src/product_pages/index.html"),
        product_listing: resolve(__dirname, "src/product_listing/index.html"),
        
         
      },
    },
  },
});


