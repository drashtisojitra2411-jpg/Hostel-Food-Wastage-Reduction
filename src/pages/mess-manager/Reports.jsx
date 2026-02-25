import React from 'react';
import Navigation from '../../components/layout/Navigation';
import Card from '../../components/common/Card';
import MetricCard from '../../components/analytics/MetricCard';
import Button from '../../components/common/Button';

export default function Reports() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-creative-lime selection:text-black italic-typography">
            <Navigation />

            <main className="lg:ml-72 min-h-screen p-8 lg:p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-creative-purple/5 blur-[150px] rounded-full pointer-events-none" />

                <div className="max-w-7xl mx-auto relative z-10 space-y-16">
                    {/* Header - High Intel */}
                    <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-12">
                        <div className="animate-fade-in">
                            <div className="inline-block px-4 py-1.5 border border-creative-lime/30 bg-creative-lime/5 rounded-full text-[10px] font-black uppercase tracking-[0.5em] mb-6 text-creative-lime animate-pulse">
                                GLOBAL ANALYTICS SYSTEM
                            </div>
                            <h1 className="text-7xl lg:text-9xl font-black tracking-tighter leading-[0.8] italic uppercase">
                                INTEL<br />
                                <span className="text-creative-lime">REPORTS.</span>
                            </h1>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 w-full xl:w-auto">
                            <select className="bg-white/5 border border-white/10 rounded-2xl py-5 px-8 text-[10px] font-black uppercase tracking-widest focus:border-creative-lime outline-none cursor-pointer appearance-none min-w-[200px]">
                                <option>CYCLE: LAST 7 DAYS</option>
                                <option>CYCLE: LAST 30 DAYS</option>
                                <option>CYCLE: THIS MONTH</option>
                            </select>
                            <Button variant="primary" className="py-6 px-12 text-[10px]">EXPORT TELEMETRY</Button>
                        </div>
                    </div>

                    {/* Quick Metrics Matrix */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        <MetricCard title="TOTAL WASTAGE" value="340 KG" icon="🗑️" trend={-5.2} />
                        <MetricCard title="AVG BOOKING" value="845" icon="👥" trend={2.1} />
                        <MetricCard title="STOCK VALUE" value="₹4.5L" icon="💰" />
                        <MetricCard title="USER SENTIMENT" value="4.2/5" icon="⭐" trend={0.5} />
                    </div>

                    {/* Data Visualization Grid */}
                    <div className="grid lg:grid-cols-2 gap-8">
                        <Card variant="glass" className="p-10 border-white/5">
                            <div className="flex items-center justify-between mb-12">
                                <h3 className="text-2xl font-black tracking-tighter italic uppercase text-white/80">Wastage Analysis</h3>
                                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                            </div>
                            <div className="h-80 bg-white/5 border border-white/5 rounded-[2.5rem] flex flex-col items-center justify-center gap-6 group">
                                <div className="flex items-end gap-2 h-32">
                                    {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                                        <div
                                            key={i}
                                            className="w-4 bg-creative-lime/20 rounded-t-lg transition-all duration-700 group-hover:bg-creative-lime"
                                            style={{ height: `${h}%`, transitionDelay: `${i * 100}ms` }}
                                        />
                                    ))}
                                </div>
                                <p className="text-[10px] font-black text-white/20 tracking-[0.3em] uppercase italic">Visualizing Resource Deviation</p>
                            </div>
                        </Card>
                        <Card variant="glass" className="p-10 border-white/5">
                            <div className="flex items-center justify-between mb-12">
                                <h3 className="text-2xl font-black tracking-tighter italic uppercase text-white/80">Cost Efficiency</h3>
                                <div className="w-2 h-2 rounded-full bg-creative-lime animate-pulse" />
                            </div>
                            <div className="h-80 bg-white/5 border border-white/5 rounded-[2.5rem] flex flex-col items-center justify-center gap-6 group">
                                <div className="relative w-40 h-40 flex items-center justify-center">
                                    <svg className="w-full h-full -rotate-90">
                                        <circle cx="80" cy="80" r="70" className="stroke-white/5 fill-none stroke-[12]" />
                                        <circle cx="80" cy="80" r="70" className="stroke-creative-lime fill-none stroke-[12] transition-all duration-1000 group-hover:stroke-creative-purple" strokeDasharray="440" strokeDashoffset="110" />
                                    </svg>
                                    <span className="absolute text-3xl font-black italic">92%</span>
                                </div>
                                <p className="text-[10px] font-black text-white/20 tracking-[0.3em] uppercase italic">Operational Efficiency Index</p>
                            </div>
                        </Card>
                    </div>

                    {/* Detailed Intel Log */}
                    <Card variant="premium" className="border-white/5 p-0 overflow-hidden">
                        <div className="p-10 border-b border-white/5">
                            <h3 className="text-3xl font-black tracking-tighter italic uppercase text-white/80">Raw Telemetry Data</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-white/5 text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">
                                    <tr>
                                        <th className="py-8 px-10">Temporal Record</th>
                                        <th className="py-8 px-10">Load Prepared</th>
                                        <th className="py-8 px-10">Load Consumed</th>
                                        <th className="py-8 px-10">Deviation (KG)</th>
                                        <th className="py-8 px-10">Process Efficiency</th>
                                        <th className="py-8 px-10 text-right">Operational Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {[1, 2, 3, 4, 5].map(i => (
                                        <tr key={i} className="group hover:bg-white/5 transition-colors">
                                            <td className="py-8 px-10 text-xs font-black tracking-widest text-white/60">2024.04.0{i}</td>
                                            <td className="py-8 px-10 text-lg font-black italic">450 <span className="text-[10px] text-white/20">UNIT</span></td>
                                            <td className="py-8 px-10 text-lg font-black italic">410 <span className="text-[10px] text-white/20">UNIT</span></td>
                                            <td className="py-8 px-10 text-lg font-black italic text-red-500">12.5 <span className="text-[10px] text-white/20">KG</span></td>
                                            <td className="py-8 px-10">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                        <div className="h-full bg-creative-lime w-[91%]" />
                                                    </div>
                                                    <span className="text-xs font-black italic">91%</span>
                                                </div>
                                            </td>
                                            <td className="py-8 px-10 text-right">
                                                <span className="px-4 py-1.5 rounded-full border border-creative-lime/30 bg-creative-lime/5 text-creative-lime text-[9px] font-black tracking-widest uppercase">NOMINAL</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>
            </main>
        </div>
    );
}
