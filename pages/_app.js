import { useState } from 'react'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const [ isFavorite, setIsFavorite ] = useState({}); 

  return <Component {...pageProps} isFavorite={isFavorite} setIsFavorite={setIsFavorite} />
}

export default MyApp
