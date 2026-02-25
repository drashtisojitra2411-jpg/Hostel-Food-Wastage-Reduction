import React, { useState, useEffect } from 'react';
import Navigation from '../../components/layout/Navigation';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Notification from '../../components/common/Notification';

export default function InventoryManager() {
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);
    const [filter, setFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [notification, setNotification] = useState({ show: false, message: '', type: 'info' });

    useEffect(() => {
        setTimeout(() => {
            setItems([
                { id: 1, name: 'RICE (SONA MASOORI)', category: 'Grains', quantity: 450, unit: 'KG', minLevel: 100, maxLevel: 500, status: 'NOMINAL', location: 'SECTOR A1', icon: '🍚' },
                { id: 2, name: 'TOOR DAL', category: 'Pulses', quantity: 80, unit: 'KG', minLevel: 50, maxLevel: 200, status: 'NOMINAL', location: 'SECTOR B2', icon: '📦' },
                { id: 3, name: 'TOMATOES', category: 'Vegetables', quantity: 12, unit: 'KG', minLevel: 20, maxLevel: 50, status: 'LOW DEPLETION', location: 'COLD CORE', icon: '🍅' },
                { id: 4, name: 'COOKING OIL', category: 'Essentials', quantity: 45, unit: 'L', minLevel: 30, maxLevel: 100, status: 'WARNING', location: 'PANTRY C1', icon: '🛢️' },
                { id: 5, name: 'MILK', category: 'Dairy', quantity: 5, unit: 'L', minLevel: 40, maxLevel: 60, status: 'CRITICAL', location: 'FRIDGE 1', icon: '🥛' },
                { id: 6, name: 'POTATOES', category: 'Vegetables', quantity: 120, unit: 'KG', minLevel: 50, maxLevel: 200, status: 'NOMINAL', location: 'SECTOR D4', icon: '🥔' },
            ]);
            setLoading(false);
        }, 1000);
    }, []);

    const categories = ['All', 'Grains', 'Pulses', 'Vegetables', 'Essentials', 'Dairy'];

    const filteredItems = items.filter(item =>
        (filter === 'All' || item.category === filter) &&
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getStatusColor = (status) => {
        switch (status) {
            case 'NOMINAL': return 'text-creative-lime';
            case 'WARNING': return 'text-yellow-500';
            case 'LOW DEPLETION': return 'text-orange-500';
            case 'CRITICAL': return 'text-red-500';
            default: return 'text-white/40';
        }
    };

    return (
        <div className="min-h-screen bg-black text-white selection:bg-creative-lime selection:text-black italic-typography">
            <Navigation />
            <Notification isVisible={notification.show} message={notification.message} type={notification.type} onClose={() => setNotification(prev => ({ ...prev, show: false }))} />

            <main className="lg:ml-72 min-h-screen p-8 lg:p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-creative-purple/5 blur-[150px] rounded-full pointer-events-none" />

                <div className="max-w-7xl mx-auto relative z-10 space-y-16">
                    {/* Header - High Command */}
                    <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-12">
                        <div className="animate-fade-in">
                            <div className="inline-block px-4 py-1.5 border border-creative-lime/30 bg-creative-lime/5 rounded-full text-[10px] font-black uppercase tracking-[0.5em] mb-6 text-creative-lime animate-pulse">
                                LOGISTICS COMMAND CENTER
                            </div>
                            <h1 className="text-7xl lg:text-9xl font-black tracking-tighter leading-[0.8] italic uppercase">
                                INVENTORY<br />
                                <span className="text-creative-lime">MATRIX.</span>
                            </h1>
                        </div>
                        <div className="flex gap-4 w-full xl:w-auto">
                            <div className="flex-1 xl:flex-none">
                                <Button variant="outline" className="w-full text-[10px] py-6 px-12 border-white/10 hover:border-white/40">EXPORT TELEMETRY</Button>
                            </div>
                            <div className="flex-1 xl:flex-none">
                                <Button variant="primary" className="w-full text-[10px] py-6 px-12">+ INITIALIZE ITEM</Button>
                            </div>
                        </div>
                    </div>

                    {/* Operational Filters */}
                    <div className="flex flex-col lg:flex-row gap-8 items-center bg-white/5 p-6 rounded-[2.5rem] border border-white/5 backdrop-blur-3xl sticky top-8 z-40">
                        <div className="relative flex-1 w-full lg:w-auto">
                            <input
                                type="text"
                                placeholder="SEARCH ENTITY NAME..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-black border border-white/10 rounded-2xl py-5 px-8 text-xs font-black uppercase tracking-widest focus:border-creative-lime focus:ring-1 focus:ring-creative-lime transition-all outline-none"
                            />
                        </div>
                        <div className="flex gap-3 overflow-x-auto w-full lg:w-auto scrollbar-hide">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setFilter(cat)}
                                    className={`px-6 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-500 whitespace-nowrap ${filter === cat
                                        ? 'bg-creative-lime text-black'
                                        : 'bg-white/5 text-white/40 hover:bg-white/10'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Matrix Grid */}
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[...Array(6)].map((_, i) => (
                                <Card key={i} variant="glass" className="h-80 animate-pulse border-white/5" />
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredItems.map((item, index) => (
                                <Card
                                    key={item.id}
                                    variant="glass"
                                    className="group/card hover:border-creative-lime/50 transition-all duration-700 animate-slide-up"
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    <div className="flex flex-col h-full justify-between gap-12">
                                        <div className="flex justify-between items-start">
                                            <div className="text-4xl transition-transform group-hover/card:scale-125 duration-700">{item.icon}</div>
                                            <div className={`px-4 py-1.5 rounded-full text-[9px] font-black tracking-[0.2em] border transition-all ${getStatusColor(item.status) === 'text-creative-lime' ? 'border-creative-lime/30 bg-creative-lime/5' : 'border-red-500/30 bg-red-500/5'}`}>
                                                {item.status}
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="text-3xl font-black tracking-tighter italic uppercase mb-2 group-hover/card:text-creative-lime transition-colors">
                                                {item.name}
                                            </h3>
                                            <div className="flex items-center gap-4 text-[10px] font-black text-white/30 tracking-widest uppercase mb-8">
                                                <span>{item.category}</span>
                                                <div className="w-1 h-1 rounded-full bg-white/10" />
                                                <span>{item.location}</span>
                                            </div>

                                            <div className="space-y-4">
                                                <div className="flex justify-between items-end">
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-white/20">CURRENT LOAD</span>
                                                    <span className="text-2xl font-black italic">{item.quantity} {item.unit}</span>
                                                </div>
                                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full transition-all duration-1000 ${getStatusColor(item.status) === 'text-creative-lime' ? 'bg-creative-lime' : 'bg-red-500'}`}
                                                        style={{ width: `${Math.min((item.quantity / item.maxLevel) * 100, 100)}%` }}
                                                    />
                                                </div>
                                                <div className="flex justify-between text-[9px] font-black text-white/40 uppercase tracking-widest">
                                                    <span>MIN: {item.minLevel}</span>
                                                    <span>MAX: {item.maxLevel}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex gap-4">
                                            <Button size="sm" variant="primary" className="flex-1 text-[10px] py-4">ADJUST</Button>
                                            <Button size="sm" variant="outline" className="flex-1 text-[10px] py-4 border-white/10">INTEL</Button>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}

                    {!loading && filteredItems.length === 0 && (
                        <div className="text-center py-32 animate-fade-in">
                            <div className="text-6xl mb-8 opacity-20">📡</div>
                            <h3 className="text-3xl font-black italic uppercase tracking-tighter mb-4 text-white/60">No Signal Found</h3>
                            <p className="text-white/30 font-black uppercase tracking-widest text-[10px]">Adjust telemetry filters or re-initialize search query.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
