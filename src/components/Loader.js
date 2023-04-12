import styled, { keyframes } from 'styled-components'

const scaleUp  = keyframes`
    0% {
        scale: 0;
    }
    60%, 100% {
        scale: 1;
    }
`

const pulse = keyframes`
    0%, 60%, 100% {
        scale: 1;
    }
    80% {
        scale: 1.2;
    }
`

export const Loader = styled.div`
    position: fixed;
    z-index: 5;
    top: 50%;
    left: 50%;
    
    display: inline-block;

    border: 5px solid ${({ theme }) => theme.colors.loader};
    border-radius: 50%;
    width: 3em;
    height: 3em;
    opacity: 0.8;

    animation: ${pulse} 1s linear infinite;
    translate: -50% -50%;

    &::after {
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;

        display: inherit;

        border: inherit;
        border-radius: inherit;
        width: inherit;
        height: inherit;

        animation: ${scaleUp} 1s linear infinite;
        translate: inherit;
    }
`