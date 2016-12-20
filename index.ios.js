/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
var formatTime = require('minutes-seconds-milliseconds');
var StopWatch = React.createClass({
  getInitialState:function() {
    return{
      timeElapsed:null,
      running:false,
      startTime:null
    }
  },
  render:function() {
    return(
      <View style = {styles.container}>

      <View style = {[styles.header]}>
        <View style = {[styles.timerWrapper]}>
          <Text style = {styles.timer}>{formatTime(this.state.timeElapsed)}</Text>
        </View>
        <View style = {[styles.buttonWrapper]}>
          {this.startStopButton()}
          {this.lapButton()}
        </View>
      </View>
      <View style = {[styles.footer]}>
        <Text>Im a list of Laps</Text>
      </View>

      </View>


    )

  },
  startStopButton:function() {
    var style = this.state.running ? styles.stopButton : styles.startButton;
    return(
      <TouchableHighlight underlayColor="gray" onPress = {this.handlePress} style ={[styles.button,style]}>
        <Text>{this.state.running? 'Stop' : 'Start'}</Text>
      </TouchableHighlight>
    )
  },
  lapButton:function() {

    return(

      <TouchableHighlight underlayColor = "gray" onPress = {this.handleLapPress} style = {styles.button}><Text>Lap</Text></TouchableHighlight>
    )
  },
  handleLapPress:function() {
    var lap = this.state.timeElapsed;
    this.setState({
      startTime:new Date()
    })
  },
  handlePress:function() {
    if(this.state.running){
      clearInterval(this.interval);
      this.setState({running:false});
      return
    }
    this.setState({startTime: new Date()})
    this.interval = setInterval(()=>{
      this.setState({
        timeElapsed:new Date() - this.state.startTime,
        running:true
      });
    },30)
  }

})
var styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'stretch'
  },
  header:{
    flex:1

  },
  footer:{
    flex:1
  },
  timerWrapper:{
    flex:5,
    justifyContent:'center',
    alignItems:'center'
  },
  buttonWrapper:{
   flex:3,
   flexDirection:'row',
   justifyContent:'space-around',
   alignItems:'center'
 },
 timer:{
   fontSize:60
 },
 button:{
   borderWidth:2,
   height:100,
   width:100,
   borderRadius:50,
   justifyContent:'center',
   alignItems:'center'

 },
 startButton:{
   borderColor:'#00FF00'
 },
 stopButton:{
   borderColor:'#CC0000'
 }
})

AppRegistry.registerComponent('stopwatch', () => StopWatch);
