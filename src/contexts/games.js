import React, {
    createContext, useContext,
    useState, useEffect
} from 'react'
import {
    collection,
    doc, updateDoc, getDocs, getDoc
} from 'firebase/firestore'
import { database } from '@/base'

const gamesCollection = collection(database, 'games')

const GamesContext = createContext()

const GamesProvider = ({ id = null, children }) => {
    const [games, setGames] = useState([])
    const [fetching, setFetching] = useState(true)
    const [loading, setLoading] = useState(false)

    const currentGame = games.find(game => game.id === id)

    useEffect(() => {
        if(!id) {
            getDocs(gamesCollection)
                .then(data => {
                    setGames(data.docs.map(item => {
                        return {
                            ...item.data(),
                            id: item.id
                        }
                    }))
                    setFetching(false)
                })
                .catch(err => {
                    console.error(err)
                })
        } else {
            getDoc(doc(gamesCollection, id))
                .then(data => {
                    setGames([{
                        ...data.data(),
                        id: data.id
                    }])
                    setFetching(false)
                })
                .catch(err => {
                    console.error(err)
                }
            )
        }
    }, [id])

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
            setLoading(true)

            const user = await getDoc(doc(database, 'users', userId))
            const gamesRef = doc(database, 'games', gameId)

            const addedTimestamp = new Date()
            
            await updateDoc(gamesRef, {
                participants: [
                    ...currentGame.participants,
                    {
                        userId,
                        totalScore: parseInt(defaultScore({ overrideScore, childOrPet: user.data().childOrPet })),
                        lowestScore: parseInt(defaultScore({ overrideScore, childOrPet: user.data().childOrPet })),
                        highestScore: parseInt(defaultScore({ overrideScore, childOrPet: user.data().childOrPet })),
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
                                    totalScore: parseInt(defaultScore({ overrideScore, childOrPet: user.data().childOrPet })),
                                    lowestScore: parseInt(defaultScore({ overrideScore, childOrPet: user.data().childOrPet })),
                                    highestScore: parseInt(defaultScore({ overrideScore, childOrPet: user.data().childOrPet })),
                                    addedTimestamp
                                }
                            ]
                        }
                    }

                    return game
                })
            })

            setLoading(false)
        } catch (err) {
            console.error(err)
        }
    }

    const removeParticipant = async ({ gameId, userId }) => {
        try {
            setLoading(true)
            
            const gamesRef = doc(database, 'games', gameId)

            await updateDoc(gamesRef, {
                participants: currentGame.participants.filter(participant => participant.userId !== userId)
            })

            setGames(prev => {
                return prev.map(game => {
                    if (game.id === gameId) {
                        return {
                            ...game,
                            participants: game.participants.filter(participant => participant.userId !== userId)
                        }
                    }

                    return game
                })
            })

            setLoading(false)
        } catch (err) {
            console.error(err)
        }
    }

    const value = {
        id,
        games,
        setGames,
        addParticipant,
        removeParticipant,
        fetching,
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
