import { useGames } from '@/contexts/games'
import { useScores } from '@/contexts/scores'
import { useUsers } from '@/contexts/users'
import {
    Header, User, Emoji, Name,
    Button,
    CustomTooltipWrapper
} from '@/styles/ViewPlayer'
import { CloseButton, Actions } from '@/styles/Form'
import { Stats, Stat, StatLabel, StatValue } from '@/styles/Stats'
import {
    ResponsiveContainer,
    BarChart, YAxis,
    Tooltip, Bar, Rectangle
} from 'recharts'
import { X } from 'styled-icons/feather'

const cssvar = name => getComputedStyle(document.documentElement).getPropertyValue(name)

const CustomBar = ({ value, fill, ...props }) => {
    const {
        userScores,
        index
    } = props

    const prevValue = userScores[index - 1]?.value ?? 0
    
    if(value < prevValue) {
        fill = cssvar('--tumgglfbwft-bar-negative')
    } else {
        fill = cssvar('--tumgglfbwft-bar-positive')
    }

    return (
        <Rectangle
            {...props}
            fill={fill}
        />
    )
}

const CustomTooltip = ({ active, payload }) => {
    if(!active) {
        return null
    }

    const dateFormat = new Intl.DateTimeFormat('en-US', {
        dateStyle: 'full',
        timeStyle: 'short'
    })

    return (
        <CustomTooltipWrapper>
            <p
                style={{
                    margin: 0,
                    fontSize: '1.25rem',
                    fontWeight: 700
                }}
            >
                {payload[0].payload.value}
            </p>
            {!!payload[0].payload.comment?.length && (
                <p
                    style={{
                        margin: 0,
                        fontSize: '1rem'
                    }}
                >
                    {payload[0].payload.comment}
                </p>
            )}
            <p
                style={{
                    margin: 0,
                    marginTop: '0.5rem',
                    fontSize: '0.75rem',
                    opacity: 0.5
                }}
            >
                {dateFormat.format(payload[0].payload.timestamp)}
            </p>
        </CustomTooltipWrapper>
    )
}

const ViewPlayer = ({ viewingPlayer, setViewingPlayer }) => {
    const {
        id: gameId,
        games,
        removeParticipant,
        loading: loadingGames
    } = useGames()

    const currentGame = games.find(game => game.id === gameId)

    const { scores } = useScores()

    const {
        removeUser,
        loading: loadingUsers
    } = useUsers()

    if(!viewingPlayer) return null

    // const dateFormat = new Intl.DateTimeFormat('en-US', {
    //     dateStyle: 'full'
    // })

    const stats = currentGame.participants.find(participant => participant.userId === viewingPlayer?.id)

    let { totalScore = 0 } = stats ?? {}

    const userScoreEntries = scores
        ?.filter(score => score.toUserId === viewingPlayer?.id)
        .sort((a, b) => b.timestamp - a.timestamp)

    const userScores = userScoreEntries
        .reduce((acc, entry, index) => {
            const value = (acc.length > 0
                ? acc[index - 1].value - userScoreEntries[index - 1].value
                : totalScore
            )

            return [
                ...acc,
                {
                    ...entry,
                    value
                }
            ]
        }, [])
        .reverse()

    const avgPerWeek = scores
        ?.filter(score => score.toUserId === viewingPlayer.id)
        .sort((a, b) => a.timestamp + b.timestamp)
        .reduce((acc, _, index, arr) => {
            const week = Math.floor(index / 7)
            const weekScore = arr.filter((_, index) => Math.floor(index / 7) === week)
                .reduce((acc, score) => acc + score.value, 0)

            return {
                ...acc,
                [week]: weekScore
            }
        }, {})
          
    return (
        <>
            <Header>
                <User>
                    <Emoji>{viewingPlayer.avatarEmoji}</Emoji>
                    <Name>{viewingPlayer.name}</Name>
                </User>
                <CloseButton
                    onClick={() => setViewingPlayer(null)}
                >
                    <X size={24} />
                </CloseButton>
            </Header>
            {(!!stats?.highestScore && !!stats?.lowestScore) && (
                <Stats>
                    <Stat>
                        <StatValue>{stats.totalScore}</StatValue>
                        <StatLabel>Total</StatLabel>
                    </Stat>
                    <Stat>
                        <StatValue>{stats.highestScore}</StatValue>
                        <StatLabel>Highest</StatLabel>
                    </Stat>
                    <Stat>
                        <StatValue>{stats.lowestScore}</StatValue>
                        <StatLabel>Lowest</StatLabel>
                    </Stat>
                    {!!avgPerWeek?.length && (
                        <Stat>
                            <StatValue>{avgPerWeek[0]}</StatValue>
                            <StatLabel>Avg. per week</StatLabel>
                        </Stat>
                    )}
                </Stats>
            )}
            {!!userScores?.length && (
                <ResponsiveContainer
                    width="100%"
                    height={300}
                >
                    <BarChart
                        width={300}
                        height={300}
                        data={userScores}
                    >
                        {/* <XAxis dataKey="name" /> */}
                        <YAxis
                            allowDecimals={false}
                            hide={true}
                            domain={[
                                stats.lowestScore < 0
                                    ? stats.lowestScore - 2
                                    : 0,
                                stats.highestScore + 2
                            ]}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar
                            dataKey="value"
                            shape={<CustomBar userScores={userScores} />}
                            fill={cssvar('--tumgglfbwft-success-text')}
                        />
                    </BarChart>
                </ResponsiveContainer>
            )}
            <Actions>
                <Button
                    onClick={async () => {
                        await removeParticipant({
                            gameId,
                            userId: viewingPlayer.id
                        })
                        setViewingPlayer(null)
                    }}
                    disabled={loadingGames || loadingUsers}
                    className="destructive"
                >
                    Remove as participant
                </Button>
                <Button
                    onClick={async () => {
                        await removeUser(viewingPlayer.id)
                        setViewingPlayer(null)
                    }}
                    disabled={loadingGames || loadingUsers}
                    className="destructive"
                >
                    Remove user
                </Button>
            </Actions>
        </>
    )
}

export default ViewPlayer