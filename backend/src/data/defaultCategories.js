"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultCategories = void 0;
const client_1 = require("@prisma/client");
exports.defaultCategories = [
    { name: "Salary", emote: "💼", color: "#1C4532", type: client_1.CategoryType.income },
    { name: "Bonus", emote: "💰", color: "#1C4532", type: client_1.CategoryType.income },
    { name: "Freelance", emote: "👨‍💻", color: "#1C4532", type: client_1.CategoryType.income },
    { name: "Investment", emote: "📈", color: "#1C4532", type: client_1.CategoryType.income },
    { name: "Gift", emote: "🎁", color: "#1C4532", type: client_1.CategoryType.income },
    { name: "Food", emote: "🍔", color: "#45241cff", type: client_1.CategoryType.expense },
    { name: "Transport", emote: "🚌", color: "#45241cff", type: client_1.CategoryType.expense },
    { name: "Shopping", emote: "🛍️", color: "#45241cff", type: client_1.CategoryType.expense },
];
