import styled from 'styled-components'

export const FABButton = styled.button`
    position: fixed;
    z-index: 2;
    bottom: 1rem;
    right: 1rem;

    border-radius: 16px;
    width: 56px;
    height: 56px;
    box-shadow: 0 0.125rem 0.125rem hsla(0, 0%, 0%, 0.1);
    background-color: var(--tumgglfbwft-button-background);

    color: var(--tumgglfbwft-button-text);

    svg {
        stroke-width: 2;
    }
`