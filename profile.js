import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Switch,
  Slider,
} from 'react-native'
import * as firebase from 'firebase'
import CircleImage from '../components/circleImage'



export default class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ageRangeValues: 18,
      distanceValue: 5,
      showMen: false,
      showWomen: false,
    }
  }
  getVal(val) {
    console.warn(val);
  }

  updateUser = (key, value) => {
    const {uid} = this.props.user
    firebase.database().ref('users').child(uid)
      .update({[key]:value})
  }


  render() {
    const {first_name, work, id} = this.props.user
    const {ageRangeValues, distanceValue, showMen, showWomen} = this.state
    const bio = (work && work[0] && work[0].position) ? work[0].position.name : null
    return (
      <View style={styles.container}>
        <View style={styles.profile}>
          <CircleImage facebookID={id} size={120} />
          <Text style={{fontSize:20}}>{first_name}</Text>
          <Text style={{fontSize:15, color:'darkgrey'}}>{bio}</Text>
        </View>
        <View style={styles.container}>
          <Slider
            style={{ width: 300 }}
            step={1}
            minimumValue={18}
            maximumValue={71}
            value={this.state.ageRangeValues}
            onValueChange={val => this.setState({ ageRangeValues: val })}
            onSlidingComplete={val => this.getVal(val)}
            onValuesChangeFinish={val => this.updateUser('ageRange', val)}
          />
          <Text style={styles.welcome}>
          {this.state.ageRangeValues}
        </Text>            
        <Text style={styles.instructions}>
          Age Range
        </Text>
          <Slider
            style={{ width: 300 }}
            step={1}
            minimumValue={1}
            maximumValue={35}
            value={this.state.distanceValue}
            onValueChange={val => this.setState({ distanceValue: val })}
            onSlidingComplete={val => this.getVal(val)}
            onValuesChangeFinish={val => this.updateUser('distance', val[0])}
          />
          <Text style={styles.welcome}>
          {this.state.distanceValue}
        </Text>            
        <Text style={styles.instructions}>
          Distance
        </Text>
        <View style={styles.switch}>
          <Text>Show Men</Text>
          <Switch
            value={showMen}
            onValueChange={val => this.setState({showMen:val})}
          />
        </View>
        <View style={styles.switch}>
          <Text>Show Women</Text>
          <Switch
            value={showWomen}
            onValueChange={val => this.setState({showWomen:val})}
          />
        </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    marginBottom: 10,
  },
  profile: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 20,
    marginRight: 20,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  switch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 10,
  },

});


