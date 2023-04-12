import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    body {
        margin: 0;
        background-color: hsl(0, 0%, 100%);

        color: hsl(0, 1%, 16%);
        font-family: 'Work Sans', sans-serif;

        .EmojiPickerReact {
            margin-bottom: 1rem;

            * {
                font-family: 'Work Sans', sans-serif;
            }

            .epr-preview .epr-preview-emoji-label {
                text-transform: unset;

                &::first-letter {
                    text-transform: uppercase;
                }
            }
        }
    }

    h1 {
        font-size: max(1rem, 2.3vw);
    }

    button {
        border: none;
        border-radius: 0;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;

        &[disabled] {
            cursor: not-allowed;
        }
    }

    input {
        font-family: 'Work Sans', sans-serif;
    }
`