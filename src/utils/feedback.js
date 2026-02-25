import { supabase } from '../lib/supabase';

/**
 * Save user feedback for a specific meal.
 * Uses upsert logic to enforce "one feedback per user/meal/day".
 * @param {Object} feedback - { user_id, user_role, day, meal_type, rating, comment, finalized_meal_id }
 */
export async function saveFeedback({ user_id, user_role, day, meal_type, rating, comment, finalized_meal_id }) {
    if (!rating) {
        return { success: false, error: 'Rating is mandatory' };
    }

    if (comment && comment.length > 300) {
        return { success: false, error: 'Comment exceeds 300 characters' };
    }

    try {
        const { data, error } = await supabase
            .from('meal_feedback')
            .upsert([
                {
                    user_id,
                    user_role,
                    day,
                    meal_type,
                    rating,
                    comment,
                    finalized_meal_id,
                    created_at: new Date().toISOString() // Update timestamp on overwrite
                }
            ], { onConflict: 'user_id,day,meal_type' });

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Error saving feedback:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Fetch feedback with filters (Admin use).
 */
export async function fetchFeedback({ day, meal_type, rating, limit = 50, offset = 0 } = {}) {
    try {
        let query = supabase
            .from('meal_feedback')
            .select(`
                *,
                user_profiles (
                    full_name,
                    hostel_name
                )
            `, { count: 'exact' });

        if (day) query = query.eq('day', day);
        if (meal_type) query = query.eq('meal_type', meal_type);
        if (rating) query = query.eq('rating', rating);

        const { data, error, count } = await query
            .order('created_at', { ascending: false })
            .range(offset, offset + limit - 1);

        if (error) throw error;
        return { success: true, data, count };
    } catch (error) {
        console.error('Error fetching feedback:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Fetch latest feedback for dashboard preview.
 */
export async function fetchLatestFeedback(limit = 5) {
    return fetchFeedback({ limit });
}
