import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import Button from '../../components/common/Button'
import Card from '../../components/common/Card'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { signIn } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    const from = location.state?.from?.pathname || '/dashboard'

    async function handleSubmit(e) {
        e.preventDefault()
        setError('')

        // JavaScript Validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!email.trim()) {
            return setError('Email is required')
        }
        if (!emailRegex.test(email)) {
            return setError('Please enter a valid email address')
        }
        if (!password.trim()) {
            return setError('Password is required')
        }
        if (password.length < 6) {
            return setError('Password must be at least 6 characters long')
        }

        setLoading(true)

        try {
            await signIn({ email, password })
            navigate(from, { replace: true })
        } catch (err) {
            setError(err.message || 'Failed to sign in')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-black text-white selection:bg-creative-lime selection:text-black overflow-hidden relative">
            {/* Background Polish */}
            <div className="absolute inset-0 bg-gradient-mesh opacity-20 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-creative-purple/10 blur-[150px] rounded-full -mr-[25vw] -mt-[25vw] animate-pulse-slow"></div>
            <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-creative-lime/5 blur-[150px] rounded-full -ml-[25vw] -mb-[25vw]"></div>

            <div className="relative z-10 min-h-screen flex flex-col lg:flex-row">
                {/* Left Section - Identity */}
                <div className="w-full lg:w-1/2 p-12 lg:p-24 flex flex-col justify-between">
                    <div>
                        <Link to="/" className="inline-flex items-center gap-4 group">
                            <div className="w-16 h-16 rounded-2xl bg-creative-lime flex items-center justify-center text-creative-dark shadow-[0_0_30px_rgba(163,230,53,0.3)] transition-all group-hover:scale-110 group-hover:rotate-12">
                                <span className="text-3xl font-black">🌱</span>
                            </div>
                            <span className="text-4xl font-black tracking-tighter font-display italic">ZeroBite</span>
                        </Link>
                    </div>

                    <div className="mt-24 lg:mt-0">
                        <div className="inline-block px-4 py-2 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.4em] mb-8 animate-fade-in">
                            SECURE USER LOGIN
                        </div>
                        <h1 className="text-6xl lg:text-9xl font-black tracking-tighter leading-[0.85] mb-8 italic">
                            REJOIN <br />
                            <span className="text-creative-lime drop-shadow-glow">ZEROBITE.</span>
                        </h1>
                        <p className="text-xl lg:text-3xl text-white/40 max-w-xl font-medium leading-tight">
                            Execute your operational directives and continue the mission toward absolute resource efficiency.
                        </p>
                    </div>

                    <div className="hidden lg:flex items-center gap-12 mt-24 opacity-30">
                        <div className="flex flex-col">
                            <span className="text-xs font-black tracking-widest uppercase mb-2">Protocol</span>
                            <span className="text-2xl font-mono">256-BIT AES</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-black tracking-widest uppercase mb-2">Status</span>
                            <span className="text-2xl font-mono text-creative-lime">ONLINE</span>
                        </div>
                    </div>
                </div>

                {/* Right Section - Authentication Interface */}
                <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-24">
                    <Card variant="premium" className="w-full max-w-xl p-12 lg:p-20 relative border-white/5">
                        <div className="absolute top-0 right-0 p-8">
                            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center opacity-20">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                        </div>

                        <h2 className="text-4xl font-black tracking-tighter mb-4 italic uppercase">Sign In to Your Account</h2>
                        <p className="text-white/40 mb-12 font-medium">Please enter your credentials to access the portal.</p>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            {error && (
                                <div className="p-6 rounded-[2rem] bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-bold flex items-center gap-4 animate-shake">
                                    <span className="text-2xl">⚠️</span>
                                    {error}
                                </div>
                            )}

                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 ml-4">Electronic Mail</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-8 py-6 rounded-[2rem] bg-white/5 border border-white/10 text-xl font-bold transition-all focus:border-creative-lime focus:ring-4 focus:ring-creative-lime/20 outline-none placeholder:text-white/10"
                                    placeholder="OPERATOR@SYSTEM.ORG"
                                    required
                                />
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center ml-4">
                                    <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">Secret Key</label>
                                    <Link to="/forgot-password" size="sm" className="text-[10px] font-black uppercase tracking-[0.2em] text-creative-lime hover:underline">RECOVER</Link>
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-8 py-6 rounded-[2rem] bg-white/5 border border-white/10 text-xl font-bold transition-all focus:border-creative-lime focus:ring-4 focus:ring-creative-lime/20 outline-none placeholder:text-white/10"
                                    placeholder="••••••••••••"
                                    required
                                />
                            </div>

                            <Button
                                type="submit"
                                size="xl"
                                className="w-full mt-8"
                                isLoading={loading}
                            >
                                AUTHORIZE ACCESS
                            </Button>
                        </form>

                        <div className="mt-12 text-center">
                            <p className="text-white/30 font-bold uppercase text-[10px] tracking-[0.3em]">
                                Non-combatant? {' '}
                                <Link to="/register" className="text-creative-lime hover:underline">Register Fleet</Link>
                            </p>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}
