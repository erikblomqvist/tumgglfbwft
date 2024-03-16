import styled from 'styled-components'

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