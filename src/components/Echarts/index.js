import React, {Component, useEffect, useRef} from 'react';
import {View, StyleSheet, Platform, ActivityIndicator} from 'react-native';
import renderChart from './renderChart';
import echarts from './echarts.min';
import WebView from "react-native-webview";
import getTpl from "./tpl" ;

const App = (props) => {
    const webViewRef = useRef();

    useEffect(() => {
        webViewRef.current.reload();
    }, [props.option])

    return <View style={{flex: 1, height: props.height || 400,}}>
        <WebView
            ref={webViewRef}
            scrollEnabled={false}
            injectedJavaScript={renderChart(props)}
            originWhitelist={['*']}
            source={{html: getTpl()}}
            style={{
                height: props.height || 400,
                backgroundColor: props.backgroundColor || 'transparent'
            }}
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
                props.onError && props.onError(err);
            }}
            onHttpError={(err) => {
                props.onError && props.onError(err);
            }}
            onMessage={event => props.onPress ? props.onPress(JSON.parse(event.nativeEvent.data)) : null}
        />
    </View>
};

export default App;
