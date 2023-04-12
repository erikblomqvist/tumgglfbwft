import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import app from '@/base'
import {
    getAuth,
    signInWithEmailAndPassword, signInWithPopup, setPersistence, browserSessionPersistence,
    GoogleAuthProvider
} from 'firebase/auth'

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    const router = useRouter()
    
    const onSubmit = async e => {
        e.preventDefault()
        
        setError(null)

        const auth = getAuth(app)

        try {
            await setPersistence(auth, browserSessionPersistence)
            await signInWithEmailAndPassword(auth, email, password)
            router.push('/')
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div>
            <h1>Login Page</h1>
            <button
                onClick={async () => {
                    const auth = getAuth(app)
                    const provider = new GoogleAuthProvider()

                    try {
                        await setPersistence(auth, browserSessionPersistence)
                        await signInWithPopup(auth, provider)
                        router.push('/')
                    } catch (error) {
                        setError(error.message)
                    }
                }}
            >
                Sign in with Google
            </button>
            <form onSubmit={onSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
            {error && <p>{error}</p>}
            <p>
                Don’t have an account?{' '}
                <Link href="/signup">
                    Sign up
                </Link>
            </p>
        </div>
    )
}

export default LoginPage
        