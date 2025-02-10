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
const passport_1 = __importDefault(require("passport"));
const User_1 = __importDefault(require("../models/User"));
const router = express_1.default.Router();
// Updated register route with proper typing
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body; // Make sure to destructure name
        const existingUser = yield User_1.default.findOne({ email });
        if (existingUser)
            return res.status(400).json({ error: "Email exists" });
        const newUser = new User_1.default({ name, email, password });
        yield newUser.save();
        res.status(201).json({ user: { id: newUser._id, name, email } });
    }
    catch (error) {
        res.status(500).json({ error: "Server error" });
    }
}));
router.post('/login', (req, res, next) => {
    passport_1.default.authenticate('local', (err, user, info) => {
        if (err)
            return next(err);
        if (!user)
            return res.status(401).json({ message: (info === null || info === void 0 ? void 0 : info.message) || 'Unauthorized' });
        req.logIn(user, (err) => {
            if (err)
                return next(err);
            res.json({ message: 'Logged in successfully', user });
        });
    })(req, res, next);
});
router.get('/logout', (req, res) => {
    req.logout(() => {
        res.json({ message: 'Logged out successfully' });
    });
});
router.get('/check-auth', (req, res) => {
    res.json({ isAuthenticated: req.isAuthenticated(), user: req.user });
});
exports.default = router;
