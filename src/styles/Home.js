import styled from 'styled-components'
import { Reorder } from 'framer-motion'

export const Main = styled.main`
    min-height: 100vh;
    background-color: var(--tumgglfbwft-content-background);
`

export const Header = styled.header`
    position: sticky;
    z-index: 1;
    top: 0;

    display: flex;
    align-items: center;
    column-gap: 2rem;

    margin-bottom: 1rem;
    padding: 1rem;
    box-shadow: 0 0 0.5rem 0.5rem var(--tumgglfbwft-shadow);
    background-color: var(--tumgglfbwft-container-background);

    button {
        flex-shrink: 0;
        
        border-radius: 50%;
        width: 40px;
        height: 40px;
        padding: 0;
        background: #333;

        color: #fff;

        svg {
            stroke-width: 2;
        }
    }
`

export const Modal = styled.dialog`
    border-radius: 1rem;
    border: 0;
    width: clamp(400px, 50vw, 600px);
    background-color: var(--tumgglfbwft-container-background);

    color: var(--tumgglfbwft-container-text);

    h2 {
        margin-top: 0.5rem;
    }

    &::backdrop {
        background-color: hsla(0, 0%, 0%, 0.5);
    }
`

export const SelectedEmoji = styled.div`
    display: grid;
    place-items: center;

    margin-bottom: 1rem;
    border-radius: 100vw;
    border: 1px solid ${({ theme }) => theme.colors.success.text};
    width: 3rem;
    height: 3rem;

    font-size: 1.5rem;
    line-height: 1.5rem;
`

export const Cards = styled(Reorder.Group)`
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    gap: 1rem;

    margin: 0;
    padding: 1rem 1rem 5rem;
`

export const LastContainer = styled.div`
    position: absolute;
    left: 0;
    bottom: 0rem;
    z-index: 0;

    display: flex;
    align-items: center;
    column-gap: 0.5rem;

    border-radius: 1rem;
    width: 100%;
    padding: 2.5rem 1rem 0.5rem;
    background-color: var(--tumgglfbwft-last-background);
`

export const Card = styled(Reorder.Item)`
    position: relative;
    isolation: isolate;

    margin-inline: auto;
    width: 100%;
    max-width: 500px;

    list-style: none;

    &:has(${LastContainer}) {
        padding-bottom: 3rem;
    }

    &:not(:last-child) {
        margin-bottom: 0.5rem;
    }
`

export const CardContent = styled.div`
    position: relative;
    z-index: 1;

    border-radius: 1rem;
    padding: 1rem;
    background-color: var(--tumgglfbwft-container-background);
    box-shadow: 0px 4px 15px hsla(0, 0%, 0%, 0.04);

    color: var(--tumgglfbwft-container-text);
`

export const Meta = styled.div`
    display: grid;
    grid-template-columns: 1.5rem 1fr repeat(2, auto);
    align-items: center;
    column-gap: 0.5rem;

    margin-bottom: 1rem;
`

export const Avatar = styled.div`
    pointer-events: none;

    width: 1.5rem;
    height: 1.5rem;
    
    font-size: 1.5rem;
    line-height: 1;
`

export const Name = styled.h2`
    cursor: pointer;

    margin: 0;
    margin-inline-start: 0.5rem;

    font-size: 1.125rem;
`

export const Score = styled.span`
    font-size: 1.125rem;
    font-weight: 700;
`

export const Placement = styled.span`
    font-size: 0.875rem;

    &::before {
        content: "(";
    }

    &::after {
        content: ")";
    }
`

export const Actions = styled.div`
    display: flex;
    column-gap: 0.5rem;
`

export const Button = styled.button`
    display: grid;
    place-items: center;

    border-radius: 0.5rem;
    min-height: 40px;
    padding: 0 1rem;

    &.order {
        margin-inline: auto 1rem;

        &.desc {
            svg {
                rotate: 180deg;
            }
        }
    }

    &.plain {
        background-color: transparent;

        color: var(--tumgglfbwft-button-text);

        &:hover {
            background-color: var(--tumgglfbwft-button-background);
        }
    }

    &.constructive {
        background-color: var(--tumgglfbwft-neutral-background);

        color: var(--tumgglfbwft-button-text);

        &:where(:not([disabled])):hover {
            background-color: var(--tumgglfbwft-neutral-background-hover);
        }

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

    svg {
        stroke-width: 2;
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
        background-color: var(--tumgglfbwft-success-background);

        color: var(--tumgglfbwft-success-text);
    }

    &.minus {
        flex-grow: 1;
        
        background-color: var(--tumgglfbwft-error-background);

        color: var(--tumgglfbwft-error-text);
    }
`

export const LastEmoji = styled.div`
    font-size: 1.5rem;
`

export const LastText = styled.div`
    font-size: 1rem;
    font-weight: 700;
    color: var(--tumgglfbwft-last-text);
`