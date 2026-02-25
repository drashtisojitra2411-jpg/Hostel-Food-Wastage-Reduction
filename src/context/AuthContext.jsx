import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [profile, setProfile] = useState(null)
    const [role, setRole] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Safety timeout: Ensure loading state is cleared after 5 seconds regardless of network status
        // This prevents the infinite loading spinner if supabase.auth.getSession() hangs or fails silently
        const safetyTimeout = setTimeout(() => {
            if (loading) {
                console.warn('Auth check timed out, forcing app load...')
                setLoading(false)
            }
        }, 5000)

        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null)
            if (session?.user) {
                // Return the promise so it can be handled if needed, though we handle loading in fetchProfile
                fetchProfile(session.user.id)
            } else {
                setLoading(false)
            }
        }).catch((err) => {
            console.error('Session init error:', err)
            setLoading(false)
        })

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            setUser(session?.user ?? null)

            if (session?.user) {
                // If we are just refreshing the token, we might not need to fetch profile again if we already have it
                // But for safety on login, we fetch it.
                if (!profileProp?.id || session.user.id !== profileProp?.id) {
                    await fetchProfile(session.user.id)
                }
            } else {
                setProfile(null)
                setRole(null)
                setLoading(false)
            }
        })

        return () => {
            subscription.unsubscribe()
            clearTimeout(safetyTimeout)
        }
    }, [])

    async function fetchProfile(userId) {
        try {
            // Add a timeout to the profile fetch as well
            const fetchPromise = supabase
                .from('user_profiles')
                .select(`
                  *,
                  roles (id, name, permissions),
                  hostels (id, name, code)
                `)
                .eq('id', userId)
                .single()

            // Race against a 3s timeout
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Profile fetch timeout')), 4000)
            )

            const { data: profileData, error: profileError } = await Promise.race([fetchPromise, timeoutPromise])

            if (profileError && profileError.code !== 'PGRST116') {
                console.error('Error fetching profile:', profileError)
            }

            if (profileData) {
                setProfile(profileData)
                setRole(profileData.roles?.name?.toLowerCase() || 'student')
            }
        } catch (error) {
            console.error('Profile fetch error:', error)
            // If profile fetch fails, we might want to default to 'student' to let them in, 
            // but for now just logging it to avoid blocking.
        } finally {
            setLoading(false)
        }
    }

    async function signUp({ email, password, fullName, hostelId, roomNumber, dietaryPreference }) {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                    hostel_id: hostelId,
                    room_number: roomNumber,
                    dietary_preference: dietaryPreference,
                    role_id: '44444444-4444-4444-4444-444444444444' // Default: student
                }
            }
        })

        if (error) throw error

        // Profile is created automatically via Trigger on auth.users
        return data
    }

    async function signIn({ email, password }) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        })

        if (error) throw error
        return data
    }

    async function signOut() {
        try {
            const { error } = await supabase.auth.signOut()
            if (error) console.error('Supabase signOut error:', error)
        } catch (err) {
            console.error('Sign Out Exception:', err)
        } finally {
            // Force clear everything regardless of network success
            setUser(null)
            setProfile(null)
            setRole(null)
            localStorage.clear()
            sessionStorage.clear()
        }
    }

    async function resetPassword(email) {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/reset-password`
        })
        if (error) throw error
    }

    async function updatePassword(newPassword) {
        const { error } = await supabase.auth.updateUser({
            password: newPassword
        })
        if (error) throw error
    }

    async function updateProfile(updates) {
        if (!user) throw new Error('No user logged in')

        const { error } = await supabase
            .from('user_profiles')
            .update(updates)
            .eq('id', user.id)

        if (error) throw error

        // Refresh profile
        await fetchProfile(user.id)
    }

    // Role check helpers
    const isAdmin = () => ['super_admin', 'hostel_admin', 'mess_manager'].includes(role)
    const isSuperAdmin = () => role === 'super_admin'
    const isHostelAdmin = () => role === 'hostel_admin'
    const isMessManager = () => role === 'mess_manager'
    const isStudent = () => role === 'student'

    const value = {
        user,
        profile,
        role,
        loading,
        signUp,
        signIn,
        signOut,
        resetPassword,
        updatePassword,
        updateProfile,
        isAdmin,
        isSuperAdmin,
        isHostelAdmin,
        isMessManager,
        isStudent
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
