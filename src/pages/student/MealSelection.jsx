import React, { useState, useEffect } from 'react';
import Navigation from '../../components/layout/Navigation';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Notification from '../../components/common/Notification';
import {
    getCountdownText,
    getVotingStatus,
    hasUserVoted,
    saveVotes
} from '../../utils/mealVoting';
import { useMeals } from '../../context/MealContext';

const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
const MEAL_TYPES = ['breakfast', 'lunch', 'dinner'];
const MEAL_ICONS = { breakfast: '🍳', lunch: '🍛', dinner: '🌙' };
const DAY_LABELS = {
    monday: 'MON', tuesday: 'TUE', wednesday: 'WED',
    thursday: 'THU', friday: 'FRI', saturday: 'SAT', sunday: 'SUN'
};

export default function MealSelection() {
    const { user } = useAuth();
    const {
        mealOptions,
        finalizedMenu,
        loading: contextLoading,
        error: contextError,
        voterCount,
        votingStatus,
        weekKey,
        refreshFinalizedMenu,
        retryLoad
    } = useMeals();
    const [selections, setSelections] = useState({});
    const [alreadyVoted, setAlreadyVoted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [activeDay, setActiveDay] = useState('monday');
    const [notification, setNotification] = useState({ show: false, message: '', type: 'info' });
    const [countdownText, setCountdownText] = useState('');

    // Sync alreadyVoted status
    useEffect(() => {
        if (user?.id) {
            setAlreadyVoted(hasUserVoted(weekKey, user.id));
        }
        setCountdownText(getCountdownText());
    }, [user, weekKey]);

    // Update countdown every minute
    useEffect(() => {
        const interval = setInterval(() => {
            setCountdownText(getCountdownText());
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    // Handle option selection
    function handleSelect(day, mealType, option) {
        const slotKey = `${day}_${mealType}`;
        setSelections(prev => ({ ...prev, [slotKey]: option.name }));
    }

    // Submit all votes
    async function handleSubmitVotes() {
        // Validation: check all slots have selections
        const missingSlots = [];
        for (const day of DAYS) {
            for (const meal of MEAL_TYPES) {
                const slotKey = `${day}_${meal}`;
                if (!selections[slotKey]) {
                    missingSlots.push(`${DAY_LABELS[day]} ${meal.toUpperCase()}`);
                }
            }
        }

        if (missingSlots.length > 0) {
            setNotification({
                show: true,
                message: `Please select options for all meals. Missing: ${missingSlots.slice(0, 3).join(', ')}${missingSlots.length > 3 ? ` +${missingSlots.length - 3} more` : ''}`,
                type: 'error'
            });
            return;
        }

        setSubmitting(true);
        const result = saveVotes(weekKey, user.id, selections);

        if (result.success) {
            setAlreadyVoted(true);
            setNotification({ show: true, message: 'VOTE REGISTERED SUCCESSFULLY', type: 'success' });

            // Show current results via centralized refresh
            refreshFinalizedMenu();
        } else {
            setNotification({ show: true, message: result.error, type: 'error' });
        }

        setSubmitting(false);
    }

    // Retry XML fetch
    async function handleRetry() {
        await retryLoad();
    }

    // Determine what to show
    const isVotingOpen = votingStatus === 'OPEN' && !alreadyVoted;
    const showResults = votingStatus !== 'OPEN' || alreadyVoted;

    return (
        <div className="min-h-screen bg-black text-white selection:bg-creative-lime selection:text-black">
            <Navigation />
            <Notification isVisible={notification.show} message={notification.message} type={notification.type} onClose={() => setNotification(prev => ({ ...prev, show: false }))} />

            <main className="lg:ml-72 min-h-screen p-8 lg:p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-creative-purple/5 blur-[200px] rounded-full pointer-events-none" />

                <div className="max-w-7xl mx-auto space-y-16 relative z-10">
                    {/* Header */}
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 animate-fade-in">
                        <div>
                            <div className="inline-block px-4 py-1 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.4em] mb-6 text-creative-purple">
                                {votingStatus === 'OPEN' ? '🟢 Voting Protocol: ACTIVE' : '🔴 Voting Protocol: SEALED'}
                            </div>
                            <h1 className="text-6xl lg:text-9xl font-black tracking-tighter leading-[0.8] italic uppercase">
                                MEAL<br />
                                <span className="text-creative-purple">SELECT.</span>
                            </h1>
                            <p className="mt-6 text-sm text-white/30 font-medium max-w-lg">
                                {isVotingOpen
                                    ? 'Cast your vote for next week\'s meals. Choose one option per meal slot for every day.'
                                    : alreadyVoted
                                        ? 'Your vote has been registered. Here are the current results.'
                                        : 'Voting is currently closed. The finalized menu is displayed below.'
                                }
                            </p>
                        </div>

                        {/* Status HUD */}
                        <Card variant="premium" className="w-full lg:w-80 border-white/5 p-8">
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Status</span>
                                    <span className={`text-[10px] font-black px-3 py-1 rounded-full ${votingStatus === 'OPEN'
                                        ? 'bg-creative-lime/20 text-creative-lime border border-creative-lime/30'
                                        : 'bg-red-500/20 text-red-400 border border-red-500/30'
                                        }`}>
                                        {votingStatus}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Voters</span>
                                    <span className="text-2xl font-black italic tracking-tighter">{voterCount}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Week</span>
                                    <span className="text-sm font-black tracking-widest text-creative-purple">{weekKey}</span>
                                </div>
                                <div className="pt-4 border-t border-white/5">
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">{countdownText}</span>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Loading */}
                    {contextLoading && (
                        <div className="flex flex-col items-center justify-center py-32 animate-pulse">
                            <div className="w-20 h-20 border-4 border-creative-purple/20 border-t-creative-purple rounded-full animate-spin mb-8" />
                            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-creative-purple">Loading Options...</span>
                        </div>
                    )}

                    {/* XML Error */}
                    {contextError && !contextLoading && (
                        <Card variant="glass" className="py-20 flex flex-col items-center text-center">
                            <div className="text-6xl mb-8 opacity-30">⚠️</div>
                            <h3 className="text-3xl font-black italic uppercase tracking-tighter mb-4">Data Feed Interrupted</h3>
                            <p className="text-white/40 max-w-md font-medium mb-8">{contextError}</p>
                            <Button onClick={handleRetry}>RETRY CONNECTION</Button>
                        </Card>
                    )}

                    {/* ──── VOTING UI ──── */}
                    {!contextLoading && !contextError && mealOptions && isVotingOpen && (
                        <>
                            {/* Day Selector */}
                            <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
                                {DAYS.map((day, i) => (
                                    <button
                                        key={day}
                                        onClick={() => setActiveDay(day)}
                                        className={`flex-shrink-0 px-8 py-5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-500 border-2 ${activeDay === day
                                            ? 'bg-creative-purple text-white border-creative-purple shadow-[0_0_40px_rgba(139,92,246,0.2)]'
                                            : 'bg-white/5 text-white/40 border-white/5 hover:border-white/20 hover:bg-white/10'
                                            }`}
                                    >
                                        {DAY_LABELS[day]}
                                        {/* Show checkmark if all meals for this day are selected */}
                                        {MEAL_TYPES.every(m => selections[`${day}_${m}`]) && (
                                            <span className="ml-2 text-creative-lime">✓</span>
                                        )}
                                    </button>
                                ))}
                            </div>

                            {/* Meal Options for Active Day */}
                            <div className="space-y-12">
                                {MEAL_TYPES.map(mealType => {
                                    const slotKey = `${activeDay}_${mealType}`;
                                    const options = mealOptions[activeDay]?.[mealType] || [];

                                    return (
                                        <div key={mealType} className="animate-fade-in">
                                            <div className="flex items-center gap-4 mb-6">
                                                <span className="text-3xl">{MEAL_ICONS[mealType]}</span>
                                                <h3 className="text-2xl font-black tracking-tighter italic uppercase">{mealType}</h3>
                                                {selections[slotKey] && (
                                                    <span className="text-[10px] font-black px-3 py-1 rounded-full bg-creative-lime/20 text-creative-lime border border-creative-lime/30">
                                                        SELECTED
                                                    </span>
                                                )}
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                                {options.map((option, idx) => (
                                                    <button
                                                        key={idx}
                                                        onClick={() => handleSelect(activeDay, mealType, option)}
                                                        className={`p-6 rounded-[2rem] border-2 text-left transition-all duration-500 group relative overflow-hidden ${selections[slotKey] === option.name
                                                            ? 'border-creative-purple bg-creative-purple/10 shadow-[0_0_30px_rgba(139,92,246,0.15)]'
                                                            : 'border-white/5 hover:border-white/20 hover:bg-white/5'
                                                            }`}
                                                    >
                                                        <div className="flex justify-between items-start mb-4">
                                                            <span className="text-[10px] font-black text-white/20 tracking-widest">
                                                                OPTION {idx + 1}
                                                            </span>
                                                            {selections[slotKey] === option.name && (
                                                                <div className="w-3 h-3 rounded-full bg-creative-purple shadow-[0_0_15px_rgba(139,92,246,1)]" />
                                                            )}
                                                        </div>
                                                        <p className="font-black text-sm tracking-tight uppercase leading-relaxed">
                                                            {option.name}
                                                        </p>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Progress & Submit */}
                            <Card variant="premium" className="border-white/5 p-10">
                                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                                    <div>
                                        <div className="flex items-center gap-4 mb-2">
                                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Selection Progress</span>
                                            <span className="text-sm font-black italic text-creative-purple">
                                                {Object.keys(selections).length} / {DAYS.length * MEAL_TYPES.length}
                                            </span>
                                        </div>
                                        <div className="w-64 h-2 bg-white/5 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-creative-purple shadow-[0_0_20px_rgba(139,92,246,0.8)] transition-all duration-500"
                                                style={{ width: `${(Object.keys(selections).length / (DAYS.length * MEAL_TYPES.length)) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                    <Button
                                        variant="secondary"
                                        size="xl"
                                        onClick={handleSubmitVotes}
                                        isLoading={submitting}
                                        disabled={Object.keys(selections).length < DAYS.length * MEAL_TYPES.length}
                                    >
                                        CAST BALLOT →
                                    </Button>
                                </div>
                            </Card>
                        </>
                    )}

                    {/* ──── RESULTS VIEW ──── */}
                    {!contextLoading && !contextError && showResults && finalizedMenu && (
                        <div className="space-y-8">
                            {alreadyVoted && votingStatus === 'OPEN' && (
                                <Card variant="glass" className="py-8 text-center border-creative-lime/20">
                                    <div className="flex items-center justify-center gap-4">
                                        <span className="text-3xl">✅</span>
                                        <div>
                                            <h3 className="text-xl font-black italic uppercase tracking-tighter">Vote Registered</h3>
                                            <p className="text-[10px] font-black text-white/30 tracking-widest uppercase mt-1">
                                                Final results will be announced at 8:00 PM Sunday
                                            </p>
                                        </div>
                                    </div>
                                </Card>
                            )}

                            <Card variant="premium" className="border-white/5 overflow-visible">
                                <div className="flex justify-between items-center mb-10 px-4">
                                    <div>
                                        <h2 className="text-3xl font-black tracking-tighter italic uppercase text-creative-purple mb-2">
                                            {votingStatus === 'OPEN' ? 'LIVE RESULTS' : 'FINALIZED MENU'}
                                        </h2>
                                        <p className="text-[10px] font-black text-white/30 tracking-widest uppercase">
                                            Week {weekKey} • {voterCount} voter{voterCount !== 1 ? 's' : ''}
                                        </p>
                                    </div>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="border-b border-white/10">
                                                <th className="py-6 px-6 text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">Day</th>
                                                {MEAL_TYPES.map(m => (
                                                    <th key={m} className="py-6 px-6 text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">
                                                        {MEAL_ICONS[m]} {m}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                            {DAYS.map(day => (
                                                <tr key={day} className="group hover:bg-white/[0.02] transition-colors">
                                                    <td className="py-6 px-6 font-black italic tracking-tight text-white/80 uppercase">
                                                        {DAY_LABELS[day]}
                                                    </td>
                                                    {MEAL_TYPES.map(m => {
                                                        const slotKey = `${day}_${m}`;
                                                        return (
                                                            <td key={m} className="py-6 px-6">
                                                                <p className="text-xs font-black tracking-tight uppercase text-white/60 leading-relaxed">
                                                                    {finalizedMenu[slotKey]?.name || 'TBD'}
                                                                </p>
                                                            </td>
                                                        );
                                                    })}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </Card>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
