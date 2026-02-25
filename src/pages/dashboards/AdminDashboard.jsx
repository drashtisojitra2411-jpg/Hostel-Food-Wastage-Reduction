import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Navigation from '../../components/layout/Navigation'
import Card from '../../components/common/Card'
import Button from '../../components/common/Button'
import WeeklyMenu from '../../components/common/WeeklyMenu'
import { fetchLatestFeedback } from '../../utils/feedback'

export default function AdminDashboard() {
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
        totalUsers: 2456,
        activeHostels: 4,
        monthlyWastage: 450,
        costSaved: 125000,
        donationsCompleted: 45,
        sustainabilityScore: 78
    })

    const [hostels] = useState([
        { name: 'HOSTEL ALPHA', students: 245, wastage: 12.5, score: 85 },
        { name: 'HOSTEL BETA', students: 312, wastage: 18.2, score: 72 },
        { name: 'HOSTEL GAMMA', students: 198, wastage: 8.5, score: 92 },
        { name: 'HOSTEL DELTA', students: 178, wastage: 10.8, score: 88 }
    ])

    const quickActions = [
        { icon: '👥', label: 'USER DIRECTORY', path: '/admin/users' },
        { icon: '🏠', label: 'SECTOR INTEL', path: '/admin/hostels' },
        { icon: '📊', label: 'DATA STACK', path: '/admin/analytics' },
        { icon: '📦', label: 'SUPPLY CHAIN', path: '/admin/inventory' },
        { icon: '💝', label: 'REVENUE SYNC', path: '/admin/donations' },
        { icon: '⚙️', label: 'CORE SETTINGS', path: '/admin/settings' }
    ]

    const [recentFeedback, setRecentFeedback] = useState([])
    const [loadingFeedback, setLoadingFeedback] = useState(true)

    useEffect(() => {
        const loadFeedback = async () => {
            const result = await fetchLatestFeedback(5)
            if (result.success) {
                setRecentFeedback(result.data)
            }
            setLoadingFeedback(false)
        }
        loadFeedback()
    }, [])

    return (
        <div className="min-h-screen bg-black text-white selection:bg-creative-lime selection:text-black overflow-x-hidden">
            <Navigation />

            <main className="lg:ml-72 min-h-screen p-8 lg:p-12 relative">
                {/* Tactical Backdrop */}
                <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(163,230,53,0.03)_0%,transparent_70%)] pointer-events-none" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />

                {/* Header - High-Command Display */}
                <header className="mb-20 animate-fade-in relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-12">
                    <div className="flex-1">
                        <div className="inline-block px-4 py-1.5 border border-creative-lime/30 bg-creative-lime/5 rounded-full text-[10px] font-black uppercase tracking-[0.5em] mb-6 text-creative-lime animate-pulse">
                            AUTHENTICATED: SYSTEM OVERLORD
                        </div>
                        <h1 className="text-7xl lg:text-9xl font-black tracking-tighter leading-[0.8] italic uppercase">
                            GLOBAL<br />
                            <span className="text-creative-lime">COMMAND.</span>
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
                        <div className="flex flex-col items-start md:items-end">
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-2">Operator ID</span>
                            <span className="text-3xl font-black italic">{profile?.full_name?.toUpperCase() || 'ROOT_ADMIN'}</span>
                        </div>
                    </div>
                </header>

                {/* Primary Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6 lg:gap-8 mb-16 stagger-children relative z-10">
                    {[
                        { label: 'TOTAL ENTITIES', value: stats.totalUsers.toLocaleString(), color: 'text-white' },
                        { label: 'ACTIVE SECTORS', value: stats.activeHostels, color: 'text-creative-lime' },
                        { label: 'WASTE FLUX', value: `${stats.monthlyWastage}KG`, color: 'text-red-500' },
                        { label: 'VALUATION SYNC', value: `₹${(stats.costSaved / 1000).toFixed(0)}K`, color: 'text-creative-lime' },
                        { label: 'MATCHED DEPLOY', value: stats.donationsCompleted, color: 'text-creative-purple' },
                        { label: 'NET EFFICIENCY', value: `${stats.sustainabilityScore}%`, color: 'text-white' }
                    ].map((stat, i) => (
                        <Card key={i} variant="glass" className="p-8 group/stat hover:border-creative-lime/50 transition-all duration-700">
                            <h3 className={`text-4xl font-black tracking-tighter mb-2 ${stat.color}`}>{stat.value}</h3>
                            <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em]">{stat.label}</p>
                        </Card>
                    ))}
                </div>

                {/* Sector Access & Intel Matrix */}
                <div className="grid lg:grid-cols-3 gap-8 relative z-10 mb-16">

                    {/* Access Layer - Quick Actions */}
                    <div className="lg:col-span-1">
                        <Card variant="premium" className="h-full border-white/5 overflow-hidden">
                            <h2 className="text-2xl font-black tracking-tighter italic uppercase mb-10 underline decoration-creative-lime underline-offset-8">Access Layer</h2>
                            <div className="grid grid-cols-2 gap-4">
                                {quickActions.map((action) => (
                                    <Link key={action.label} to={action.path} className="group/action">
                                        <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-creative-lime hover:text-black transition-all duration-500 flex flex-col items-center gap-3">
                                            <span className="text-3xl transition-transform group-hover/action:scale-110">{action.icon}</span>
                                            <span className="text-[9px] font-black uppercase tracking-widest text-center">{action.label}</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </Card>
                    </div>

                    {/* Sector Performance Matrix */}
                    <div className="lg:col-span-2">
                        <Card variant="glass" className="h-full border-white/5 backdrop-blur-3xl">
                            <div className="flex justify-between items-center mb-10">
                                <h2 className="text-2xl font-black tracking-tighter italic uppercase">Sector Intel Matrix</h2>
                                <div className="px-4 py-2 bg-white/5 rounded-xl border border-white/5">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Real-time Telemetry</span>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b border-white/5">
                                            <th className="pb-6 text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Sector</th>
                                            <th className="pb-6 text-[10px] font-black uppercase tracking-[0.3em] text-white/30 text-center">Load</th>
                                            <th className="pb-6 text-[10px] font-black uppercase tracking-[0.3em] text-white/30 text-center">Wastage</th>
                                            <th className="pb-6 text-[10px] font-black uppercase tracking-[0.3em] text-white/30 text-right">Coefficient</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {hostels.map((h) => (
                                            <tr key={h.name} className="group hover:bg-white/5 transition-colors">
                                                <td className="py-6 font-black italic tracking-tight text-white group-hover:text-creative-lime transition-colors">{h.name}</td>
                                                <td className="py-6 text-center text-sm font-medium text-white/60">{h.students}u</td>
                                                <td className="py-6 text-center text-sm font-black text-red-500/80 italic">{h.wastage}kg</td>
                                                <td className="py-6 text-right">
                                                    <div className="inline-flex items-center gap-4">
                                                        <div className="w-20 h-1 bg-white/5 rounded-full overflow-hidden">
                                                            <div className="h-full bg-creative-lime shadow-[0_0_10px_rgba(163,230,53,0.5)] transition-all duration-1000" style={{ width: `${h.score}%` }} />
                                                        </div>
                                                        <span className="text-xs font-black italic">{h.score}%</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    </div>

                </div>

                {/* Weekly Menu */}
                <div className="relative z-10 mb-16">
                    <WeeklyMenu />
                </div>

                {/* Feedback Intel & Subsystem Visualizations */}
                <div className="grid lg:grid-cols-2 gap-8 relative z-10">
                    {/* Feedback Intel */}
                    <Card variant="glass" className="border-white/5 group overflow-hidden p-8">
                        <div className="flex justify-between items-center mb-10">
                            <h2 className="text-2xl font-black tracking-tighter italic uppercase underline decoration-creative-lime underline-offset-8">Feedback Intel</h2>
                            <Link to="/admin/feedback" className="text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors">FULL ARCHIVE +</Link>
                        </div>

                        {loadingFeedback ? (
                            <div className="flex flex-col items-center justify-center py-12 animate-pulse">
                                <div className="w-12 h-12 border-2 border-creative-lime/20 border-t-creative-lime rounded-full animate-spin mb-4" />
                                <span className="text-[8px] font-black uppercase tracking-[0.3em] text-white/20">Syncing Intelligence...</span>
                            </div>
                        ) : recentFeedback.length === 0 ? (
                            <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-3xl">
                                <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">No feedback submitted yet</p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {recentFeedback.map((fb) => (
                                    <div key={fb.id} className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all group/fb">
                                        <div className="flex justify-between items-start mb-3">
                                            <div>
                                                <h4 className="font-black text-[10px] tracking-widest text-white uppercase">{fb.user_profiles?.full_name || 'ANONYMOUS'}</h4>
                                                <p className="text-[8px] font-black text-creative-lime uppercase tracking-widest mt-1">{fb.day} • {fb.meal_type}</p>
                                            </div>
                                            <div className="flex gap-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <div key={i} className={`w-1.5 h-1.5 rounded-full ${i < fb.rating ? 'bg-creative-lime' : 'bg-white/10'}`} />
                                                ))}
                                            </div>
                                        </div>
                                        {fb.comment && (
                                            <p className="text-[11px] text-white/60 font-medium leading-relaxed italic line-clamp-2">
                                                "{fb.comment}"
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </Card>

                    <Card variant="glass" className="h-full min-h-[400px] flex flex-col items-center justify-center border-white/5 group overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-creative-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        <div className="relative text-center">
                            <div className="grid grid-cols-4 gap-2 mb-6">
                                {[...Array(8)].map((_, i) => (
                                    <div key={i} className={`w-3 h-3 rounded-full bg-creative-purple/30 animate-pulse`} style={{ animationDelay: `${i * 100}ms` }} />
                                ))}
                            </div>
                            <h3 className="text-xl font-black italic uppercase tracking-tighter mb-2">Analyzing Social Impact</h3>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Deploying donation vectors...</p>
                        </div>
                    </Card>
                </div>

                <div className="mt-16 flex justify-end relative z-10">
                    <Button
                        variant="ghost"
                        className="opacity-30 hover:opacity-100 transition-opacity text-red-500"
                        onClick={handleLogout}
                    >
                        TERMINATE SESSION (SIGNOUT)
                    </Button>
                </div>
            </main>
        </div>
    )
}
