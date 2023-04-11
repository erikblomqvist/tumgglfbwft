import styled, { keyframes, createGlobalStyle } from 'styled-components'

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

const loader = keyframes`
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
`

export const Loader = styled.div`
    display: inline-block;
    width: 1em;
    height: 1em;
    color: inherit;
    vertical-align: middle;
    pointer-events: none;

	border: .2em solid transparent;
	border-top-color: currentcolor;
	border-radius: 50%;
	animation: 1s ${loader} linear infinite;
	position: relative;
    font-size: 4rem;

	&:before {
		content: "";
		display: block;
		width: inherit;
		height: inherit;
		position: absolute;
		top: -.2em;
		left: -.2em;
		border: .2em solid currentcolor;
		border-radius: 50%;
		opacity: .5;
	}
`