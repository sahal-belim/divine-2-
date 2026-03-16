#!/usr/bin/env node

const { execSync } = require("child_process");
const path = require("path");

async function main() {
  console.log("Setting up database...");

  try {
    // Step 1: Generate Prisma Client
    console.log("Generating Prisma client...");
    execSync("npx prisma generate", { 
      cwd: path.dirname(__dirname),
      stdio: "inherit" 
    });

    // Step 2: Run migrations
    console.log("Running database migrations...");
    try {
      execSync("npx prisma migrate deploy", { 
        cwd: path.dirname(__dirname),
        stdio: "inherit" 
      });
    } catch (e) {
      // If no migrations exist, create the initial one
      console.log("Creating initial migration...");
      execSync("npx prisma migrate dev --name init --skip-generate", { 
        cwd: path.dirname(__dirname),
        stdio: "inherit",
        input: "y\n"
      });
    }

    // Step 3: Now import and seed
    const { PrismaClient } = require("@prisma/client");
    const bcrypt = require("bcryptjs");
    const prisma = new PrismaClient();

    console.log("Starting database seeding...");

    // Create default admin user
    const hashedPassword = await bcrypt.hash("admin123", 10);

    const user = await prisma.user.upsert({
      where: { email: "admin@divineclothing.com" },
      update: {},
      create: {
        email: "admin@divineclothing.com",
        password: hashedPassword,
        name: "Admin",
        role: "admin",
      },
    });

    console.log("Admin user created/verified:", user.email);

    // Seed sample products
    const sampleProducts = [
      {
        name: "Silk Evening Gown",
        description: "Luxurious silk gown with intricate embroidery",
        price: 299.99,
        sizes: '["XS", "S", "M", "L", "XL"]',
        published: true,
      },
      {
        name: "Cashmere Sweater",
        description: "Premium cashmere sweater in neutral tones",
        price: 179.99,
        sizes: '["XS", "S", "M", "L", "XL"]',
        published: true,
      },
      {
        name: "Linen Blouse",
        description: "Breathable linen blouse perfect for summer",
        price: 89.99,
        sizes: '["XS", "S", "M", "L", "XL"]',
        published: true,
      },
    ];

    for (const product of sampleProducts) {
      const existing = await prisma.product.findFirst({
        where: { name: product.name },
      });

      if (!existing) {
        await prisma.product.create({ data: product });
        console.log(`Created product: ${product.name}`);
      }
    }

    await prisma.$disconnect();
    console.log("Database setup complete!");
  } catch (error) {
    console.error("Database setup failed:", error);
    process.exit(1);
  }
}

main();
