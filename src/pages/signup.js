import { useCallback } from 'react'
import router from 'next/router'
import { app } from '@/base'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

const SignupPage = () => {
    const onSubmit = useCallback(async e => {
        e.preventDefault()

        const { email, password } = e.target.elements

        try {
            const auth = getAuth(app)

            await createUserWithEmailAndPassword(auth, email.value, password.value)
            
            router.push('/')
        } catch (error) {
            alert(error)
        }
    }, [])

    return (
        <div>
            <h1>Signup Page</h1>
            <form onSubmit={onSubmit}>
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default SignupPage