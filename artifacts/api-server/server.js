// Hostinger Production Entry Point
// This file serves as a bridge for the Hostinger Node.js manager

import("./dist/index.mjs").catch(err => {
    console.error("Failed to start server:", err);
    process.exit(1);
});
