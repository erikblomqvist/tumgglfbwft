import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    :root {
        --tumgglfbwft-color-neutral-0: hsl(0, 0%, 100%);
        --tumgglfbwft-color-neutral-10: hsl(0, 0%, 97%);
        --tumgglfbwft-color-neutral-20: hsl(0, 0%, 93%);
        --tumgglfbwft-color-neutral-30: hsl(0, 0%, 87%);
        --tumgglfbwft-color-neutral-40: hsl(0, 0%, 80%);
        --tumgglfbwft-color-neutral-50: hsl(0, 0%, 70%);
        --tumgglfbwft-color-neutral-60: hsl(0, 0%, 50%);
        --tumgglfbwft-color-neutral-70: hsl(0, 0%, 23%);
        --tumgglfbwft-color-neutral-80: hsl(0, 0%, 14%);
        --tumgglfbwft-color-neutral-90: hsl(0, 0%, 7%);
        --tumgglfbwft-color-neutral-100: hsl(0, 0%, 0%);

        --tumgglfbwft-color-primary-10: hsl(213, 73%, 11%);
        --tumgglfbwft-color-primary-20: hsl(213, 73%, 21%);
        --tumgglfbwft-color-primary-30: hsl(213, 73%, 31%);
        --tumgglfbwft-color-primary-40: hsl(213, 73%, 41%);
        --tumgglfbwft-color-primary-50: hsl(213, 73%, 51%);
        --tumgglfbwft-color-primary-60: hsl(213, 73%, 61%);
        --tumgglfbwft-color-primary-70: hsl(213, 73%, 71%);
        --tumgglfbwft-color-primary-80: hsl(213, 73%, 81%);
        --tumgglfbwft-color-primary-100: hsl(213, 73%, 100%);

        --tumgglfbwft-color-secondary-10: hsl(47, 86%, 25%);
        --tumgglfbwft-color-secondary-20: hsl(47, 86%, 35%);
        --tumgglfbwft-color-secondary-30: hsl(47, 86%, 45%);
        --tumgglfbwft-color-secondary-40: hsl(47, 86%, 55%);
        --tumgglfbwft-color-secondary-50: hsl(47, 86%, 65%);
        --tumgglfbwft-color-secondary-60: hsl(47, 86%, 75%);
        --tumgglfbwft-color-secondary-70: hsl(47, 86%, 85%);
        --tumgglfbwft-color-secondary-80: hsl(47, 86%, 90%);
        --tumgglfbwft-color-secondary-90: hsl(47, 92%, 95%);
        --tumgglfbwft-color-secondary-100: hsl(47, 90%, 100%);

        --tumgglfbwft-color-tertiary-10: hsl(136, 17%, 37%);
        --tumgglfbwft-color-tertiary-20: hsl(136, 27%, 47%);
        --tumgglfbwft-color-tertiary-30: hsl(136, 37%, 57%);
        --tumgglfbwft-color-tertiary-40: hsl(136, 47%, 57%);
        --tumgglfbwft-color-tertiary-50: hsl(136, 57%, 77%);
        --tumgglfbwft-color-tertiary-60: hsl(136, 67%, 87%);
        --tumgglfbwft-color-tertiary-70: hsl(136, 77%, 92%);
        --tumgglfbwft-color-tertiary-80: hsl(136, 87%, 95%);
        --tumgglfbwft-color-tertiary-90: hsl(136, 92%, 95%);
        --tumgglfbwft-color-tertiary-100: hsl(136, 97%, 98%);

        --tumgglfbwft-color-error-40: hsl(0, 80%, 66%);
        --tumgglfbwft-color-error-50: hsl(0, 80%, 56%);
        --tumgglfbwft-color-error-90: hsl(14, 92%, 95%);

        --tumgglfbwft-shadow: hsla(0, 0%, 0%, 0.1);

        --tumgglfbwft-loader: var(--tumgglfbwft-color-primary-40);

        --tumgglfbwft-content-background: var(--tumgglfbwft-color-neutral-10);
        --tumgglfbwft-content-text: var(--tumgglfbwft-color-neutral-90);

        --tumgglfbwft-container-background: var(--tumgglfbwft-color-neutral-0);
        --tumgglfbwft-container-text: var(--tumgglfbwft-color-neutral-70);

        --tumgglfbwft-button-background: var(--tumgglfbwft-color-neutral-20);
        --tumgglfbwft-button-text: var(--tumgglfbwft-color-neutral-100);

        --tumgglfbwft-success-background: var(--tumgglfbwft-color-tertiary-90);
        --tumgglfbwft-success-text: var(--tumgglfbwft-color-tertiary-40);

        --tumgglfbwft-error-background: var(--tumgglfbwft-color-error-90);
        --tumgglfbwft-error-text: var(--tumgglfbwft-color-error-40);

        --tumgglfbwft-neutral-background: var(--tumgglfbwft-color-primary-80);
        --tumgglfbwft-neutral-background-hover: var(--tumgglfbwft-color-primary-70);
        --tumgglfbwft-neutral-text: var(--tumgglfbwft-color-primary-40);

        --tumgglfbwft-last-background: hsl(45, 100%, 66%);
        --tumgglfbwft-last-text: hsl(45, 100%, 7%);

        --tumgglfbwft-bar-negative: var(--tumgglfbwft-color-error-40);
        --tumgglfbwft-bar-positive: var(--tumgglfbwft-color-tertiary-40);

        @media (prefers-color-scheme: dark) {
            --tumgglfbwft-content-background: var(--tumgglfbwft-color-neutral-90);
            --tumgglfbwft-content-text: var(--tumgglfbwft-color-neutral-10);

            --tumgglfbwft-container-background: var(--tumgglfbwft-color-neutral-80);
            --tumgglfbwft-container-text: var(--tumgglfbwft-color-neutral-0);

            --tumgglfbwft-button-background: var(--tumgglfbwft-color-neutral-70);
            --tumgglfbwft-button-text: var(--tumgglfbwft-color-neutral-0);

            --tumgglfbwft-success-background: var(--tumgglfbwft-color-tertiary-40);
            --tumgglfbwft-success-text: var(--tumgglfbwft-color-tertiary-70);

            --tumgglfbwft-error-background: var(--tumgglfbwft-color-error-40);
            --tumgglfbwft-error-text: var(--tumgglfbwft-color-error-90);

            --tumgglfbwft-neutral-background: var(--tumgglfbwft-color-primary-20);
            --tumgglfbwft-neutral-background-hover: var(--tumgglfbwft-color-primary-30);
            --tumgglfbwft-neutral-text: var(--tumgglfbwft-color-primary-60);

            --tumgglfbwft-last-background: hsl(45, 100%, 11%);
            --tumgglfbwft-last-text: hsl(45, 100%, 66%);

            --tumgglfbwft-bar-negative: var(--tumgglfbwft-color-error-40);
            --tumgglfbwft-bar-positive: var(--tumgglfbwft-color-tertiary-40);
        }
    }

    body {
        margin: 0;
        background-color: var(--tumgglfbwft-content-background);

        color: var(--tumgglfbwft-content-text);
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