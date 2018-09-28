import React, { Component } from 'react'
import { Easing, StyleSheet, Animated, Image, Text, View, Dimensions } from 'react-native'
import PropTypes from 'prop-types'
import NMPlayers from './NMPlayers'

const DEVICE_WIDTH  = Dimensions.get('window').width
const DEVICE_HEIGHT = Dimensions.get('window').height


export default class NLPlayer extends Component {
  static propTypes = {
    data: PropTypes.shape({
      challengers   : PropTypes.arrayOf(PropTypes.object),
      challengeList : PropTypes.arrayOf(PropTypes.object)
    })
  }

  static defaultProps = {
    data: {}
  }

  state = {
    animatedValue       : new Animated.Value(0),
    horizontalPosition  : new Animated.Value(0),
    verticalPosition    : new Animated.Value(0),
    leftImagePulse      : new Animated.Value(1),
    rightImagePulse     : new Animated.Value(1)
  }

  componentDidMount() {
    this._animate()
  }

  _animate = () => {
    Animated.sequence([
      Animated.spring(this.state.animatedValue, {
        toValue: 1
      }),
      Animated.timing(this.state.horizontalPosition, {
        toValue: 1,
        duration: 300,
        delay: 300
      }),
      Animated.timing(this.state.leftImagePulse, {
        toValue: 1.1,
        duration: 200,
        easing: Easing.ease
      }),
      Animated.timing(this.state.leftImagePulse, {
        toValue: 1,
        duration: 150,
        easing: Easing.ease
      }),
      Animated.timing(this.state.rightImagePulse, {
        toValue: 1.1,
        duration: 200,
        easing: Easing.ease
      }),
      Animated.timing(this.state.rightImagePulse, {
        toValue: 1,
        duration: 150,
        easing: Easing.ease
      }),
      Animated.timing(this.state.verticalPosition, {
        toValue: 1,
        duration: 500,
        easing: Easing.ease
      })
    ]).start()
  }

  _getUsers() {
    const { challengers } = this.props.data
    let challenger = challengers[0].isChallenging ? challengers[0] : challengers[1]
    let opponent   = challengers[0].isChallenging ? challengers[1] : challengers[0]

    return { challenger, opponent }
  }

  render() {
    const AVATAR_MIN_SIZE = 20
    const AVATAR_MAX_SIZE = 160
    const IMAGE_SEPERATION = 60
    const IMAGE_CONTAINER_START_POSITION = (DEVICE_HEIGHT / 2) - (AVATAR_MAX_SIZE/2)
    const IMAGE_CONTAINER_FINAL_POSITION = 60


    // Independent Avatar Aniamation
    const imageOpacity = this.state.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1]
    })

    const size = this.state.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [AVATAR_MIN_SIZE, AVATAR_MAX_SIZE]
    })

    const imageStyle = {
      width: size,
      height: size,
      opacity: imageOpacity
    }

    const leftPosition = this.state.horizontalPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -IMAGE_SEPERATION]
    })
    const rightPosition = this.state.horizontalPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [0, IMAGE_SEPERATION]
    })

    // Avatar Contianer Animation
    const topPosition = this.state.verticalPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [IMAGE_CONTAINER_START_POSITION, IMAGE_CONTAINER_FINAL_POSITION]
    })
    const mainContainerScale = this.state.verticalPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0.5]
    })
    const scale = {
      transform: [
        {scale: mainContainerScale}
      ]
    }

    const leftImageStyle = {
      ...imageStyle,
      transform: [
        {translateX: leftPosition},
        {translateY: topPosition},
        {scale: this.state.leftImagePulse}
      ]
    }

    const rightImageStyle = {
      ...imageStyle,
      transform: [
        {translateX: rightPosition},
        {translateY: topPosition},
        {scale: this.state.leftImagePulse}
      ]
    }

    const { challenger, opponent } = this._getUsers()

    return (
      <View style={styles.container}>
        <Animated.View style={[scale]}>
          <Animated.View style={[styles.avatarContainer, rightImageStyle]}>
            <Image
              onLoad={this._animate}
              style={{flex: 1}}
              source={{uri: challenger.photoUrl}}
              resizeMode='cover'
            />
          </Animated.View>

          <Animated.View style={[styles.avatarContainer, leftImageStyle]}>
            <Image
              onLoad={this._animate}
              style={{flex: 1}}
              source={{uri: opponent.photoUrl}}
              resizeMode='cover'
            />
          </Animated.View>
        </Animated.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  avatarContainer: {
    overflow: 'hidden',
    backgroundColor: '#FFF',
    borderRadius: 80,
    position: 'absolute',
    borderColor: 'white',
    borderWidth: 8,
    alignSelf: 'center'
  }
})
