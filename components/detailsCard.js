import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import CardBase from './base/CardBase'
import { BORDER_PRIMARY } from '../constants/colors'

const DetailsCard = (props) => {
    return (
        <CardBase style={styles.card}>
        <View style={styles.fieldContainer}>
          <Text>{props.title}</Text>
        </View>
        <View style={styles.dataContainer}>
          <Text>{props.content}</Text>
        </View>
      </CardBase>
    )
}

const styles = StyleSheet.create({
    card: {
        width: "90%",
        marginTop: 10,
        flexDirection: "row",
        borderRadius: 10,
      },
      fieldContainer: {
        flex: 1,
        padding: 10,
        justifyContent: 'center'
      },
      dataContainer: {
        flex: 2,
        borderLeftColor: BORDER_PRIMARY,
        borderLeftWidth: StyleSheet.hairlineWidth,
        padding: 10,
      },
})

export default DetailsCard
