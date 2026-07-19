# Product Bills Folder

Place your PDF invoices / bills inside this folder.

To link a product card to its invoice:
1. Copy the PDF file into this folder (e.g. `bills/my_product_invoice.pdf`).
2. Add a `bill` property pointing to this path inside the product database in **[js/pcspec.js](file:///C:/Users/panda/.gemini/antigravity/scratch/sunil-portfolio/js/pcspec.js)**.
   Example:
   ```javascript
   {
     name: "Graphic Card (GPU)",
     description: "RTX 4060 | 8GB VRAM",
     price: "₹ 90,000",
     category: "core",
     img: "spec/rtx 4060.png",
     link: "https://www.nvidia.com/...",
     bill: "bills/my_product_invoice.pdf" // <--- Add this line!
   }
   ```
3. Set your 4-digit pincode by changing `const BILL_PASSCODE = "1234";` at the bottom of **[js/pcspec.js](file:///C:/Users/panda/.gemini/antigravity/scratch/sunil-portfolio/js/pcspec.js)**.
