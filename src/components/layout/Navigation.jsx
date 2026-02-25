import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Navigation() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const { profile, role, isMessManager, isSuperAdmin, signOut } = useAuth()
    const location = useLocation()

    const studentLinks = [
        { path: '/dashboard', icon: '🏠', label: 'DASHBOARD' },
        { path: '/meal-booking', icon: '🍽️', label: 'MEAL PORTAL' },
        { path: '/meal-selection', icon: '🗳️', label: 'MEAL SELECT' },
        { path: '/history', icon: '📅', label: 'HISTORY' },
        { path: '/impact', icon: '🌱', label: 'MY IMPACT' },
        { path: '/settings', icon: '👤', label: 'PROFILE' }
    ]

    const messManagerLinks = [
        { path: '/mess-manager', icon: '🏠', label: 'COMMAND' },
        { path: '/mess-manager/inventory', icon: '📦', label: 'INVENTORY' },
        { path: '/mess-manager/menu', icon: '📋', label: 'PROVISIONS' },
        { path: '/meal-selection', icon: '🗳️', label: 'WEEK MENU' },
        { path: '/mess-manager/wastage/log', icon: '📝', label: 'WASTE LOG' },
        { path: '/mess-manager/donations', icon: '💝', label: 'OUTREACH' },
        { path: '/mess-manager/reports', icon: '📊', label: 'ANALYTICS' }
    ]

    const adminLinks = [
        { path: '/admin', icon: '🏠', label: 'CONSOLE' },
        { path: '/admin/users', icon: '👥', label: 'PERSONNEL' },
        { path: '/admin/hostels', icon: '🏢', label: 'ENTITIES' },
        { path: '/meal-selection', icon: '🗳️', label: 'WEEK MENU' },
        { path: '/admin/inventory', icon: '📦', label: 'STOCK' },
        { path: '/admin/analytics', icon: '📊', label: 'METRICS' },
        { path: '/admin/donations', icon: '💝', label: 'HATCHERY' },
        { path: '/admin/settings', icon: '⚙️', label: 'SYSTEM' }
    ]

    const getLinks = () => {
        if (isSuperAdmin()) return adminLinks
        if (isMessManager()) return messManagerLinks
        return studentLinks
    }

    const links = getLinks()

    return (
        <>
            {/* Mobile Header - High Glass */}
            <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/5">
                <div className="flex items-center justify-between px-6 py-4">
                    <Link to="/" className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-creative-lime flex items-center justify-center text-creative-dark">
                            <span className="text-xl font-black">🌱</span>
                        </div>
                        <span className="font-display font-black text-2xl tracking-tighter text-white">ZeroBite<span className="text-creative-lime">.</span></span>
                    </Link>
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="p-3 rounded-2xl bg-white/5 text-white active:scale-90 transition-transform"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {isMobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Backdrop */}
            {isMobileMenuOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-40 transition-opacity"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar - Premium Revolutionary Theme */}
            <aside className={`fixed top-0 left-0 h-full w-72 bg-black border-r border-white/5 z-50 transition-all duration-500 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                }`}>
                <div className="flex flex-col h-full bg-gradient-to-b from-creative-purple/5 to-transparent">
                    {/* Brand */}
                    <div className="p-10">
                        <Link to="/" className="flex items-center gap-4 group/brand">
                            <div className="w-12 h-12 rounded-[1.25rem] bg-creative-lime flex items-center justify-center text-creative-dark shadow-[0_0_20px_rgba(163,230,53,0.3)] transition-all group-hover/brand:scale-110 group-hover/brand:rotate-12">
                                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <div>
                                <span className="text-2xl font-black text-white tracking-widest font-display">ZeroBite</span>
                                <div className="flex items-center gap-2 mt-1">
                                    <div className="w-1.5 h-1.5 rounded-full bg-creative-lime animate-pulse"></div>
                                    <p className="text-[10px] font-black text-creative-lime uppercase tracking-[0.3em]">{role || 'Operational'}</p>
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* Navigation - High Energy Links */}
                    <nav className="flex-1 px-4 py-6 overflow-y-auto scrollbar-hide">
                        <ul className="space-y-2">
                            {links.map((link) => {
                                const isActive = location.pathname === link.path ||
                                    (link.path !== '/' && location.pathname.startsWith(link.path))

                                return (
                                    <li key={link.path}>
                                        <Link
                                            to={link.path}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={`group/nav relative flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 ${isActive
                                                ? 'bg-white/5 text-white ring-1 ring-white/10'
                                                : 'text-white/40 hover:text-white hover:bg-white/5'
                                                }`}
                                        >
                                            {isActive && (
                                                <div className="absolute left-0 w-1.5 h-8 bg-creative-lime rounded-r-full shadow-[0_0_15px_rgba(163,230,53,0.8)]"></div>
                                            )}
                                            <span className={`text-2xl transition-transform group-hover/nav:scale-110 ${isActive ? 'scale-110' : 'opacity-40 grayscale'} group-hover/nav:grayscale-0 group-hover/nav:opacity-100`}>
                                                {link.icon}
                                            </span>
                                            <span className="text-xs font-black uppercase tracking-[0.2em]">{link.label}</span>

                                            {isActive && (
                                                <div className="ml-auto animate-pulse">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-creative-lime shadow-[0_0_10px_rgba(163,230,53,0.8)]"></div>
                                                </div>
                                            )}
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </nav>

                    {/* Global Logout & Profile */}
                    <div className="p-6 border-t border-white/5 space-y-4">
                        <div className="flex items-center gap-4 p-4 rounded-3xl bg-white/5 border border-white/5 group/profile cursor-pointer">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-creative-purple to-creative-lime p-[1px]">
                                <div className="w-full h-full rounded-[14px] bg-black flex items-center justify-center text-white font-black text-xl">
                                    {profile?.full_name?.[0] || 'U'}
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-black text-sm text-white truncate tracking-tight">{profile?.full_name || 'Personnel'}</p>
                                <p className="text-[10px] text-white/30 truncate uppercase tracking-widest">{profile?.email?.split('@')[0]}</p>
                            </div>
                        </div>

                        <button
                            onClick={signOut}
                            className="w-full py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/20"
                        >
                            Decommission Session
                        </button>
                    </div>
                </div>
            </aside>
        </>
    )
}
