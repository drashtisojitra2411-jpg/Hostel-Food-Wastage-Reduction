import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
    fetchMealOptions,
    getWeekKey,
    getFinalizedMenu,
    getVotingStatus,
    getVoterCount
} from '../utils/mealVoting';

const MealContext = createContext({});

export const useMeals = () => useContext(MealContext);

export function MealProvider({ children }) {
    const [mealOptions, setMealOptions] = useState(null);
    const [finalizedMenu, setFinalizedMenu] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [voterCount, setVoterCount] = useState(0);
    const [votingStatus, setVotingStatus] = useState('CLOSED');
    const weekKey = getWeekKey();

    const loadMealData = useCallback(async () => {
        setLoading(true);
        try {
            const result = await fetchMealOptions();
            if (result.success) {
                setMealOptions(result.data);
                const finalized = getFinalizedMenu(weekKey, result.data);
                setFinalizedMenu(finalized);
                setVotingStatus(getVotingStatus());
                setVoterCount(getVoterCount(weekKey));
                setError(null);
            } else {
                setError(result.error);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [weekKey]);

    useEffect(() => {
        loadMealData();
    }, [loadMealData]);

    const refreshFinalizedMenu = useCallback(() => {
        if (mealOptions) {
            setFinalizedMenu(getFinalizedMenu(weekKey, mealOptions));
            setVoterCount(getVoterCount(weekKey));
            setVotingStatus(getVotingStatus());
        }
    }, [weekKey, mealOptions]);

    const value = {
        mealOptions,
        finalizedMenu,
        loading,
        error,
        voterCount,
        votingStatus,
        refreshFinalizedMenu,
        retryLoad: loadMealData,
        weekKey
    };

    return (
        <MealContext.Provider value={value}>
            {children}
        </MealContext.Provider>
    );
}
