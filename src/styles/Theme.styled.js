const palette = {
    primary: {
        10: 'hsl(213, 73%, 11%)',
        20: 'hsl(213, 73%, 21%)',
        30: 'hsl(213, 73%, 31%)',
        40: 'hsl(213, 73%, 41%)',
        50: 'hsl(213, 73%, 51%)',
        60: 'hsl(213, 73%, 61%)',
        70: 'hsl(213, 73%, 71%)',
        80: 'hsl(213, 73%, 81%)',
        100: 'hsl(213, 73%, 100%)'
    },
    secondary: {
        10: 'hsl(47, 86%, 25%)',
        20: 'hsl(47, 86%, 35%)',
        30: 'hsl(47, 86%, 45%)',
        40: 'hsl(47, 86%, 55%)',
        50: 'hsl(47, 86%, 65%)',
        60: 'hsl(47, 86%, 75%)',
        70: 'hsl(47, 86%, 85%)',
        80: 'hsl(47, 86%, 90%)',
        90: 'hsl(47, 92%, 95%)',
        100: 'hsl(47, 90%, 100%)'
    },
    tertiary: {
        10: 'hsl(136, 17%, 37%)',
        20: 'hsl(136, 27%, 47%)',
        30: 'hsl(136, 37%, 57%)',
        40: 'hsl(136, 47%, 57%)',
        50: 'hsl(136, 57%, 77%)',
        60: 'hsl(136, 67%, 87%)',
        70: 'hsl(136, 77%, 92%)',
        80: 'hsl(136, 87%, 95%)',
        90: 'hsl(136, 92%, 95%)',
        100: 'hsl(136, 97%, 98%)'
    },
    error: {
        40: 'hsl(0, 80%, 66%)',
        90: 'hsl(14, 92%, 95%)'
    }
}

export const light = {
    name: 'light',
    colors: {
        loader: palette.primary[40],
        content: {
            background: 'hsl(0, 0%, 97%)',
            text: 'hsl(0, 0%, 23%)'
        },
        container: {
            background: 'hsl(0, 0%, 100%)',
            text: 'hsl(0, 0%, 23%)'
        },
        success: {
            background: palette.tertiary[90],
            text: palette.tertiary[40]
        },
        error: {
            background: palette.error[90],
            text: palette.error[40]
        },
        neutral: {
            background: palette.secondary[90],
            text: palette.primary[40]
        }
    }
}

export const dark = {
    name: 'dark',
    colors: {
        content: {
            background: 'hsl(0, 0%, 23%)',
            text: 'hsl(0, 0, 100%)'
        },
        card: {
            background: 'hsl(0, 0%, 30%)',
            text: 'hsl(0, 0, 100%)'
        },
        success: {
            background: 'hsl(136, 92%, 95%)',
            text: 'hsl(136, 47%, 57%)'
        },
        error: {
            background: 'hsl(14, 92%, 95%)',
            text: 'hsl(0, 80%, 66%)'
        }
    }
}