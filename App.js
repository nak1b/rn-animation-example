import React from 'react'
import { StyleSheet, View } from 'react-native'
import NMPlayers from './NMPlayers'

const data = {
  challengers : [
    {
      isChallenging: true,
      photoUrl : 'http://i.pravatar.cc/150?img=7',
      Name: 'User One'
    },
    {
      isChallenging: false,
      photoUrl : 'http://i.pravatar.cc/150?img=10',
      Name: 'User Two'
    }
  ],
  challengeList : [
    {name: 'Movies', icon:''},
    {name: 'Sex', icon: ''}
  ]
}

export default class App extends React.Component {
  render() {
    return (
      <NMPlayers data={data} />
    )
  }
}
