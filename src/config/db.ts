import { env } from "../env.js"
import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(env.DATABASE_URL)
    console.log("Banco de dados conectado")
  } catch (error) {
    console.error("Error ao se conectar com o banco de dados", error)
  }
}