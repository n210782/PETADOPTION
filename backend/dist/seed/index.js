"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const pets_1 = require("./pets");
dotenv_1.default.config();
const DB_URI = process.env.DB_URI || 'mongodb://localhost:27017/pet-adoption';
mongoose_1.default.connect(DB_URI)
    .then(() => {
    console.log('Connected to MongoDB');
    (0, pets_1.seedPets)().finally(() => mongoose_1.default.disconnect());
})
    .catch(err => console.error('Connection error:', err));
