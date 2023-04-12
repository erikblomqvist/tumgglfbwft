import React, {
    createContext, useContext,
    useState, useEffect
} from 'react'
import {
    collection, doc,
    addDoc, updateDoc, getDocs
} from 'firebase/firestore'
import { database } from '@/base'
import { useGames } from '@/contexts/games'

const scoresCollection = collection(database, 'scores')

const ScoresContext = createContext()

const ScoresProvider = ({ children }) => {
    const [scores, setScores] = useState([])
    const [loading, setLoading] = useState(true)

    const {
        games,
        setGames
    } = useGames()

    useEffect(() => {
        getDocs(scoresCollection)
            .then(data => {
                setScores(data.docs.map(item => ({
                    ...item.data(),
                    ...(item.data().timestamp
                        ? {
                            timestamp: (typeof item.data().timestamp === 'object')
                                ? item.data().timestamp.toDate()
                                : new Date(item.data().timestamp)
                        }
                        : {}
                    ),
                    id: item.id
                })))
                setLoading(false)
            })
            .catch(err => {
                console.error(err)
            })
    }, [])

    const addScoreEntry = async body => {
        try {
            const docRef = await addDoc(scoresCollection, {
                ...body,
                timestamp: new Date()
            })
            setScores(prev => [
                ...prev,
                {
                    ...body,
                    timestamp: new Date(),
                    id: docRef.id
                }
            ])

            const gamesRef = doc(database, 'games', games[0].id)
            await updateDoc(gamesRef, {
                participants: [
                    ...games[0].participants.map(participant => {
                        if (participant.userId === body.toUserId) {
                            const value = parseInt(body.value)
                            
                            return {
                                ...participant,
                                ...((((participant.totalScore + value) < participant?.lowestScore) || !participant?.lowestScore) ? { lowestScore: participant.totalScore + value } : {}),
                                ...((((participant.totalScore + value) > participant?.highestScore) || !participant?.highestScore) ? { highestScore: participant.totalScore + value } : {}),
                                totalScore: participant.totalScore + value
                            }
                        }

                        return participant
                    })
                ]
            })

            setGames(prev => {
                return prev.map(game => {
                    if (game.id === games[0].id) {
                        return {
                            ...game,
                            participants: [
                                ...game.participants.map(participant => {
                                    if (participant.userId === body.toUserId) {
                                        const value = parseInt(body.value)
                                        
                                        return {
                                            ...participant,
                                            ...((((participant.totalScore + value) < participant?.lowestScore) || !participant?.lowestScore) ? { lowestScore: participant.totalScore + value } : {}),
                                            ...((((participant.totalScore + value) > participant?.highestScore) || !participant?.highestScore) ? { highestScore: participant.totalScore + value } : {}),
                                            totalScore: participant.totalScore + value
                                        }
                                    }

                                    return participant
                                })
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
        scores,
        loading,
        addScoreEntry
    }

    return (
        <ScoresContext.Provider value={value}>
            {children}
        </ScoresContext.Provider>
    )
}

export const useScores = () => useContext(ScoresContext)

export default ScoresProvider
