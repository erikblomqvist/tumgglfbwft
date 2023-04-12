import GamesProvider, { useGames } from '@/contexts/games'
import { Loader } from '@/components/Loader'
import Link from 'next/link'

const GamesPage = () => {
    const {
        games = [],
        fetching = true
    } = useGames()

    return (
        <div>
            {!!fetching && (
                <Loader />
            )}
            {!!games.length && (
                <ul>
                    {games.map(game => (
                        <li key={game.id}>
                            <Link href={`/games/${game.id}`}>
                                {game.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default props => (
    <GamesProvider>
        <GamesPage {...props} />
    </GamesProvider>
)