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
  Image,
  TouchableOpacity,
} = React;

var CREATE_MEMO_ICON = require("image!createMemoIcon");

var moment = require("moment");

var Memo = React.createClass({

  onLayout: function(e) {
    var layout = e.nativeEvent.layout;
  },

  render: function() {
    // var  height = this.props.height || 200;
    var note = this.props.note;
    return (
      <View style={[styles.memo]}
        onLayout={this.onLayout}>
        <Text style={styles.memoText}>{note.text}</Text>
        <Text style={styles.memoCreatedAt}>{moment(notes.createdAt).fromNow()}</Text>
      </View>
    );
  },
});

var notes = [];

var notesIDCounter = 0;
function createNote(text) {
  var id = notesIDCounter++;
  notes.push({text: text, id: id, createdAt: new Date()});
}

createNote("You can't depend on your eyes when your imagination is out of focus.");
createNote("All you need in this life is ignorance and confidence, and then success is sure.");
createNote("Go to Heaven for the climate, Hell for the company.");
createNote("If you tell the truth, you don't have to remember anything.");

// TODO: prevent unblanced columns. I think one simple way to do is is to do a naive rendering pass (set opacity to 0).
// Capture all the layout events to get the rendered dimensions of all the content.

var AddMemoButton = React.createClass({
  getInitialState: function() {
    return {};
  },

  onLayout: function(e) {
    var layout = e.nativeEvent.layout;
    this.setState({width: layout.width});
  },

  render: function() {
    return (
      <TouchableOpacity>
        <View style={[styles.createMemoButton,{height: this.state.width}]} onLayout={this.onLayout}>
          <Image source={CREATE_MEMO_ICON}/>
        </View>
      </TouchableOpacity>
    )
  },
});

var MemoList = React.createClass({
  render: function() {
    var length = 10;
    var boxes1 = [];
    var boxes2 = [];

    boxes1.push(<AddMemoButton/>)

    // var notes
    for (var i = 0; i < notes.length; i++) {
      var note = notes[i];
      var boxes = i % 2 == 0 ? boxes2 : boxes1;
      var randHeight = Math.random() * 100 + 150;
      boxes.push(<Memo id={note.id} note={note}/>);
    }

    return (
      <ScrollView style={styles.scrollView}>
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
  scrollView: {
    backgroundColor: "#E8E8E8",
  },

  container: {
    flex: 1,
    flexDirection: 'row',
  },

  column: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },

  createMemoButton: {
    marginRight: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#F9F9F9',
  },

  memo: {
    marginRight: 10,
    marginBottom: 10,
    padding: 5,

    backgroundColor: '#F9F9F9',
  },

  memoText: {
    fontSize: 18,
    color: '#656565',
  },

  memoCreatedAt: {
    marginTop: 18,
    textAlign: 'right',
    color: '#ACACAC',
  },
});

AppRegistry.registerComponent('Memo', () => MemoList);
