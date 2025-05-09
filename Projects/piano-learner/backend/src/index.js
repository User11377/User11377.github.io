"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = __importDefault(require("./routes/auth"));
const app = (0, express_1.default)(); //app ist eine Konstante, ein server der auf Port 4000 läuft
const PORT = 4000;
//Middleware importieren
//Cors
app.use((0, cors_1.default)());
//json parsing implementieren
app.use(express_1.default.json());
//Routen definieren
app.use("/api/auth", auth_1.default);
app.listen(PORT, () => {
    console.log(`Server listening on localhost:${PORT}`);
});
