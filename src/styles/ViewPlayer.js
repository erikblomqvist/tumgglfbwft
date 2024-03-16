import styled from 'styled-components'
import { Button as ButtonBase } from '@/styles/Home'

export const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 1rem;
`
    
export const User = styled.div`
    display: flex;
    align-items: center;
    column-gap: 1rem;
`

export const Emoji = styled.p`
    margin: 0;
    
    font-size: 1.5rem;
`
    
export const Name = styled.p`
    margin: 0;

    font-size: 1.125rem;
    font-weight: 700;
`

export const Score = styled.p`
    margin: 0;

    font-size: 1.125rem;
    font-weight: 700;
`

export const Button = ButtonBase

export const CustomTooltipWrapper = styled.div`
    padding: 0.5rem;
    background-color: var(--tumgglfbwft-content-background);
`