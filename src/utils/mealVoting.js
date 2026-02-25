/**
 * mealVoting.js — Pure utility functions for the weekly meal voting system.
 * Handles localStorage read/write, week key generation, time-gating, tallying, and edge cases.
 */

// ─── Week Key ───────────────────────────────────────────────────────────────
/**
 * Returns an ISO-week-based key like "2026-07" for the upcoming Monday–Sunday cycle.
 * Votes cast on Sunday apply to the NEXT week (Mon–Sun).
 */
export function getWeekKey(date = new Date()) {
    const target = new Date(date);
    // If it's Sunday (day 0), we're voting for the upcoming Mon–Sun week
    // So move to next Monday
    if (target.getDay() === 0) {
        target.setDate(target.getDate() + 1);
    }
    // Get the ISO week number
    const d = new Date(Date.UTC(target.getFullYear(), target.getMonth(), target.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
    return `${d.getUTCFullYear()}-${String(weekNo).padStart(2, '0')}`;
}

// ─── Time Gating ────────────────────────────────────────────────────────────
/**
 * Returns the current voting status.
 * 'OPEN'     → Sunday 6:00 AM – 7:59 PM (voting allowed)
 * 'TALLYING' → Sunday 8:00 PM – 11:59 PM (voting closed, results being tallied)
 * 'CLOSED'   → Monday – Saturday, or Sunday before 6 AM (show finalized results)
 */
export function getVotingStatus(date = new Date()) {
    const day = date.getDay(); // 0 = Sunday
    const hour = date.getHours();

    if (day === 0 && hour >= 6 && hour < 20) return 'OPEN';
    if (day === 0 && hour >= 20) return 'TALLYING';
    return 'CLOSED';
}

/**
 * Returns a human-readable countdown string to voting window.
 */
export function getCountdownText(date = new Date()) {
    const day = date.getDay();
    const hour = date.getHours();

    if (day === 0 && hour < 6) {
        const hoursLeft = 6 - hour;
        return `Voting opens in ${hoursLeft}h`;
    }

    // Calculate days until next Sunday
    const daysUntilSunday = (7 - day) % 7;
    if (daysUntilSunday === 0) {
        return 'Voting closes at 8:00 PM today';
    }
    return `Next voting window: Sunday (${daysUntilSunday} day${daysUntilSunday > 1 ? 's' : ''} away)`;
}

// ─── Storage Keys ───────────────────────────────────────────────────────────
function getVotesKey(weekKey) {
    return `zerobite_votes_${weekKey}`;
}

function getFinalizedKey(weekKey) {
    return `zerobite_finalized_${weekKey}`;
}

// ─── Vote Operations ────────────────────────────────────────────────────────
/**
 * Get stored votes data for a given week.
 */
export function getStoredVotes(weekKey) {
    try {
        const raw = localStorage.getItem(getVotesKey(weekKey));
        if (!raw) return { weekKey, voters: {}, votes: {} };
        return JSON.parse(raw);
    } catch {
        return { weekKey, voters: {}, votes: {} };
    }
}

/**
 * Check if a user has already voted this week.
 */
export function hasUserVoted(weekKey, userId) {
    const data = getStoredVotes(weekKey);
    return !!data.voters[userId];
}

/**
 * Save a user's votes for the week.
 * @param {string} weekKey
 * @param {string} userId
 * @param {Object} selections — e.g. { monday_breakfast: "Idli Sambar", monday_lunch: "Rice Dal", ... }
 */
export function saveVotes(weekKey, userId, selections) {
    const data = getStoredVotes(weekKey);

    // Prevent duplicate voting
    if (data.voters[userId]) {
        return { success: false, error: 'You have already voted this week' };
    }

    // Record voter
    data.voters[userId] = true;

    // Tally votes
    for (const [slotKey, optionName] of Object.entries(selections)) {
        if (!data.votes[slotKey]) {
            data.votes[slotKey] = {};
        }
        if (!data.votes[slotKey][optionName]) {
            data.votes[slotKey][optionName] = 0;
        }
        data.votes[slotKey][optionName]++;
    }

    try {
        localStorage.setItem(getVotesKey(weekKey), JSON.stringify(data));
        return { success: true };
    } catch {
        return { success: false, error: 'Failed to save vote' };
    }
}

// ─── Tally & Finalization ───────────────────────────────────────────────────
/**
 * Tally votes and return the winning menu.
 * Tie-breaker: first option in the tally (deterministic — matches XML order if voted).
 * No votes: returns null for that slot (caller should default to first XML option).
 *
 * @param {string} weekKey
 * @returns {Object} e.g. { monday_breakfast: "Idli Sambar", monday_lunch: "Rice Dal", ... }
 */
export function tallyVotes(weekKey) {
    const data = getStoredVotes(weekKey);
    const winners = {};

    for (const [slotKey, options] of Object.entries(data.votes)) {
        let maxVotes = 0;
        let winner = null;
        for (const [optionName, count] of Object.entries(options)) {
            if (count > maxVotes) {
                maxVotes = count;
                winner = optionName;
            }
        }
        winners[slotKey] = winner;
    }

    return winners;
}

/**
 * Get finalized menu for a week. 
 * Uses strict fallback: voted winner OR first option from XML config.
 *
 * @param {string} weekKey
 * @param {Object} mealOptions — parsed XML options for fallbacks
 * @returns {Object} { monday_breakfast: {id, name}, ... }
 */
export function getFinalizedMenu(weekKey, mealOptions) {
    if (!mealOptions) return {};

    const winners = tallyVotes(weekKey);
    const finalized = {};
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const mealTypes = ['breakfast', 'lunch', 'dinner'];

    for (const day of days) {
        for (const meal of mealTypes) {
            const slotKey = `${day}_${meal}`;
            const winnerName = winners[slotKey];
            const options = mealOptions?.[day]?.[meal] || [];
            const defaultOption = options[0] || { id: 'TBD', name: 'TBD' };

            if (winnerName) {
                const winnerOption = options.find(o => typeof o === 'string' ? o === winnerName : o.name === winnerName);
                if (winnerOption) {
                    finalized[slotKey] = typeof winnerOption === 'string' ? { id: 'VOTED', name: winnerOption } : winnerOption;
                } else {
                    finalized[slotKey] = { id: 'VOTED', name: winnerName };
                }
            } else {
                finalized[slotKey] = typeof defaultOption === 'string' ? { id: 'DEFAULT', name: defaultOption } : defaultOption;
            }
        }
    }

    return finalized;
}

// ─── XML Parsing ────────────────────────────────────────────────────────────
/**
 * Fetch and parse meal_options.xml.
 * Returns { monday: { breakfast: ["Idli...", "Poha..."], lunch: [...], dinner: [...] }, ... }
 * Caches last-good result in localStorage as fallback.
 */
export async function fetchMealOptions() {
    const CACHE_KEY = 'zerobite_meal_options_cache';

    try {
        const response = await fetch('/meal_options.xml');
        if (!response.ok) throw new Error('Network error');
        const xmlText = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

        // Check for parse errors
        const parseError = xmlDoc.querySelector('parsererror');
        if (parseError) throw new Error('XML parse error');

        const result = {};
        const dayNodes = xmlDoc.getElementsByTagName('day');

        for (let i = 0; i < dayNodes.length; i++) {
            const dayNode = dayNodes[i];
            const dayName = dayNode.getAttribute('name');
            result[dayName] = {};

            const mealNodes = dayNode.getElementsByTagName('meal');
            for (let j = 0; j < mealNodes.length; j++) {
                const mealNode = mealNodes[j];
                const mealType = mealNode.getAttribute('type');
                const optionNodes = mealNode.getElementsByTagName('option');
                const options = [];
                for (let k = 0; k < optionNodes.length; k++) {
                    options.push({
                        id: optionNodes[k].getAttribute('id') || `opt-${k}`,
                        name: optionNodes[k].textContent.trim()
                    });
                }
                result[dayName][mealType] = options;
            }
        }

        // Cache successful result
        try {
            localStorage.setItem(CACHE_KEY, JSON.stringify(result));
        } catch { /* ignore */ }

        return { success: true, data: result };
    } catch (error) {
        // Try cached fallback
        try {
            const cached = localStorage.getItem(CACHE_KEY);
            if (cached) {
                return { success: true, data: JSON.parse(cached), fromCache: true };
            }
        } catch { /* ignore */ }

        return { success: false, error: error.message, data: null };
    }
}

/**
 * Get total vote count for a week.
 */
export function getVoterCount(weekKey) {
    const data = getStoredVotes(weekKey);
    return Object.keys(data.voters).length;
}

/**
 * Get vote counts per option for a specific slot.
 */
export function getSlotVoteCounts(weekKey, slotKey) {
    const data = getStoredVotes(weekKey);
    return data.votes[slotKey] || {};
}
