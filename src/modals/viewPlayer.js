import { useGames } from '@/contexts/games'
import { useScores } from '@/contexts/scores'
import { useUsers } from '@/contexts/users'
import {
    Header, User, Emoji, Name, Score,
    Button
} from '@/styles/ViewPlayer'
import { Actions } from '@/styles/Form'
import { Stats, Stat, StatLabel, StatValue } from '@/styles/Stats'
import {
    ResponsiveContainer,
    BarChart, YAxis,
    Tooltip, Bar, Rectangle
} from 'recharts'
import { light } from '@/styles/Theme.styled'

const CustomBar = props => {
    let {
        value,
        fill
    } = props
    
    if(value < 0) {
        fill = light.colors.error.text
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
        <div
            style={{
                backgroundColor: light.colors.content.background,
                padding: '0.5rem'
            }}
        >
            <p
                style={{
                    margin: 0,
                    fontSize: '0.75rem'
                }}
            >
                {dateFormat.format(payload[0].payload.timestamp)}
            </p>
            <p
                style={{
                    margin: 0,
                    fontSize: '1rem',
                    fontWeight: 700
                }}
            >
                {payload[0].payload.value}
            </p>
        </div>
    )
}

const ViewPlayer = ({ viewingPlayer, setViewingPlayer }) => {
    const {
        games,
        removeParticipant,
        loading: loadingGames
    } = useGames()

    const { scores } = useScores()

    const {
        removeUser,
        loading: loadingUsers
    } = useUsers()

    if(!viewingPlayer) return null

    // const dateFormat = new Intl.DateTimeFormat('en-US', {
    //     dateStyle: 'full'
    // })

    const stats = games[0].participants.find(participant => participant.userId === viewingPlayer?.id)

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
                <Score>{stats?.totalScore}</Score>
            </Header>
            {(!!stats?.highestScore && !!stats?.lowestScore) && (
                <Stats>
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
                            shape={<CustomBar />}
                            fill={light.colors.success.text}
                        />
                    </BarChart>
                </ResponsiveContainer>
            )}
            <Actions>
                <Button
                    onClick={async () => {
                        await removeParticipant({
                            gameId: games[0].id,
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