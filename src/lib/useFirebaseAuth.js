import { useState, useEffect } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const formatAuthUser = user => ({
    uid: user.uid,
    email: user.email
})

export const useFirebaseAuth = () => {
    const [authUser, setAuthUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const authStateChanged = async authState => {
        if(!authState) {
            setAuthUser(null)
            setLoading(false)
            return
        }

        setLoading(true)
        const formattedUser = formatAuthUser(authState)
        setAuthUser(formattedUser)
        setLoading(false)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(getAuth(), authStateChanged)

        return () => unsubscribe()
    }, [])

    return { authUser, loading }
}