const { PrismaMariaDb } = require("@prisma/adapter-mariadb");
const { PrismaClient } = require("../generated/prisma");
require("dotenv").config();


const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
  throw new Error("DATABASE_URL is not defined in environment variables");
}

const url = new URL(dbUrl);


const adapter = new PrismaMariaDb({
  host: url.hostname,
  port: url.port,
  user:url.username,
  password:url.password,
  database:url.pathname.substring(1),
  connectionLimit: 5,
});
const prisma = new PrismaClient({adapter});

module.exports =  prisma ;