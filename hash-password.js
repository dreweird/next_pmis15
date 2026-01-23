// to run this script: npm run generate:password <password>
const bcrypt = require("bcryptjs");

const password = process.argv[2];

if (!password) {
  console.log("Usage: npm run generate:password <password>");
  process.exit(1);
}

const hashedPassword = bcrypt.hashSync(password, 10);
console.log("Hashed password:", hashedPassword);
