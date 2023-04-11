import { useState, useEffect, useRef } from 'react'
import emojiData from '@emoji-mart/data'
import EmojiPicker from '@emoji-mart/react'
import { useUsers } from '@/contexts/users'
import { useGames } from '@/contexts/games'
import { SelectedEmoji, Button } from '@/styles/Home'
import {
    Form, Actions,
    Label,
    Input, Switch, Select, EmojiPickerWrapper
} from '@/styles/Form'
import { Tabs, Tab } from '@/styles/Tabs'

const AddPlayer = ({
    selectedEmoji, setSelectedEmoji,
    addingPlayer, setAddingPlayer
}) => {
    const formRef = useRef()
    const nameRef = useRef()
    const emailRef = useRef()
    const existingUserRef = useRef()
    const childOrPetRef = useRef()
    const overrideScoreRef = useRef()

    const [activeTab, setActiveTab] = useState('new')
    const [existingUser, setExistingUser] = useState(null)
    
    const {
        users = [],
        addUser
    } = useUsers()

    const {
        games = [],
        addParticipant
    } = useGames()

    useEffect(() => {
        if(!addingPlayer) {
            setActiveTab('new')
            formRef.current?.reset()
            setSelectedEmoji(null)
        }
    }, [addingPlayer])

    if(!addingPlayer) {
        return null
    }

    const nonExistingUsers = users
        .filter(user => {
            return !games[0].participants.some(participant => participant.userId === user.id)
        })
        .sort((a, b) => a.name.localeCompare(b.name))

    return (
        <>
            <h2>Add player</h2>
            <Tabs>
                <Tab
                    active={activeTab === 'new'}
                    type="button"
                    onClick={() => setActiveTab('new')}
                >
                    New player
                </Tab>
                <Tab
                    active={activeTab === 'existing'}
                    type="button"
                    onClick={() => setActiveTab('existing')}
                >
                    Existing player
                </Tab>
            </Tabs>
            <Form
                method="dialog"
                onSubmit={async e => {
                    e.preventDefault()

                    if(activeTab === 'new') {
                        const name = nameRef.current?.value
                        const email = emailRef.current?.value
                        const avatarEmoji = selectedEmoji?.native
                        const childOrPet = childOrPetRef.current?.checked
                        const overrideScore = overrideScoreRef.current?.value

                        if (!!name && !!avatarEmoji) {
                            await addUser({
                                name,
                                ...(!!email && { email }),
                                avatarEmoji,
                                childOrPet,
                                ...((overrideScore !== '') && { overrideScore })
                            })
                            formRef.current?.reset()
                            setAddingPlayer(false)
                        }
                    } else if(activeTab === 'existing') {
                        const userId = existingUser
                        const overrideScore = overrideScoreRef.current?.value
                                    
                        if (!!userId) {
                            await addParticipant({
                                userId,
                                gameId: games[0].id,
                                ...((overrideScore !== '') && { overrideScore })
                            })
                            formRef.current?.reset()
                            setAddingPlayer(false)
                        }
                    }
                }}
                ref={formRef}
            >
                {activeTab === 'new' && (
                    <>
                        <Label htmlFor="name">Name</Label>
                        <Input
                            type="text"
                            id="name"
                            name="name"
                            ref={nameRef}
                        />
                        <Label htmlFor="email">Email</Label>
                        <Input
                            type="email"
                            id="email"
                            name="email"
                            ref={emailRef}
                        />
                        <Label
                            control={(
                                <Switch
                                    id="childOrPet"
                                    name="childOrPet"
                                    ref={childOrPetRef}
                                />
                            )}
                            label="Child or pet?"
                        />
                        <Label htmlFor="overrideScore">Override default score</Label>
                        <Input
                            type="number"
                            id="overrideScore"
                            name="overrideScore"
                            ref={overrideScoreRef}
                        />
                        <Label>Emoji</Label>
                        {!!selectedEmoji && (
                            <SelectedEmoji>{selectedEmoji.native}</SelectedEmoji>
                        )}
                        <EmojiPickerWrapper>
                            <EmojiPicker
                                data={emojiData}
                                onEmojiSelect={emoji => setSelectedEmoji(emoji)}
                                perLine={12}
                            />
                        </EmojiPickerWrapper>
                    </>
                )}
                {activeTab === 'existing' && (
                    <>
                        {!users?.length && (
                            <p>No users found.</p>
                        )}
                        {!!users?.length && (
                            <>
                                {!nonExistingUsers.length && (
                                    <p>All users are already in the game.</p>
                                )}
                                {!!nonExistingUsers.length && (
                                    <>
                                        <Select
                                            id="userId"
                                            name="userId"
                                            defaultValue="empty"
                                            onChange={e => {
                                                const userId = e.target.value
                                                setExistingUser(userId)
                                            }}
                                            ref={existingUserRef}
                                        >
                                            <option
                                                value="empty"
                                                disabled={true}
                                            >
                                                Select user
                                            </option>
                                            {nonExistingUsers.map(user => (
                                                <option
                                                    value={user.id}
                                                    key={user.id}
                                                >
                                                    {user?.avatarEmoji ?
                                                        `${user.avatarEmoji} ${user.name}` :
                                                        user.name
                                                    }
                                                </option>
                                            ))}
                                        </Select>
                                        <Label htmlFor="overrideScore">Override default score</Label>
                                        <Input
                                            type="number"
                                            id="overrideScore"
                                            name="overrideScore"
                                            ref={overrideScoreRef}
                                        />
                                    </>
                                )}
                            </>
                        )}
                    </>
                )}
                <Actions>
                    <Button
                        type="button"
                        onClick={() => setAddingPlayer(false)}
                        formNoValidate
                    >
                        Cancel
                    </Button>
                    <Button
                        className="constructive"
                        type="submit"
                        disabled={
                            (activeTab === 'new' && (!nameRef.current?.value || !selectedEmoji))
                            || (activeTab === 'existing' && !existingUser)
                        }
                    >
                        Submit
                    </Button>
                </Actions>
            </Form>
        </>
    )
}

export default AddPlayer