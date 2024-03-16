import styled, { css } from 'styled-components'

export const Tabs = styled.div`
    display: flex;

    margin-bottom: 1rem;
`

export const Tab = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;

    margin: 0;
    border: 0;
    border-radius: 0;
    min-width: 80px;
    padding: 0.75rem 1rem;
    background-color: transparent;

    white-space: normal;
    overflow: hidden;

    color: var(--tumgglfbwft-content-text);

    &:first-child {
        border-top-left-radius: 0.5rem;
        border-bottom-left-radius: 0.5rem;
    }

    &:last-child {
        border-top-right-radius: 0.5rem;
        border-bottom-right-radius: 0.5rem;
    }

    ${({ active }) => {
        if(active) {
            return css`
                background-color: var(--tumgglfbwft-neutral-background);
            `
        } else {
            return css`
                background-color: var(--tumgglfbwft-content-background);
            `
        }
    }}
`