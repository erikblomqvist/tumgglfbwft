import React, {
    createContext, useContext,
    useState, useEffect
} from 'react'
import {
    collection,
    doc, updateDoc, getDocs
} from 'firebase/firestore'
import { database } from '@/firebaseConfig'

const gamesCollection = collection(database, 'games')

const GamesContext = createContext()

const GamesProvider = ({ children }) => {
    const [games, setGames] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getDocs(gamesCollection)
            .then(data => {
                setGames(data.docs.map(item => {
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

    const addParticipant = async ({ gameId, userId, overrideScore }) => {
        try {
            const userRef = doc(database, 'users', userId)
            const gamesRef = doc(database, 'games', gameId)

            const addedTimestamp = new Date()
            
            await updateDoc(gamesRef, {
                participants: [
                    ...games[0].participants,
                    {
                        userId,
                        totalScore: parseInt(defaultScore({ overrideScore, childOrPet: userRef.childOrPet })),
                        lowestScore: parseInt(defaultScore({ overrideScore, childOrPet: userRef.childOrPet })),
                        highestScore: parseInt(defaultScore({ overrideScore, childOrPet: userRef.childOrPet })),
                        addedTimestamp
                    }
                ]
            })

            setGames(prev => {
                return prev.map(game => {
                    if (game.id === gameId) {
                        return {
                            ...game,
                            participants: [
                                ...game.participants,
                                {
                                    userId,
                                    totalScore: parseInt(defaultScore({ overrideScore, childOrPet: userRef.childOrPet })),
                                    lowestScore: parseInt(defaultScore({ overrideScore, childOrPet: userRef.childOrPet })),
                                    highestScore: parseInt(defaultScore({ overrideScore, childOrPet: userRef.childOrPet })),
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
        games,
        setGames,
        addParticipant,
        loading
    }

    return (
        <GamesContext.Provider value={value}>
            {children}
        </GamesContext.Provider>
    )
}

export const useGames = () => useContext(GamesContext)

export default GamesProvider
