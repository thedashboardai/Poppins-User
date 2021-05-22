import React from 'react'
import { View, Text } from 'react-native'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../screens/Home/Home.screen'

import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwsome from 'react-native-vector-icons/FontAwesome'
import { Notification } from '../screens/Notification/Notification'
import Settings from '../screens/Settings'
import { Order } from '../screens/Order/order'

const Tab = createBottomTabNavigator()

function BottomTabs() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#FFBE00',
        inactiveTintColor: '#D3D8DF'
      }}
      initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return <Ionicons name={'ios-home'} size={25} color={color} />
          }
        }}
      />
      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Ionicons name={'ios-notifications'} size={25} color={color} />
            )
          },
          tabBarBadge: 0,
          tabBarBadgeStyle: {
            backgroundColor: '#FFBE00'
          }
        }}
      />
      <Tab.Screen
        name="Orders"
        component={Order}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return <FontAwsome name={'shopping-bag'} size={25} color={color} />
          }
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return <Ionicons name={'ios-settings'} size={25} color={color} />
          }
        }}
      />
    </Tab.Navigator>
  )
}

export default BottomTabs
