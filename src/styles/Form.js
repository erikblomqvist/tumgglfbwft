import { forwardRef } from 'react'
import styled from 'styled-components'

export const Form = styled.form``

export const Button = styled.button`
    display: grid;
    place-items: center;

    border-radius: 0.5rem;
    min-height: 40px;
    padding: 0 1rem;

    &.constructive {
        background-color: var(--tumgglfbwft-neutral-background);

        color: var(--tumgglfbwft-neutral-text);

        &[disabled] {
            opacity: 0.8;
        }
    }

    &.destructive {
        background-color: ${({ theme }) => theme.colors.error.background};

        color: ${({ theme }) => theme.colors.error.text};

        &[disabled] {
            opacity: 0.8;
        }
    }
    
    &:where(.plus, .minus) {
        padding: 0;

        font-size: 1.5rem;

        svg {
            stroke-width: 3;
        }
    }

    &.plus {
        width: 56px;
        background-color: ${({ theme }) => theme.colors.success.background};

        color: ${({ theme }) => theme.colors.success.text};
    }

    &.minus {
        flex-grow: 1;
        
        background-color: ${({ theme }) => theme.colors.error.background};

        color: ${({ theme }) => theme.colors.error.text};
    }
`

export const CloseButton = styled.button`
    position: absolute;
    top: 0;
    right: 0;

    margin: 0.5rem;
    padding: 0.5rem;

    border: none;
    border-radius: 50%;
    background: none;

    color: var(--tumgglfbwft-content-text);

    svg {
        stroke-width: 2;
    }
`

export const Actions = styled.div`
    display: flex;
    justify-content: end;
    column-gap: 0.5rem;
`

const LabelNode = styled.label`
    display: block;

    margin-bottom: 0.5rem;
`

const LabelText = styled.span`
    line-height: 1.5;
`

export const Label = ({ children, control, label, ...props }) => {
    if(!control) {
        return (
            <LabelNode {...props}>
                {children}
            </LabelNode>
        )
    }

    return (
        <LabelNode {...props}>
            {control}
            <LabelText>{label}</LabelText>
        </LabelNode>
    )
}

const SwitchBase = styled.span`
    position: relative;
    z-index: 0;
    display: inline-flex;
    overflow: hidden;

    width: 58px;
    height: 38px;
    padding: 0.75rem;
`

const SwitchInput = styled.input.attrs({ type: 'checkbox' })`
    position: absolute;
    z-index: 1;
    left: -100%;

    margin: 0;
    width: 300%;
    height: 100%;
    padding: 0;
    opacity: 0;
`

const SwitchKnob = styled.span`
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;

    display: inline-flex;
    align-items: center;
    justify-content: center;

    border-radius: 50%;
    padding: 9px;

    transition:
        left 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
        transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

    color: rgb(224, 224, 224);

    &:has(${SwitchInput}:checked) {
        transform: translateX(20px);
        color: rgb(25, 118, 210);
    }
`

const SwitchThumb = styled.span`
    border-radius: 50%;
    width: 20px;
    height: 20px;
    box-shadow:
        rgba(0, 0, 0, 0.2) 0px 2px 1px -1px,
        rgba(0, 0, 0, 0.14) 0px 1px 1px 0px,
        rgba(0, 0, 0, 0.12) 0px 1px 3px 0px;
    background-color: currentColor;
`

const SwitchTrack = styled.span`
    z-index: -1;

    border-radius: 8px;
    width: 100%;
    height: 100%;
    background-color: hsl(0, 100%, 0%);
    opacity: 0.3;

    transition:
        opacity 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
        background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

    ${SwitchKnob}:has(${SwitchInput}:checked) + & {
        background-color: rgb(25, 118, 210);
        opacity: 0.5;
    }
`

export const Switch = forwardRef(({ ...props }, ref) => {
    return (
        <SwitchBase>
            <SwitchKnob>
                <SwitchInput
                    ref={ref}
                    {...props}
                />
                <SwitchThumb />
            </SwitchKnob>
            <SwitchTrack />
        </SwitchBase>
    )
})

export const Input = styled.input`
    margin-bottom: 1rem;
    border-radius: 0.5rem;
    border: 0;
    width: 100%;
    min-height: 40px;
    padding: 0 1rem;
    background-color: var(--tumgglfbwft-content-background);
`

export const Select = styled.select`
    margin-bottom: 1rem;
    border-radius: 0.5rem;
    border: 0;
    width: 100%;
    min-height: 40px;
    padding: 0 1rem;
    background-color: var(--tumgglfbwft-content-background);
`

export const EmojiPickerWrapper = styled.div`
    margin-bottom: 1rem;

    em-emoji-picker {
        --font-family: 'Work Sans', sans-serif;
        
        width: 100%;
    }
`