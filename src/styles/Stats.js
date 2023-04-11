import styled from 'styled-components'

export const Stats = styled.div`
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 1fr;
    align-items: center;

    margin-bottom: 1rem;
`

export const Stat = styled.div``

export const StatLabel = styled.p`
    margin: 0;

    font-size: 0.875rem;
    text-transform: lowercase;
`

export const StatValue = styled.p`
    margin: 0;

    font-size: 1.5rem;
    font-weight: 700;
`