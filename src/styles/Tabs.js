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

    ${({ active, theme }) => {
        if(active) {
            return css`
                background-color: ${theme.colors.neutral.background};

                color: ${theme.colors.neutral.text};
            `
        } else {
            return css`
                background-color: ${theme.colors.content.background};
            
                color: ${theme.colors.content.text};
            `
        }
    }}
`