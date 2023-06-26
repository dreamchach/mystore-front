import '@/styles/globals.css'
import Layout from '../components/layout/Layout'
import { CookiesProvider } from 'react-cookie'
import { Provider } from 'react-redux'
import { store } from '@/store'

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <CookiesProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CookiesProvider>
    </Provider>
  )
}
