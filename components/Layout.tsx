import Head from 'next/head'
import React from 'react'

const Layout = ({children}: any) => {
  return (
    <div>
    <Head>
      <title>Reelsy</title>
      <link rel="icon" href="/video-call.png" />
    </Head>
    <main>
      {children}
    </main>
  </div>
  )
}

export default Layout
