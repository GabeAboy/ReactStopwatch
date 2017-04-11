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
var addit=0
var StopWatch = React.createClass({
  getInitialState:function() {
    return{
      timeElapsed:null,
      running:false,
      startTime:null,
      laps:[]
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
          {this.laps()}
        </View>
        <View style ={styles.footersFotter}>
          <TouchableHighlight underlayColor='orange' onPress = {this.handleReset} style = {styles.reset}>
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableHighlight>
        </View>
      </View>


    )

  },
  handleReset:function() {
    this.state.laps=[]
    this.state.timeElapsed=null
    if(this.state.running){
      clearInterval(this.interval);
      this.setState({running:false});
      return
    }

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

      <TouchableHighlight underlayColor = "gray" onPress = {this.handleLapPress} style = {[styles.button]}><Text>Lap</Text></TouchableHighlight>
    )
  },
  laps:function() {

    return this.state.laps.map(function(time,index) {
      return(
      <View key = {index} style = {styles.lap}>
        <Text style = {styles.lapText}>Lap #{time.index}</Text>
        <Text style = {styles.lapText}>{formatTime(time.time)}</Text>
      </View>)
    })
  },
  handleLapPress:function() {
    addit++
    var lap = {time:this.state.timeElapsed,index:addit};
    this.setState({
      startTime:new Date(),
      laps:this.state.laps.concat([lap])
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
      if(this.state.laps.length>8)this.state.laps.shift()
    },30)
  }

})
var styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'stretch'
  },
  header:{
    flex:4

  },
  footer:{
    flex:4
  },
  reset:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'red'
  },
  buttonText:{
    fontSize:50,
    color:'black',
    letterSpacing:1,

  },
  footersFotter:{
    flex:2,
    flexDirection:'row',
    backgroundColor:'blue'
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
 },
 lap:{
   justifyContent:'space-around',
   flexDirection:'row'
 },
 lapText:{
   fontSize:30
 }
})

AppRegistry.registerComponent('stopwatch', () => StopWatch);
