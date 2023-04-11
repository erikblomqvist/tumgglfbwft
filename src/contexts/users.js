import React, {
    createContext, useContext,
    useState, useEffect
} from 'react'
import {
    collection,
    doc, addDoc, updateDoc, getDocs
} from 'firebase/firestore'
import { database } from '@/firebaseConfig'
import { useGames } from '@/contexts/games'
import { omit } from 'lodash'

const usersCollection = collection(database, 'users')

const UsersContext = createContext()

const UsersProvider = ({ children }) => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    const {
        games,
        setGames
    } = useGames()

    useEffect(() => {
        getDocs(usersCollection)
            .then(data => {
                setUsers(data.docs.map(item => {
                    return {
                        ...item.data(),
                        id: item.id
                    }
                }))
                setLoading(false)
            })
            .catch(err => {
                console.error(err)
            })
    }, [])

    const defaultScore = ({ overrideScore, childOrPet }) => {
        if (overrideScore) {
            return overrideScore
        }

        if (childOrPet) {
            return 50
        }

        return -1
    }

    const addUser = async body => {
        try {
            const addedTimestamp = new Date()
            
            const docRef = await addDoc(usersCollection, omit(body, ['overrideScore']))
            setUsers(prev => [
                ...prev,
                {
                    ...omit(body, ['overrideScore']),
                    id: docRef.id
                }
            ])

            const gamesRef = doc(database, 'games', games[0].id)
            await updateDoc(gamesRef, {
                participants: [
                    ...games[0].participants,
                    {
                        userId: docRef.id,
                        totalScore: parseInt(defaultScore(body)),
                        highestScore: parseInt(defaultScore(body)),
                        lowestScore: parseInt(defaultScore(body)),
                        addedTimestamp
                    }
                ]
            })

            setGames(prev => {
                return prev.map(game => {
                    if (game.id === games[0].id) {
                        return {
                            ...game,
                            participants: [
                                ...game.participants,
                                {
                                    userId: docRef.id,
                                    totalScore: parseInt(defaultScore(body)),
                                    highestScore: parseInt(defaultScore(body)),
                                    lowestScore: parseInt(defaultScore(body)),
                                    addedTimestamp
                                }
                            ]
                        }
                    }

                    return game
                })
            })
        } catch (err) {
            console.error(err)
        }
    }

    const value = {
        users,
        addUser,
        loading
    }

    return (
        <UsersContext.Provider value={value}>
            {children}
        </UsersContext.Provider>
    )
}

export const useUsers = () => useContext(UsersContext)

export default UsersProvider
