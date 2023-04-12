import { useEffect } from 'react'
import { useRouter } from 'next/router'
import app from '@/base'
import { useAuthUser } from '@/contexts/auth'
import { getAuth, signOut } from 'firebase/auth'
import Games from '@/pages/games'
import { Loader } from '@/components/Loader'
import { Button } from '@/styles/Form'

const IndexPage = () => {
    const {
        currentUser,
        loading
    } = useAuthUser()
    const router = useRouter()

    useEffect(() => {
        if(!currentUser && !loading) {
            router.push('/login')
        }
    }, [currentUser, loading, router])

    const handleSignOut = async () => {
        const auth = getAuth(app)
        await signOut(auth)

        router.push('/login')
    }

    if(loading) {
        return <Loader />
    }
    
    return (
        <div>
            <Games />
            <Button onClick={handleSignOut}>Sign Out</Button>
        </div>
    )
}

export default IndexPage