#!/usr/bin/env bash

# Aller dans le backend
cd "$(dirname "$0")/backend" || exit 1

# Lancer le serveur en arrière-plan
npm start &
SERVER_PID=$!

# Laisser le temps au serveur de démarrer
sleep 2

# Ouvrir la page dans le navigateur par défaut (Ubuntu)
xdg-open "https://fergouchyahya.github.io/NDI/" >/dev/null 2>&1 &

# Attendre que le serveur se termine (Ctrl+C dans le terminal pour tout couper)
wait "$SERVER_PID"
