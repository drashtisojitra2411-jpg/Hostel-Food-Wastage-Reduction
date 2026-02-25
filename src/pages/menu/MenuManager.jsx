import React, { useState } from 'react';
import Navigation from '../../components/layout/Navigation';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';

export default function MenuManager() {
    const days = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
    const [activeDay, setActiveDay] = useState('MONDAY');

    const [menu, setMenu] = useState({
        MONDAY: { breakfast: 'IDLI, VADA', lunch: 'RICE, SAMBAR', dinner: 'CHAPATI, PANEER' },
        TUESDAY: { breakfast: 'DOSA', lunch: 'LEMON RICE', dinner: 'VEG BIRYANI' },
    });

    return (
        <div className="min-h-screen bg-black text-white selection:bg-creative-lime selection:text-black italic-typography">
            <Navigation />

            <main className="lg:ml-72 min-h-screen p-8 lg:p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-creative-lime/5 blur-[150px] rounded-full pointer-events-none" />

                <div className="max-w-7xl mx-auto relative z-10 space-y-16">
                    {/* Header - Culinary Protocol */}
                    <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-12">
                        <div className="animate-fade-in">
                            <div className="inline-block px-4 py-1.5 border border-creative-lime/30 bg-creative-lime/5 rounded-full text-[10px] font-black uppercase tracking-[0.5em] mb-6 text-creative-lime animate-pulse">
                                CULINARY OPERATIONS PROTOCOL
                            </div>
                            <h1 className="text-7xl lg:text-9xl font-black tracking-tighter leading-[0.8] italic uppercase">
                                CULINARY<br />
                                <span className="text-creative-lime">MANIFEST.</span>
                            </h1>
                        </div>
                        <div className="flex gap-4 w-full xl:w-auto">
                            <Button variant="primary" className="flex-1 xl:flex-none py-6 px-12 text-[10px]">PUBLISH MANIFEST</Button>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-4 gap-12">
                        {/* Synchronous Day Nodes */}
                        <div className="lg:col-span-1 flex flex-col gap-3">
                            <div className="text-[10px] font-black tracking-[0.3em] text-white/20 mb-4 ml-2 uppercase">Temporal Nodes</div>
                            {days.map((day, index) => (
                                <button
                                    key={day}
                                    onClick={() => setActiveDay(day)}
                                    className={`relative group px-8 py-6 rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-500 text-left border overflow-hidden animate-slide-right ${activeDay === day
                                        ? 'bg-creative-lime text-black border-creative-lime shadow-[0_0_40px_rgba(163,230,53,0.2)]'
                                        : 'bg-white/5 text-white/40 border-white/5 hover:border-white/20 hover:bg-white/10'
                                        }`}
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    <span className="relative z-10">{day}</span>
                                    {activeDay === day && (
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-black animate-ping" />
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Culinary Data Matrix */}
                        <div className="lg:col-span-3">
                            <Card variant="premium" className="h-full border-white/5 backdrop-blur-3xl overflow-visible">
                                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 px-4">
                                    <div>
                                        <h2 className="text-4xl font-black tracking-tighter italic uppercase text-creative-lime mb-2">
                                            {activeDay} PROTOCOL
                                        </h2>
                                        <p className="text-[10px] font-black text-white/30 tracking-widest uppercase">Operational Parameters Active</p>
                                    </div>
                                    <div className="text-[9px] font-black text-white/20 tracking-widest uppercase">
                                        Last Sync: 12.04.2024 // 09:42
                                    </div>
                                </div>

                                <div className="space-y-16">
                                    {['BREAKFAST', 'LUNCH', 'DINNER'].map((meal, index) => (
                                        <div key={meal} className="relative animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                                            <div className="flex items-center gap-6 mb-6">
                                                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-black italic text-creative-lime text-lg">
                                                    0{index + 1}
                                                </div>
                                                <h3 className="text-xl font-black tracking-widest italic uppercase text-white/80">{meal}</h3>
                                                <div className="flex-1 h-[1px] bg-gradient-to-r from-white/10 to-transparent" />
                                            </div>

                                            <div className="relative group/input ml-12">
                                                <textarea
                                                    className="w-full p-8 rounded-[2rem] bg-black/40 border-2 border-white/5 text-sm font-black tracking-widest uppercase placeholder:text-white/10 focus:border-creative-lime/50 focus:bg-black/60 transition-all outline-none min-h-[140px] resize-none leading-relaxed"
                                                    placeholder={`SPECIFY ${meal} PAYLOAD...`}
                                                    defaultValue={menu[activeDay]?.[meal.toLowerCase()] || ''}
                                                ></textarea>
                                                <div className="absolute top-0 left-0 w-2 h-0 group-focus-within/input:h-full bg-creative-lime transition-all duration-500 rounded-full -ml-8" />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-16 pt-12 border-t border-white/5 px-4 flex justify-between items-center text-[9px] font-black tracking-[0.3em] text-white/20 uppercase">
                                    <span>Payload encryption: AES-256</span>
                                    <span className="text-creative-lime/40">Ready for distribution</span>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
