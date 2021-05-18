/* eslint-disable no-console */
import 'react-native-gesture-handler'
import React, { useState } from 'react'
import MainNavigation from './navigation/navigation'
import { Provider } from 'react-redux'
import { store, persistore } from './stores'
import { enableScreens } from 'react-native-screens'
import { PersistGate } from 'redux-persist/integration/react'
enableScreens()

import PubNub from 'pubnub'
import { PubNubProvider, usePubNub } from 'pubnub-react'
import { useEffect } from 'react'
import { showNotification } from '..'

const pubnub = new PubNub({
  publishKey: 'pub-c-e453b6d7-572d-4018-9145-9fcfdc644115',
  subscribeKey: 'sub-c-d6796aac-b398-11eb-8cd6-ee35b8e5702f',
  secretKey: 'sec-c-MmY1ODgwZGQtNTJjOS00NDU3LTgzNWYtMDA4NTMxYTI5MGQ4',
  uuid: 'consumer'
})

const App = () => {
  console.disableYellowBox = true

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistore}>
          {/* <SocketContext.Provider value={socket}> */}
          <PubNubProvider client={pubnub}>
            <MainNavigation />
          </PubNubProvider>
          {/* </SocketContext.Provider> */}
        </PersistGate>
      </Provider>
    </>
  )
}

export default App
