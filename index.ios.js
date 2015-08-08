/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
} = React;

var Box = React.createClass({

  onLayout: function(e) {
    var layout = e.nativeEvent.layout;
    console.log(layout);
  },

  render: function() {
    var  height = this.props.height || 200;
    return (
      <View style={[styles.box,{height: height}]}
        onLayout={this.onLayout}>
      </View>
    );
  },
});

var Memo = React.createClass({
  render: function() {
    // Math.random() * 100 + 150
    var length = 10;
    var boxes1 = [];
    var boxes2 = [];
    for (var i = 0; i < length; i++) {
      var boxes = i % 2 == 0 ? boxes1 : boxes2;
      var randHeight = Math.random() * 100 + 150;
      boxes.push(<Box height={randHeight}/>);
    }

    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={[styles.column,{paddingLeft: 10}]}>
            {boxes1}
          </View>

          <View style={styles.column}>
            {boxes2}
          </View>
        </View>
      </ScrollView>

    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#F5FCFF',
  },

  column: {
    flex: 1,
    flexDirection: 'column',
    // margin: 5,
    backgroundColor: 'rgba(255,0,0,0.4)',
  },

  box: {
    // width: 50,
    height: 300,
    backgroundColor: 'yellow',
    marginRight: 10,
    marginBottom: 10,
  },
});

AppRegistry.registerComponent('Memo', () => Memo);
