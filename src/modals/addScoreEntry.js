import { useRef } from 'react'
import { useGames } from '@/contexts/games'
import { useUsers } from '@/contexts/users'
import { useScores } from '@/contexts/scores'
import { Button } from '@/styles/Home'
import {
    Form, Actions,
    Label,
    Input
} from '@/styles/Form'

const AddScoreEntry = ({ addingScoreEntry, setAddingScoreEntry }) => {
    const formRef = useRef()
    const commentRef = useRef()
    
    const { games } = useGames()

    const { users } = useUsers()
    
    const { addScoreEntry } = useScores()

    const {
        userId,
        value
    } = addingScoreEntry ?? {}

    const affectedUser = users?.find(user => user.id === userId)
    const myUserId = users?.find(user => user.name === 'Erik')?.id

    return (
        <Form
            method="dialog"
            onSubmit={async e => {
                e.preventDefault()

                const comment = commentRef.current?.value || ''

                await addScoreEntry({
                    gameId: games[0].id,
                    fromUserId: myUserId,
                    toUserId: addingScoreEntry.userId,
                    value,
                    comment
                })

                formRef.current.reset()
                setAddingScoreEntry(null)
            }}
            ref={formRef}
        >
            <p>
                {affectedUser?.name} will {value > 0 ? 'gain' : 'lose'} {Math.abs(value)} point{Math.abs(value) === 1 ? '' : 's'}.
            </p>
            <Label htmlFor="comment">Comment</Label>
            <Input
                type="text"
                id="comment"
                name="comment"
                ref={commentRef}
            />
            <Actions>
                <Button
                    type="button"
                    onClick={() => setAddingScoreEntry(null)}
                    formNoValidate
                >
                    Cancel
                </Button>
                <Button
                    className="constructive"
                    type="submit"
                >
                    Register
                </Button>
            </Actions>
        </Form>
    )
}

export default AddScoreEntry