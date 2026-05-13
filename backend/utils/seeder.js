import "dotenv/config";
import mongoose from "mongoose";
import connectDB from "../config/db.js";
import Admin from "../models/admin.model.js";
import Product from "../models/product.model.js";

const sampleProducts = [
  {
    name: "Margherita Pizza",
    description: "Classic tomato sauce with fresh mozzarella and basil",
    category: "pizza",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400",
    price: 299,
    rating: 4.5,
    available: true,
    featured: true,
  },
  {
    name: "Chicken Burger",
    description: "Juicy grilled chicken with lettuce, tomato, and special sauce",
    category: "burger",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
    price: 199,
    rating: 4.3,
    available: true,
    featured: true,
  },
  {
    name: "Paneer Tikka",
    description: "Marinated cottage cheese grilled to perfection with spices",
    category: "starter",
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400",
    price: 249,
    rating: 4.6,
    available: true,
    featured: false,
  },
  {
    name: "Chocolate Shake",
    description: "Rich and creamy chocolate milkshake with whipped cream",
    category: "beverages",
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400",
    price: 129,
    rating: 4.4,
    available: true,
    featured: false,
  },
  {
    name: "Veg Biryani",
    description: "Fragrant basmati rice with mixed vegetables and aromatic spices",
    category: "biryani",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400",
    price: 229,
    rating: 4.2,
    available: true,
    featured: true,
  },
  {
    name: "Gulab Jamun",
    description: "Soft milk solids dumplings soaked in rose-flavored sugar syrup",
    category: "dessert",
    image: "https://images.unsplash.com/photo-1601303516534-bf5f0a5d3949?w=400",
    price: 99,
    rating: 4.7,
    available: true,
    featured: false,
  },
];

const seed = async () => {
  try {
    await connectDB();
    console.log("\n🌱 Starting database seed...\n");

    // Clear existing data
    await Promise.all([Admin.deleteMany(), Product.deleteMany()]);
    console.log("🗑️  Cleared existing data");

    // Create admin
    await Admin.create({
      name: "Super Admin",
      email: process.env.ADMIN_EMAIL || "admin@foodapp.com",
      password: process.env.ADMIN_PASSWORD || "Admin@123456",
      role: "superadmin",
    });
    console.log(`✅ Admin created: ${process.env.ADMIN_EMAIL || "admin@foodapp.com"}`);

    // Seed products
    await Product.insertMany(sampleProducts);
    console.log(`✅ ${sampleProducts.length} products seeded`);

    console.log("\n🎉 Database seeded successfully!\n");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
    process.exit(1);
  }
};

seed();
