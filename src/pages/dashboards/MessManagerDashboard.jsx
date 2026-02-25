import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Navigation from '../../components/layout/Navigation'
import Card from '../../components/common/Card'
import Button from '../../components/common/Button'
import WeeklyMenu from '../../components/common/WeeklyMenu'
import WastagePieChart from '../../components/analytics/WastagePieChart'
import WastageBarChart from '../../components/analytics/WastageBarChart'
import WastageTrendChart from '../../components/analytics/WastageTrendChart'
import ProgressRing from '../../components/analytics/ProgressRing'

export default function MessManagerDashboard() {
    const { profile, signOut } = useAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
        if (window.confirm('Are you sure you want to terminate the current session?')) {
            await signOut()
            navigate('/login', { replace: true })
        }
    }

    const goHome = () => {
        navigate('/', { replace: true })
    }

    const [stats] = useState({
        totalBookings: 856,
        expectedAttendance: 780,
        lowStockItems: 5,
        todayWastage: 12.5
    })

    const barData = [
        { day: 'Mon', amount: 12 },
        { day: 'Tue', amount: 15 },
        { day: 'Wed', amount: 8 },
        { day: 'Thu', amount: 10 },
        { day: 'Fri', amount: 18 },
        { day: 'Sat', amount: 14 },
        { day: 'Sun', amount: 9 },
    ];

    const trendData = [
        { name: 'Week 1', value: 140 },
        { name: 'Week 2', value: 120 },
        { name: 'Week 3', value: 110 },
        { name: 'Week 4', value: 80 },
    ];

    const [alerts] = useState([
        { id: 1, type: 'warning', message: 'MILK STOCK CRITICAL', time: '10M AGO' },
        { id: 2, type: 'danger', message: 'INVENTORY EXPIRY ALERT', time: '01H AGO' },
        { id: 3, type: 'info', message: 'DONATION BATCH READY', time: '02H AGO' }
    ])

    const quickActions = [
        { icon: '📝', label: 'LOG WASTE', path: '/mess-manager/wastage/log' },
        { icon: '📦', label: 'INVENTORY', path: '/mess-manager/inventory' },
        { icon: '🍲', label: 'PROVISIONS', path: '/mess-manager/menu' },
        { icon: '📊', label: 'ANALYTICS', path: '/mess-manager/reports' }
    ]

    return (
        <div className="min-h-screen bg-black text-white selection:bg-creative-lime selection:text-black overflow-x-hidden">
            <Navigation />

            <main className="lg:ml-72 min-h-screen p-8 lg:p-12 relative">
                {/* Visual Background Polish */}
                <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-creative-purple/5 blur-[150px] rounded-full pointer-events-none" />

                {/* Header - Industrial Display Typography */}
                <header className="mb-16 animate-fade-in relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="flex-1">
                        <div className="inline-block px-4 py-1.5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.4em] mb-6 text-creative-purple">
                            Command Console: Active
                        </div>
                        <h1 className="text-6xl lg:text-8xl font-black tracking-tighter leading-[0.85] italic">
                            OPERATIONAL<br />
                            <span className="text-creative-purple">LOGISTICS.</span>
                        </h1>
                    </div>
                    <div className="flex flex-col items-start md:items-end gap-6">
                        <div className="flex gap-4">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={goHome}
                                className="border-white/10 text-white/60 hover:text-white"
                            >
                                🏠 HOME
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleLogout}
                                className="border-red-500/30 text-red-500/60 hover:text-red-500 hover:bg-red-500/10"
                            >
                                🚪 LOGOUT
                            </Button>
                        </div>
                        <div className="text-right">
                            <span className="block text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-2">Facility Manager</span>
                            <span className="text-2xl font-black italic">{profile?.full_name?.toUpperCase() || 'OFFICER'}</span>
                        </div>
                    </div>
                </header>

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8 relative z-10">

                    {/* Key Metrics Bento row */}
                    {[
                        { label: 'PROVISIONS SECURED', value: stats.totalBookings, icon: '📋', color: 'text-creative-lime' },
                        { label: 'EXPECTED UNITS', value: stats.expectedAttendance, icon: '👥', color: 'text-white' },
                        { label: 'STOCK CRITICAL', value: stats.lowStockItems, icon: '⚠️', color: 'text-red-500' },
                        { label: 'WASTE MEASURED', value: `${stats.todayWastage}KG`, icon: '🗑️', color: 'text-creative-purple' }
                    ].map((stat, i) => (
                        <Card key={i} variant="glass" className="group/stat">
                            <div className="flex flex-col h-full justify-between">
                                <div className="text-3xl mb-4 transition-transform group-hover/stat:scale-125 duration-500">{stat.icon}</div>
                                <div>
                                    <h3 className={`text-5xl font-black tracking-tighter mb-1 ${stat.color}`}>{stat.value}</h3>
                                    <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">{stat.label}</p>
                                </div>
                            </div>
                        </Card>
                    ))}

                    {/* Quick Action Grid - High Energy */}
                    <div className="lg:col-span-1 grid grid-cols-2 gap-4">
                        {quickActions.map((action) => (
                            <Link key={action.label} to={action.path} className="group/action">
                                <Card variant="glass" className="h-full p-6 hover:bg-white/10 transition-colors flex flex-col items-center justify-center text-center gap-3 border-white/5">
                                    <span className="text-3xl transition-transform group-hover/action:scale-125 duration-300">{action.icon}</span>
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">{action.label}</span>
                                </Card>
                            </Link>
                        ))}
                    </div>

                    {/* Analytics Main - High Tech Charts */}
                    <div className="lg:col-span-3">
                        <Card variant="glass" className="p-10">
                            <div className="flex justify-between items-center mb-10">
                                <div>
                                    <h2 className="text-3xl font-black tracking-tighter italic uppercase">Flux Analysis</h2>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-white/30">Temporal Wastage Patterns</p>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-3 h-3 rounded-full bg-creative-lime animate-pulse"></div>
                                    <div className="w-3 h-3 rounded-full bg-creative-purple animate-pulse delay-75"></div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <WastageBarChart data={barData} />
                                <WastageTrendChart data={trendData} />
                            </div>
                        </Card>
                    </div>

                    {/* Weekly Menu */}
                    <div className="lg:col-span-2">
                        <WeeklyMenu compact />
                    </div>

                    {/* Alerts & Notifications - High Drama */}
                    <div className="lg:col-span-2">
                        <Card variant="glass" className="h-full border-l-4 border-l-red-500/50">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-black tracking-tighter italic uppercase">Priority Alerts</h2>
                                <span className="px-3 py-1 bg-red-500/20 text-red-500 text-[10px] font-black rounded-full border border-red-500/30 animate-pulse">
                                    CRITICAL
                                </span>
                            </div>
                            <div className="space-y-4">
                                {alerts.map((alert) => (
                                    <div key={alert.id} className="flex items-center gap-6 p-6 rounded-2xl bg-white/5 border border-white/5 group hover:bg-white/10 transition-all">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl bg-black/40 border border-white/10 group-hover:border-white/30`}>
                                            {alert.type === 'danger' ? '🚨' : alert.type === 'warning' ? '⚠️' : 'ℹ️'}
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-black text-sm tracking-tight text-white group-hover:text-creative-lime transition-colors">{alert.message}</p>
                                            <p className="text-[10px] font-black text-white/20 mt-1 uppercase tracking-widest">{alert.time}</p>
                                        </div>
                                        <button className="p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>

                    {/* Operational Targets - Progress Circles */}
                    <div className="lg:col-span-2">
                        <Card variant="premium" className="h-full flex flex-col justify-between">
                            <h2 className="text-2xl font-black tracking-tighter italic uppercase mb-8">Efficiency Metrics</h2>
                            <div className="flex flex-col md:flex-row justify-around items-center gap-12 py-6">
                                <div className="relative group flex flex-col items-center">
                                    <ProgressRing progress={75} size={160} color="#a3e635" />
                                    <div className="mt-6 text-center">
                                        <span className="block text-3xl font-black tracking-tighter">75%</span>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-white/30">Goal Attainment</span>
                                    </div>
                                </div>
                                <div className="relative group flex flex-col items-center">
                                    <ProgressRing progress={45} size={130} color="#8b5cf6" />
                                    <div className="mt-6 text-center">
                                        <span className="block text-2xl font-black tracking-tighter">45%</span>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-white/30">Waste Reduction</span>
                                    </div>
                                </div>
                            </div>
                            <Button variant="ghost" className="w-full mt-8 border border-white/10">EXECUTE SYSTEM REPORT</Button>
                        </Card>
                    </div>

                </div>
            </main>
        </div>
    )
}
