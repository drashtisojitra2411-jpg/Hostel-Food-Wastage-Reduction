import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Navigation from '../../components/layout/Navigation'
import Card from '../../components/common/Card'
import Button from '../../components/common/Button'
import WeeklyMenu from '../../components/common/WeeklyMenu'

export default function StudentDashboard() {
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
    const [greeting, setGreeting] = useState('')
    const [selectedPreference, setSelectedPreference] = useState(null)

    const [stats] = useState({
        mealsBooked: 12,
        wastesPrevented: 2.5,
        sustainabilityScore: 85,
        donations: 3
    })

    const [activities] = useState([
        { id: 1, title: 'LUNCH AUTHORIZED', time: '02H AGO', icon: '🍱', type: 'SUCCESS' },
        { id: 2, title: 'WASTE MITIGATED', time: 'YESTERDAY', icon: '♻️', type: 'INFO' },
        { id: 3, title: 'HATCHERY UPDATE', time: '02D AGO', icon: '🤝', type: 'PURPLE' }
    ])

    const [leaderboard] = useState([
        { id: 1, name: 'RAHUL K.', points: 1250, badge: 'PLATINUM' },
        { id: 2, name: 'YOU', points: 1100, badge: 'ELITE' },
        { id: 3, name: 'PRIYA S.', points: 980, badge: 'GOLD' },
    ])

    useEffect(() => {
        const hour = new Date().getHours()
        if (hour < 12) setGreeting('MORNING')
        else if (hour < 18) setGreeting('AFTERNOON')
        else setGreeting('EVENING')
    }, [])

    return (
        <div className="min-h-screen bg-black text-white selection:bg-creative-lime selection:text-black overflow-x-hidden">
            <Navigation />

            <main className="lg:ml-72 min-h-screen p-8 lg:p-12 relative">
                {/* Visual Polish */}
                <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-creative-lime/5 blur-[120px] rounded-full pointer-events-none" />

                {/* Header Section - High Impact */}
                <header className="mb-16 animate-fade-in relative z-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div className="flex-1">
                            <div className="inline-block px-4 py-1.5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.4em] mb-6 text-creative-lime">
                                System Status: Operational
                            </div>
                            <h1 className="text-6xl lg:text-8xl font-black tracking-tighter leading-[0.85] italic">
                                GOOD {greeting},<br />
                                <span className="text-creative-lime">{profile?.full_name?.split(' ')[0].toUpperCase() || 'OPERATOR'}</span>.
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
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-2">Impact Tier</span>
                                <span className="text-4xl font-black italic text-white flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-creative-lime animate-pulse"></div>
                                    VANGUARD
                                </span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8 relative z-10">

                    {/* Primary Stats - High Contrast Bento */}
                    <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { label: 'MEALS SECURED', value: stats.mealsBooked, icon: '🍱', color: 'text-creative-lime' },
                            { label: 'WASTE (KG)', value: stats.wastesPrevented, icon: '⚡', color: 'text-white' },
                            { label: 'EFFICIENCY', value: `${stats.sustainabilityScore}%`, icon: '📊', color: 'text-creative-lime' },
                            { label: 'CONTRIBUTIONS', value: stats.donations, icon: '💎', color: 'text-creative-purple' }
                        ].map((stat, i) => (
                            <Card key={i} variant="glass" className="group/stat">
                                <div className="flex flex-col h-full justify-between">
                                    <div className={`text-3xl mb-4 transition-transform group-hover/stat:scale-125 duration-500`}>
                                        {stat.icon}
                                    </div>
                                    <div>
                                        <h3 className={`text-4xl font-black tracking-tighter mb-1 ${stat.color}`}>{stat.value}</h3>
                                        <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">{stat.label}</p>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>

                    {/* Quick Link / CTA Card */}
                    <Card variant="premium" className="lg:row-span-2 flex flex-col justify-between border-creative-lime/20 overflow-hidden group/cta">
                        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-creative-lime/20 rounded-full blur-3xl opacity-0 group-hover/cta:opacity-100 transition-opacity duration-700" />
                        <div>
                            <h2 className="text-3xl font-black tracking-tighter italic leading-none mb-6">SECURE NEXT<br />PROVISION.</h2>
                            <p className="text-sm text-white/40 font-medium mb-8">Maintain system homeostasis. Confirm requirements for the next 24H cycle.</p>
                        </div>
                        <Button to="/meal-booking" size="lg" className="w-full">
                            BOOK PORTAL →
                        </Button>
                    </Card>

                    {/* Large Content - Interactive Prefs */}
                    <div className="lg:col-span-3">
                        <Card variant="glass" className="p-10">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
                                <div>
                                    <h2 className="text-4xl font-black tracking-tighter italic uppercase mb-2">Nutritional Intent</h2>
                                    <p className="text-white/40 font-medium">Synchronize your preference with the central provisioning unit.</p>
                                </div>
                                <div className="px-6 py-3 bg-white/5 rounded-2xl border border-white/5">
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-creative-lime flex items-center gap-3">
                                        <span className="w-2 h-2 rounded-full bg-creative-lime animate-ping"></span>
                                        Real-time Sync
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {[
                                    { id: 'veg', label: 'VEG STANDARD', icon: '🥦', desc: 'Plant-based optimization.' },
                                    { id: 'jain', label: 'JAIN PROTOCOL', icon: '🥕', desc: 'Strict root-free guidelines.' },
                                    { id: 'egg', label: 'EGG REINFORCED', icon: '🥚', desc: 'Enhanced protein load.' }
                                ].map((pref) => (
                                    <button
                                        key={pref.id}
                                        onClick={() => setSelectedPreference(pref.id)}
                                        className={`p-8 rounded-[2rem] border-2 text-left transition-all duration-500 group relative overflow-hidden ${selectedPreference === pref.id
                                            ? 'border-creative-lime bg-creative-lime/10 shadow-[0_0_40px_rgba(163,230,53,0.1)]'
                                            : 'border-white/5 hover:border-white/20 hover:bg-white/5'}`}
                                    >
                                        <div className="flex justify-between items-start mb-6">
                                            <span className={`text-4xl transition-transform duration-500 ${selectedPreference === pref.id ? 'scale-125' : 'group-hover:scale-110'}`}>
                                                {pref.icon}
                                            </span>
                                            {selectedPreference === pref.id && (
                                                <div className="w-3 h-3 rounded-full bg-creative-lime shadow-[0_0_15px_rgba(163,230,53,1)]"></div>
                                            )}
                                        </div>
                                        <h3 className="text-xl font-black tracking-tight mb-2 uppercase italic">{pref.label}</h3>
                                        <p className="text-xs text-white/30 font-medium uppercase tracking-widest">{pref.desc}</p>
                                    </button>
                                ))}
                            </div>
                        </Card>
                    </div>

                    {/* Side Column - Journey & Leaderboard */}
                    <div className="lg:col-span-2 space-y-6">
                        <WeeklyMenu compact />
                        <Card variant="glass" className="h-full">
                            <div className="flex justify-between items-center mb-10">
                                <h2 className="text-2xl font-black tracking-tighter italic uppercase underline decoration-creative-lime/30 underline-offset-8">Mission Logs</h2>
                                <Link to="/history" className="text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors">ARCHIVES +</Link>
                            </div>
                            <div className="space-y-8">
                                {activities.map((activity) => (
                                    <div key={activity.id} className="group relative flex items-center gap-6">
                                        <div className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl transition-all group-hover:bg-creative-lime group-hover:text-creative-dark group-hover:scale-110 group-hover:rotate-6`}>
                                            {activity.icon}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-black text-sm tracking-tight text-white group-hover:text-creative-lime transition-colors">{activity.title}</h4>
                                            <p className="text-[10px] font-black text-white/20 mt-1 uppercase tracking-widest">{activity.time}</p>
                                        </div>
                                        <div className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-creative-lime transition-colors"></div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>

                    {/* Gamification - Hero Leaderboard */}
                    <div className="lg:col-span-2">
                        <Card variant="premium" className="h-full bg-gradient-to-br from-creative-purple to-black border-white/5">
                            <div className="flex items-center gap-4 mb-10">
                                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-2xl">🏆</div>
                                <div>
                                    <h2 className="text-2xl font-black tracking-tighter italic uppercase leading-none">Vanguard Elite</h2>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mt-1">Operational Ranking</p>
                                </div>
                            </div>

                            <div className="space-y-4 mb-10">
                                {leaderboard.map((u, i) => (
                                    <div key={u.id} className={`flex items-center justify-between p-6 rounded-2xl transition-all ${u.name === 'YOU' ? 'bg-white/10 border border-white/10 scale-105 shadow-xl' : 'bg-white/5 opacity-50 hover:opacity-100'}`}>
                                        <div className="flex items-center gap-4">
                                            <span className="text-xl font-black italic text-white/20 w-8">{i + 1}</span>
                                            <div>
                                                <p className="font-black text-sm tracking-tight">{u.name}</p>
                                                <p className="text-[10px] font-black text-creative-lime tracking-widest mt-1">{u.badge}</p>
                                            </div>
                                        </div>
                                        <span className="text-2xl font-black italic tracking-tighter">{u.points}</span>
                                    </div>
                                ))}
                            </div>

                            <Button variant="ghost" className="w-full border border-white/10">FULL LEADERBOARD ANALYTICS</Button>
                        </Card>
                    </div>

                </div>
            </main>
        </div>
    )
}

