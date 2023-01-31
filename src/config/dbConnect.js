import mongoose from "mongoose"

mongoose.connect("mongodb+srv://marcos:4255@cluster0.5szfynq.mongodb.net/alura-node");

let db = mongoose.connection;

export default db;