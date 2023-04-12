import {
    useState, useEffect,
    createContext, useContext
} from 'react'
import app from '@/base'
import { getAuth, onAuthStateChanged, setPersistence, browserSessionPersistence } from 'firebase/auth'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const auth = getAuth(app)

        onAuthStateChanged(auth, async user => {
            if(user) {
                await setPersistence(auth, browserSessionPersistence)
                setCurrentUser(user)
            } else {
                setCurrentUser(null)
            }

            setLoading(false)
        })
    }, [])

    const value = {
        currentUser,
        loading
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthUser = () => useContext(AuthContext)

export default AuthProvider