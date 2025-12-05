// js/core/api.js

const STORAGE_KEY = "villageTechno_attempts_v1";

// Sauvegarder une tentative dans localStorage
export async function sendAttemptToServer(payload) {
    try {
        // Récupérer les anciennes tentatives
        const raw = window.localStorage.getItem(STORAGE_KEY);
        const attempts = raw ? JSON.parse(raw) : [];

        const attempt = {
            id: `attempt_${Date.now()}`,
            personName: payload.personName?.trim() || null,
            personBio: payload.personBio?.trim() || null,
            mainIslandId: payload.mainIslandId || null,
            mainIslandName: payload.mainIsland?.name || null,
            topSkills: Array.isArray(payload.topSkills) ? payload.topSkills : [],
            createdAt: new Date().toISOString()
        };

        attempts.push(attempt);
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(attempts));

        // Also mirror this attempt under a per-island key so `carte.html` can
        // load attempts by island (keys like `attempts_free_software_autonomy`).
        try {
            if (attempt.mainIslandId) {
                const islandKey = `attempts_${attempt.mainIslandId}`;
                const rawIsland = window.localStorage.getItem(islandKey);
                const islandArr = rawIsland ? JSON.parse(rawIsland) : [];

                const islandEntry = {
                    personName: attempt.personName,
                    personBio: attempt.personBio,
                    islandName: attempt.mainIslandName || attempt.mainIslandId,
                    topSkills: Array.isArray(attempt.topSkills)
                        ? attempt.topSkills.map((s) => ({ id: s.id, level: s.level }))
                        : []
                };

                islandArr.push(islandEntry);
                window.localStorage.setItem(islandKey, JSON.stringify(islandArr));
            }
        } catch (e) {
            console.warn('[LOCALSTORAGE] Could not save per-island attempts:', e);
        }

        console.log("[LOCALSTORAGE] tentative enregistrée :", attempt);

        // On renvoie un “fake” résultat comme si le serveur avait répondu
        return { status: "ok", attemptId: attempt.id };
    } catch (e) {
        console.error("[LOCALSTORAGE] Erreur lors de la sauvegarde :", e);
        // On renvoie quand même quelque chose pour ne pas casser le flow
        return { status: "error", error: e?.message || "localStorage failed" };
    }
}

// Récupérer toutes les tentatives (si tu veux une page de stats locale)
export function getAllAttempts() {
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

// Récupérer des stats par île (ex : pour un futur écran)
export function getStatsByIsland() {
    const attempts = getAllAttempts();
    const stats = {};

    attempts.forEach((a) => {
        const id = a.mainIslandId || "unknown";
        stats[id] = (stats[id] || 0) + 1;
    });

    return stats;
}
