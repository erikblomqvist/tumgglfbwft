import { useEffect, useMemo, useState, useRef } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import GamesProvider, { useGames } from '@/contexts/games'
import ScoresProvider, { useScores } from '@/contexts/scores'
import UsersProvider, { useUsers } from '@/contexts/users'
import { Loader } from '@/components/Loader'
import {
    Main, Header,
    Modal,
    Cards, Card, CardContent,
    Meta, Avatar, Name, Score, Placement,
    Actions, Button,
    LastContainer, LastEmoji, LastText
} from '@/styles/Home'
import { FABButton } from '@/components/Button'
import {
    UserPlus,
    Plus, Minus
} from 'styled-icons/feather'
import { FilterList } from 'styled-icons/material'
import AddPlayer from '@/modals/addPlayer'
import AddScoreEntry from '@/modals/addScoreEntry'
import ViewPlayer from '@/modals/viewPlayer'

const Home = () => {
    const addPlayerRef = useRef()
    const addScoreEntryRef = useRef()
    const viewPlayerRef = useRef()
    
    const {
        id: gameId,
        games,
        fetching: fetchingGames
    } = useGames()

    const currentGame = useMemo(() => {
        return games?.find(game => game.id === gameId)
    }, [games, gameId])

    const {
        scores,
        fetching: fetchingScores
    } = useScores()

    const {
        users,
        fetching: fetchingUsers
    } = useUsers()

    const fetching = fetchingGames || fetchingScores || fetchingUsers

    const [usersData, setUsersData] = useState([])
    const [addingPlayer, setAddingPlayer] = useState(false)
    const [addingScoreEntry, setAddingScoreEntry] = useState(null)
    const [viewingPlayer, setViewingPlayer] = useState(null)
    const [selectedEmoji, setSelectedEmoji] = useState(null)
    const [cardsOrder, setCardsOrder] = useState('asc')

    useEffect(() => {
        const handleKeyDown = e => {
            if(e.key === 'Escape') {
                setAddingPlayer(false)
                setAddingScoreEntry(null)
                setViewingPlayer(null)
            }
        }

        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [])

    useEffect(() => {
        if (!!games?.length && !!users?.length && currentGame) {
            const usersData = users
                .filter(user => currentGame.participants.some(participant => participant.userId === user.id))
                .map(user => {
                    const score = currentGame.participants.find(participant => participant.userId === user.id).totalScore

                    return {
                        id: user.id,
                        avatarEmoji: user.avatarEmoji,
                        name: user.name,
                        score
                    }
                })

            // Sort users by score and update placement
            usersData.sort((a, b) => b.score - a.score)
            usersData.forEach((user, index) => {
                user.placement = index + 1
            })

            setUsersData(usersData)
        }
    }, [games, scores, users, currentGame])

    useEffect(() => {
        if(!addingPlayer) {
            addPlayerRef.current?.close()
        } else {
            addPlayerRef.current?.showModal()
        }
    }, [addingPlayer])

    useEffect(() => {
        if(!addingScoreEntry) {
            addScoreEntryRef.current?.close()
        } else {
            addScoreEntryRef.current?.showModal()
        }
    }, [addingScoreEntry])

    useEffect(() => {
        if(!viewingPlayer) {
            viewPlayerRef.current?.close()
        } else {
            viewPlayerRef.current?.showModal()
        }
    }, [viewingPlayer])

    return (
        <>
            <Head>
                <title>The Ultimate, Marvelous and Glorious Game of Life and Fantastic Beasts and Where to Find Them</title>
                <meta name="description" content="Add minus points and, sometimes (but seldom), plus points to friends and family and fantastic beasts" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Main>
                <FABButton onClick={() => setAddingPlayer(true)}>
                    <UserPlus size={20} />
                </FABButton>
                <Header>
                    <h1>The Ultimate, Marvelous and Glorious Game of Life and Fantastic Beasts and Where to Find Them</h1>
                </Header>
                <Button
                    className={`order ${cardsOrder === 'asc' ? 'asc' : 'desc'}`}
                    onClick={() => setCardsOrder(cardsOrder === 'asc' ? 'desc' : 'asc')}
                >
                    <FilterList size={20} />
                </Button>
                <Modal
                    id="addPlayer"
                    ref={addPlayerRef}
                >
                    <AddPlayer
                        selectedEmoji={selectedEmoji}
                        setSelectedEmoji={setSelectedEmoji}
                        addingPlayer={addingPlayer}
                        setAddingPlayer={setAddingPlayer}
                    />
                </Modal>
                {fetching && <Loader />}
                {!fetching && (
                    <Cards
                        axis="y"
                        values={usersData}
                    >
                        {usersData
                            ?.sort((a, b) => {
                                if(cardsOrder === 'asc') {
                                    return a.score - b.score
                                } else {
                                    return b.score - a.score
                                }
                            })
                            ?.map(user => (
                            <Card
                                value={user.id}
                                initial={{
                                    opacity: 0,
                                    y: 100
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0
                                }}
                                exit={{
                                    opacity: 0,
                                    y: -100
                                }}
                                drag={false}
                                key={user.id}
                            >
                                <CardContent>
                                    <Meta>
                                        <Avatar>{user.avatarEmoji}</Avatar>
                                        <Name onClick={() => setViewingPlayer(user)}>{user.name}</Name>
                                        <Score>{user.score}</Score>
                                        <Placement>{user.placement}</Placement>
                                    </Meta>
                                    <Actions>
                                        <Button
                                            className="plus"
                                            onClick={() => setAddingScoreEntry({
                                                userId: user.id,
                                                value: 1
                                            })}
                                        >
                                            <Plus size={24} />
                                        </Button>
                                        <Button
                                            className="minus"
                                            onClick={() => setAddingScoreEntry({
                                                userId: user.id,
                                                value: -1
                                            })}
                                        >
                                            <Minus size={24} />
                                        </Button>
                                    </Actions>
                                </CardContent>
                                {user.placement === usersData.length && (
                                    <LastContainer>
                                        <LastEmoji>💩</LastEmoji>
                                        <LastText>HAHA you’re last!</LastText>
                                    </LastContainer>
                                )}
                            </Card>
                        ))}
                        <Modal
                            id="addScoreEntry"
                            ref={addScoreEntryRef}
                        >
                            <AddScoreEntry
                                addingScoreEntry={addingScoreEntry}
                                setAddingScoreEntry={setAddingScoreEntry}
                            />
                        </Modal>
                        <Modal
                            id="viewPlayer"
                            ref={viewPlayerRef}
                        >
                            <ViewPlayer
                                viewingPlayer={viewingPlayer}
                                setViewingPlayer={setViewingPlayer}
                            />
                        </Modal>
                    </Cards>
                )}
            </Main>
        </>
    )
}

const HomeProvider = props => {
    const router = useRouter()
    const { id } = router.query

    return (
        <GamesProvider id={id}>
            <UsersProvider>
                <ScoresProvider>
                    <Home {...props} />
                </ScoresProvider>
            </UsersProvider>
        </GamesProvider>
    )
}

export default HomeProvider