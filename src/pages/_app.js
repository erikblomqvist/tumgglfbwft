import { GlobalStyles } from '@/styles/Global'
import { ThemeProvider } from 'styled-components'
import { light } from '@/styles/Theme.styled'

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={light}>
      <GlobalStyles />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
