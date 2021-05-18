import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

export const OrderToggle = ({ onChange = selectedValue => {} }) => {
  const [selectd, setSelected] = useState('pending')

  const onSelect = value => {
    setSelected(value)
    onChange(value)
  }

  return (
    <View style={styles.row}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => onSelect('pending')}
        style={
          selectd == 'pending'
            ? [styles.activeBtn, { left: 30 }]
            : [styles.inActiveBtn, { left: 30 }]
        }>
        <Text>Pending</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => onSelect('completed')}
        style={
          selectd == 'completed' ? [styles.activeBtn] : [styles.inActiveBtn]
        }>
        <Text>Completed</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  inActiveBtn: {
    backgroundColor: '#F1F2FA',
    borderRadius: 35,
    alignItems: 'center',
    width: '48%',
    padding: 20
  },
  activeBtn: {
    backgroundColor: '#FFBE00',
    borderRadius: 35,
    alignItems: 'center',
    overflow: 'hidden',
    width: '48%',
    padding: 20
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    marginTop: 50
  }
})
