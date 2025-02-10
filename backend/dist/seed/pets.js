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
exports.seedPets = void 0;
const Pet_1 = __importDefault(require("../models/Pet"));
const mockPets = [
    // Your existing pets
    {
        name: 'Luna',
        type: 'dog',
        breed: 'Golden Retriever',
        age: 2,
        location: 'San Francisco, CA',
        description: 'Friendly and energetic Golden Retriever who loves to play fetch.',
        imageUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d',
        status: 'available',
        health: {
            vaccinated: true,
            neutered: true,
            microchipped: true,
        },
        characteristics: ['Friendly', 'Energetic', 'Good with kids']
    },
    // Add 20 more pets (shortened example - create similar entries)
    {
        name: 'Max',
        type: 'dog',
        breed: 'Labrador Retriever',
        age: 3,
        location: 'Austin, TX',
        description: 'Gentle giant who loves swimming and long walks.',
        imageUrl: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b',
        status: 'available',
        health: {
            vaccinated: true,
            neutered: true,
            microchipped: true,
        },
        characteristics: ['Gentle', 'Loyal', 'Good with other dogs']
    },
    {
        name: 'Bella',
        type: 'cat',
        breed: 'Siamese',
        age: 1,
        location: 'Miami, FL',
        description: 'Playful and vocal cat that loves attention.',
        imageUrl: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987',
        status: 'available',
        health: {
            vaccinated: true,
            neutered: true,
            microchipped: true,
        },
        characteristics: ['Playful', 'Vocal', 'Curious']
    },
    // Continue adding 18 more entries following the same pattern
    // You can use different breeds, ages, and characteristics
    // Suggested breeds: German Shepherd, Persian, Beagle, Maine Coon, etc.
];
const seedPets = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Pet_1.default.deleteMany({});
        yield Pet_1.default.insertMany(mockPets);
        console.log('Database seeded successfully!');
    }
    catch (error) {
        console.error('Error seeding database:', error);
    }
});
exports.seedPets = seedPets;
