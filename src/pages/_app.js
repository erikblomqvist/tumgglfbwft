import { GlobalStyles } from '@/styles/Global'
import { ThemeProvider } from 'styled-components'
import AuthProvider from '@/contexts/auth'
import { light } from '@/styles/Theme.styled'

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ThemeProvider theme={light}>
        <GlobalStyles />
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthProvider>
  )
}
