import React, { useState } from 'react';
import Navigation from '../../components/layout/Navigation';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Notification from '../../components/common/Notification';

export default function Donations() {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState({ show: false, message: '', type: 'info' });
    const [matchFound, setMatchFound] = useState(false);

    const stories = [
        { id: 1, title: 'FEED INDIA INITIATIVE', impact: 'SERVED 50 MEALS LAST WEEK', icon: '🍲' },
        { id: 2, title: 'LOCAL SHELTER CORE', impact: 'HELPED 20 FAMILIES', icon: '🏠' }
    ];

    const handleDonationSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setStep(2);
            setTimeout(() => {
                setMatchFound(true);
                setTimeout(() => {
                    setStep(3);
                    setNotification({ show: true, message: 'Donation successfully matched!', type: 'success' });
                }, 2000);
            }, 3000);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-black text-white selection:bg-creative-lime selection:text-black italic-typography">
            <Navigation />
            <Notification isVisible={notification.show} message={notification.message} type={notification.type} onClose={() => setNotification(prev => ({ ...prev, show: false }))} />

            <main className="lg:ml-72 min-h-screen p-8 lg:p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-creative-lime/5 blur-[150px] rounded-full pointer-events-none" />

                <div className="max-w-7xl mx-auto relative z-10 space-y-16">
                    {/* Header - High Outreach */}
                    <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-12">
                        <div className="animate-fade-in">
                            <div className="inline-block px-4 py-1.5 border border-creative-lime/30 bg-creative-lime/5 rounded-full text-[10px] font-black uppercase tracking-[0.5em] mb-6 text-creative-lime animate-pulse">
                                HUMANITARIAN LOGISTICS CORE
                            </div>
                            <h1 className="text-7xl lg:text-9xl font-black tracking-tighter leading-[0.8] italic uppercase">
                                SHARE THE<br />
                                <span className="text-creative-lime">SURPLUS.</span>
                            </h1>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Logistics Flow */}
                        <div className="space-y-8">
                            {step === 1 && (
                                <Card variant="premium" className="animate-fade-in border-white/5 p-12 overflow-visible">
                                    <h2 className="text-3xl font-black tracking-tighter italic uppercase mb-12 text-creative-lime">Initialize Donation</h2>
                                    <form onSubmit={handleDonationSubmit} className="space-y-8">
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 ml-4">Entity Description</label>
                                            <input
                                                className="w-full bg-black border border-white/10 rounded-2xl py-5 px-8 text-xs font-black uppercase tracking-widest focus:border-creative-lime outline-none"
                                                placeholder="E.G., RICE, CURRY, BREAD..."
                                                required
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-8">
                                            <div className="space-y-4">
                                                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 ml-4">Mass Load</label>
                                                <input
                                                    className="w-full bg-black border border-white/10 rounded-2xl py-5 px-8 text-xs font-black uppercase tracking-widest focus:border-creative-lime outline-none"
                                                    placeholder="E.G., 5KG"
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-4">
                                                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 ml-4">Terminal Time</label>
                                                <input
                                                    type="time"
                                                    className="w-full bg-black border border-white/10 rounded-2xl py-5 px-8 text-xs font-black uppercase tracking-widest focus:border-creative-lime outline-none appearance-none"
                                                />
                                            </div>
                                        </div>
                                        <Button type="submit" variant="primary" className="w-full py-8 text-[10px]" disabled={loading}>
                                            {loading ? 'CALCULATING TRAJECTORY...' : 'SCAN FOR NGO NODES'}
                                        </Button>
                                    </form>
                                </Card>
                            )}

                            {step === 2 && (
                                <Card variant="glass" className="text-center py-24 animate-fade-in border-white/5 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-creative-lime/5 animate-pulse" />
                                    <div className="relative z-10">
                                        {!matchFound ? (
                                            <div className="space-y-12">
                                                <div className="relative w-40 h-40 mx-auto">
                                                    <div className="absolute inset-0 border-[3px] border-creative-lime/20 rounded-full animate-ping-slow" />
                                                    <div className="absolute inset-4 border-[3px] border-creative-lime/40 rounded-full animate-ping" />
                                                    <div className="absolute inset-0 flex items-center justify-center text-5xl">📡</div>
                                                </div>
                                                <div>
                                                    <h3 className="text-4xl font-black italic tracking-tighter uppercase mb-4">Probing Network...</h3>
                                                    <p className="text-[10px] font-black text-white/30 tracking-widest uppercase italic">Establishing connection with humanitarian nodes</p>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="animate-scale-in space-y-12">
                                                <div className="w-40 h-40 mx-auto bg-creative-lime text-black rounded-full flex items-center justify-center text-6xl animate-bounce shadow-[0_0_50px_rgba(163,230,53,0.4)]">
                                                    🤝
                                                </div>
                                                <div>
                                                    <h3 className="text-4xl font-black italic tracking-tighter uppercase mb-4 text-creative-lime">Node Synchronized!</h3>
                                                    <p className="text-[10px] font-black text-white/30 tracking-widest uppercase">Target identified: <span className="text-white">CITY FEED FOUNDATION</span></p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </Card>
                            )}

                            {step === 3 && (
                                <Card variant="premium" className="animate-slide-up border-white/5 p-12 overflow-hidden relative">
                                    <div className="text-center mb-16">
                                        <div className="inline-block px-4 py-1.5 border border-creative-lime/30 bg-creative-lime/5 rounded-full text-[9px] font-black tracking-[0.3em] mb-6 text-creative-lime animate-pulse">
                                            LOGISTICS STATUS: ACTIVE
                                        </div>
                                        <h2 className="text-5xl font-black italic tracking-tighter uppercase mb-4">DEPLOYMENT CONFIRMED.</h2>
                                        <p className="text-[10px] font-black text-white/30 tracking-widest uppercase italic font-bold">Volunteer interception imminent.</p>
                                    </div>

                                    <div className="bg-white/5 border border-white/5 rounded-[2.5rem] p-10 mb-10 group overflow-hidden relative">
                                        <div className="flex items-center gap-6 mb-10">
                                            <div className="w-16 h-16 bg-creative-lime text-black rounded-full flex items-center justify-center font-black italic text-xl">RK</div>
                                            <div>
                                                <h4 className="text-xl font-black italic uppercase tracking-tighter">Rajesh Kumar</h4>
                                                <p className="text-[9px] font-black text-white/20 tracking-widest uppercase">Tactical Partner • 4.8 Rating</p>
                                            </div>
                                            <div className="ml-auto text-creative-lime text-[10px] font-black tracking-widest uppercase">0.4 KM AWAY</div>
                                        </div>

                                        {/* Operational Tactical Map */}
                                        <div className="h-48 bg-black/60 rounded-[1.5rem] relative overflow-hidden ring-1 ring-white/10 group-hover:ring-creative-lime/30 transition-all duration-700">
                                            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '15px 15px' }} />
                                            {/* Tactical Route */}
                                            <svg className="absolute inset-0 w-full h-full p-8">
                                                <path d="M20,100 Q150,20 400,100" fill="none" stroke="rgba(163,230,53,0.3)" strokeWidth="2" strokeDasharray="10,10" className="animate-dash" />
                                            </svg>
                                            <div className="absolute top-1/2 left-8 -translate-y-1/2 flex flex-col items-center">
                                                <div className="w-3 h-3 bg-white rounded-full animate-pulse shadow-[0_0_15px_white]" />
                                                <span className="text-[8px] font-black text-white/40 mt-2 uppercase tracking-widest">ORIGIN</span>
                                            </div>
                                            <div className="absolute top-1/2 right-8 -translate-y-1/2 flex flex-col items-center">
                                                <div className="w-3 h-3 bg-creative-lime rounded-full animate-pulse shadow-[0_0_15px_#a3e635]" />
                                                <span className="text-[8px] font-black text-creative-lime/40 mt-2 uppercase tracking-widest">NGO NODE</span>
                                            </div>
                                            {/* Moving Interceptor */}
                                            <div className="absolute w-4 h-4 bg-creative-lime rounded-full border-2 border-black top-[40%] left-0 animate-move-path shadow-[0_0_20px_#a3e635] z-10" />
                                        </div>
                                    </div>

                                    <Button onClick={() => setStep(1)} variant="outline" className="w-full text-[10px] border-white/10 py-6">TELEMETRY HISTORY</Button>
                                </Card>
                            )}
                        </div>

                        {/* Impact Insights */}
                        <div className="space-y-12">
                            {/* Global Reach Matrix */}
                            <Card variant="glass" className="h-80 relative overflow-hidden border-white/5">
                                <div className="absolute inset-0 bg-black">
                                    <div className="absolute inset-0 opacity-20 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-cover bg-center invert" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-80 h-80 border border-creative-lime/10 rounded-full animate-ping-slow" />
                                        <div className="w-40 h-40 border border-creative-lime/20 rounded-full animate-ping" />
                                    </div>
                                    {/* Active Pulse Nodes */}
                                    <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-creative-lime rounded-full animate-pulse shadow-[0_0_15px_#a3e635]" />
                                    <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-creative-lime rounded-full animate-pulse shadow-[0_0_15px_#a3e635] animation-delay-700" />
                                    <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-white rounded-full border-2 border-black shadow-xl z-20" />
                                </div>
                                <div className="absolute bottom-0 inset-x-0 p-10 bg-gradient-to-t from-black via-black/80 to-transparent">
                                    <h3 className="text-2xl font-black italic tracking-tighter uppercase text-white mb-2">Network Resonance</h3>
                                    <p className="text-[10px] font-black text-white/30 tracking-[0.2em] uppercase italic font-bold">Active humanitarian nodes in sector: <span className="text-creative-lime">12</span></p>
                                </div>
                            </Card>

                            <div className="space-y-8">
                                <h3 className="text-xl font-black italic uppercase tracking-[0.2em] text-white/40 ml-4">Impact Logs</h3>
                                <div className="space-y-4">
                                    {stories.map((story, i) => (
                                        <Card key={story.id} variant="glass" className="p-8 border-white/5 hover:border-creative-lime transition-all duration-700 animate-slide-left" style={{ animationDelay: `${i * 100}ms` }}>
                                            <div className="flex items-center gap-6">
                                                <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-3xl transition-transform group-hover:scale-110">
                                                    {story.icon}
                                                </div>
                                                <div>
                                                    <h4 className="text-lg font-black italic uppercase tracking-tighter text-white/80">{story.title}</h4>
                                                    <p className="text-[10px] font-black text-creative-lime tracking-widest uppercase">{story.impact}</p>
                                                </div>
                                                <button className="ml-auto text-white/20 hover:text-red-500 transition-colors text-2xl">❤️</button>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </div>

                            <div className="p-10 bg-gradient-to-br from-creative-lime to-lime-400 rounded-[2.5rem] shadow-[0_20px_50px_rgba(163,230,53,0.3)] group hover:-translate-y-2 transition-transform duration-700">
                                <p className="text-[10px] font-black uppercase text-black/40 tracking-[0.3em] mb-2 font-bold">Contribution Intelligence</p>
                                <p className="text-2xl font-black italic text-black leading-tight">10KG OF LOAD CAN SUSTAIN APPROX. 25 OPERATIONS.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
