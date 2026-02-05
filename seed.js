import mongoose from "mongoose";
import Product from "./src/models/Product.js";
import dotenv from "dotenv";
dotenv.config();

const categories = [
    "Vegetables",
    "Fruits",
    "Grains",
    "Dairy",
    "Pulses",
    "Organic",
];

const locations = [
    "Delhi",
    "Noida",
    "Greater Noida",
    "Ghaziabad",
    "Meerut",
    "Gurgaon",
];

const productNames = [
    "Tomato", "Potato", "Onion", "Carrot", "Spinach", "Cabbage", "Apple", "Banana",
    "Mango", "Orange", "Milk", "Cheese", "Butter", "Wheat", "Rice", "Corn",
    "Chickpeas", "Lentils", "Beans", "Peas"
];

const descriptions = [
    "Fresh farm product",
    "Organic and healthy",
    "Direct from farmers",
    "High quality produce",
    "Naturally grown",
];

function randomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateProducts(userId) {
    const products = [];

    for (let i = 1; i <= 2000; i++) {
        products.push({
            name: randomItem(productNames) + " " + i,
            description: randomItem(descriptions),
            price: Math.floor(Math.random() * 500) + 20,
            category: randomItem(categories),
            stock: Math.floor(Math.random() * 100) + 1,
            location: randomItem(locations),
            rating: Number((Math.random() * 5).toFixed(1)),
            createdBy: userId, // IMPORTANT: replace with real user id
        });
    }

    return products;
}

async function seed() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");

        await Product.deleteMany();

        // 👉 put your real user _id here from MongoDB
        const USER_ID = "6984e6757ba827cc4080d793";

        const products = generateProducts(USER_ID);
        await Product.insertMany(products);
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

seed();
