"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Pet_1 = __importDefault(require("../models/Pet"));
const User_1 = __importDefault(require("../models/User"));
const router = express_1.default.Router();
// GET all pets
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pets = yield Pet_1.default.find().lean();
        res.json(pets);
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}));
// Save a new pet
router.post('/pets', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, type, breed, age, location, description, imageUrl, health, characteristics } = req.body;
        // Validate required fields
        if (!name || !type || !breed || !age || !location || !description || !imageUrl) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const newPet = new Pet_1.default({
            name,
            type,
            breed,
            age,
            location,
            description,
            imageUrl,
            health,
            characteristics,
        });
        const savedPet = yield newPet.save();
        res.status(201).json(savedPet);
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}));
// Add to favorites
router.post('/:id/favorite', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (!user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const pet = yield Pet_1.default.findById(req.params.id);
        if (!pet)
            return res.status(404).json({ error: 'Pet not found' });
        const updatedUser = yield User_1.default.findByIdAndUpdate(user._id, { $addToSet: {
                favorites: {
                    pet: pet._id,
                    imageUrl: pet.imageUrl,
                    name: pet.name,
                    date: new Date()
                }
            } }, { new: true }).populate('favorites.pet');
        res.json(updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.favorites);
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}));
// Other routes...
exports.default = router;
