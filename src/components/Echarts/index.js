import React, { Component } from 'react';
import {  View, StyleSheet, Platform, ActivityIndicator } from 'react-native';
import renderChart from './renderChart';
import echarts from './echarts.min';
import WebView from "react-native-webview";
import getTpl from "./tpl" ;

export default class App extends Component {

  constructor(props) {
    super(props);
    this.setNewOption = this.setNewOption.bind(this);
  }


  componentWillReceiveProps(nextProps) {
      //alert('here');
      this.refs.chart.reload()
    /*if(nextProps.option !== this.props.option) {
      //this.refs.chart.reload();
      if(Platform.OS === 'android'){
        this.refs.chart.reload();
      }else {
        this.setNewOption(nextProps.option) ;
      }
    }*/
  }
  shouldComponentUpdate() {
    return false ;
  }

  setNewOption(option) {
    this.refs.chart.postMessage(JSON.stringify(option));
  }

  render() {
    return (
        <View style={{flex: 1, height: this.props.height || 400,}}>
          <WebView
              ref="chart"
              scrollEnabled = {false}
              injectedJavaScript = {renderChart(this.props)}
              style={{
                height: this.props.height || 400,
                backgroundColor: this.props.backgroundColor || 'transparent'
              }}
              originWhitelist={['*']}
              source={{html:getTpl() }}
              renderLoading={() => <ActivityIndicator
                  style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      jusityContent: "space-around",
                      flexWrap: "wrap",
                      alignContent: "center",
                  }}
                  size="small"
              />}
              onError={(err) => {
                  this.props.onError && this.props.onError(err);
              }}
              onHttpError={(err) => {
                  this.props.onError && this.props.onError(err);
              }}
              onMessage={event => this.props.onPress ? this.props.onPress(JSON.parse(event.nativeEvent.data)) : null}
          />
        </View>
    );
  }
}
