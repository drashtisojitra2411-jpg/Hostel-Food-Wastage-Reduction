import React, { useState, useEffect } from 'react';
import Navigation from '../../components/layout/Navigation';
import Card from '../../components/common/Card';
import { getWeekKey, getFinalizedMenu } from '../../utils/mealVoting';

const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
const MEAL_TYPES = ['breakfast', 'lunch', 'dinner'];
const MEAL_LABELS = { breakfast: 'ALPHA MEAL // BREAKFAST', lunch: 'BETA MEAL // LUNCH', dinner: 'GAMMA MEAL // DINNER' };

export default function StudentMenu() {
    const [menu, setMenu] = useState(null);
    const [loading, setLoading] = useState(true);
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    const weekKey = getWeekKey();

    useEffect(() => {
        setLoading(true);
        const finalized = getFinalizedMenu(weekKey);
        setMenu(finalized);
        setLoading(false);
    }, [weekKey]);

    return (
        <div className="min-h-screen bg-black text-white selection:bg-creative-lime selection:text-black italic-typography">
            <Navigation />

            <main className="lg:ml-72 min-h-screen p-8 lg:p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-creative-lime/5 blur-[150px] rounded-full pointer-events-none" />

                <div className="max-w-7xl mx-auto relative z-10 space-y-16">
                    {/* Header - Daily Provision */}
                    <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-12">
                        <div className="animate-fade-in">
                            <div className="inline-block px-4 py-1.5 border border-creative-lime/30 bg-creative-lime/5 rounded-full text-[10px] font-black uppercase tracking-[0.5em] mb-6 text-creative-lime animate-pulse">
                                CULINARY PROVISION MATRIX
                            </div>
                            <h1 className="text-7xl lg:text-9xl font-black tracking-tighter leading-[0.8] italic uppercase">
                                WEEKLY<br />
                                <span className="text-creative-lime">SCHEDULE.</span>
                            </h1>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <div className="w-12 h-12 border-4 border-creative-lime/20 border-t-creative-lime rounded-full animate-spin" />
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {DAYS.map((day, index) => (
                                <Card
                                    key={day}
                                    variant={day === today ? 'premium' : 'glass'}
                                    className={`h-full group transition-all duration-700 ${day === today ? 'ring-2 ring-creative-lime/50 scale-105 z-20 shadow-[0_0_50px_-12px_rgba(132,204,22,0.3)]' : 'hover:scale-105 hover:z-10 bg-white/[0.02] border-white/5'}`}
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <div className="p-8">
                                        <div className="flex items-center justify-between mb-10">
                                            <h2 className={`text-4xl font-black tracking-tighter italic uppercase ${day === today ? 'text-black' : 'text-white/80'}`}>{day}</h2>
                                            {day === today && (
                                                <div className="px-3 py-1 bg-black text-creative-lime text-[8px] font-black uppercase tracking-widest rounded-full animate-pulse">
                                                    ACTIVE CYCLE
                                                </div>
                                            )}
                                        </div>

                                        <div className="space-y-6">
                                            {MEAL_TYPES.map(meal => (
                                                <div key={meal} className={`p-6 rounded-2xl border transition-colors ${day === today ? 'bg-black/10 border-black/10' : 'bg-white/5 border-white/5 group-hover:bg-white/10'}`}>
                                                    <span className={`text-[8px] font-black uppercase tracking-[0.3em] block mb-3 ${day === today ? 'text-black/40' : 'text-white/20'}`}>{MEAL_LABELS[meal]}</span>
                                                    <p className={`text-sm font-black italic tracking-tighter uppercase ${day === today ? 'text-black' : 'text-white'}`}>
                                                        {menu?.[`${day}_${meal}`] || 'TBD'}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}

                    {/* Disclaimer - Tactical Note */}
                    <div className="pt-24 text-center">
                        <p className="text-[10px] font-black text-white/10 tracking-[0.5em] uppercase italic">
                            * Menu parameters subject to logistics deviation and resource availability.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
