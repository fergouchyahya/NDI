// backend/server.js
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Dossier racine du projet (un cran au-dessus de backend/)
const publicPath = path.join(__dirname, "..");

// Servir tous les fichiers statiques (index.html, carte.html, js/, assets/…)
app.use(express.static(publicPath));

// Pour toutes les autres routes, renvoyer index.html (si tu veux un mode “SPA”)
app.get("*", (req, res) => {
    res.sendFile(path.join(publicPath, "index.html"));
});

app.listen(PORT, () => {
    console.log(`Serveur statique en écoute sur http://localhost:${PORT}`);
});
