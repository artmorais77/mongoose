import { Schema, model } from "mongoose";

const StoreSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    cnpj: { type: String, required: true },
    address: {
      street: { type: String, required: true },
      number: { type: Number },
      city: { type: String, required: true },
      state: { type: String, required: true },
      cep: { type: String, required: true },
      country: { type: String, default: "Brasil" },
    },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Store = model("Store", StoreSchema);
