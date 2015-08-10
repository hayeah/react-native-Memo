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
createNote("Philosophy is a battle against the bewitchment of our intelligence by means of language.");
createNote("Death is not an event in life: we do not live to experience death. If we take eternity to mean not infinite temporal duration but timelessness, then eternal life belongs to those who live in the present. Our life has no end in the way in which our visual field has no limits.");
createNote("We are asleep. Our Life is a dream. But we wake up sometimes, just enough to know that we are dreaming.");

// TODO: prevent unblanced columns. I think one simple way to do is is to do a naive rendering pass (set opacity to 0).
// Capture all the layout events to get the rendered dimensions of all the content.

var AddMemoButton = React.createClass({
  getInitialState: function() {
    return {};
  },

  onLayout: function(e) {
    // var layout = e.nativeEvent.layout;
    // this.setState({width: layout.width});
  },

  render: function() {
    var isMeasured = this.props.actualWidth != null;
    var hideOrShow = isMeasured ? {height: this.props.actualWidth} : {opacity: 0};

    return (
      <TouchableOpacity>
        <View style={[styles.createMemoButton,hideOrShow]} onLayout={this.props.onLayout}>
          <Image source={CREATE_MEMO_ICON}/>
        </View>
      </TouchableOpacity>
    )
  },
});

var MemoList = React.createClass({
  getInitialState: function() {
    return {
      renderedAddButton: null,
      // renderedMemos: [],
      viewToMeasure: null,
      column1: [],
      column2: [],
      height1: 0,
      height2: 0,
      renderedItemCount: 0,
    };
  },

  componentWillMount: function() {
    this.renderAndMeasureAddButton(this.renderNextMemo);
  },

  renderAndMeasureAddButton: function(done) {
    if(this.state.renderedAddButton == null) {
      console.log("measure button");
      var view = <AddMemoButton onLayout={(e) => {
        var layout = e.nativeEvent.layout;
        console.log("button layout",layout);
        this.setState({
          renderedAddButton: <AddMemoButton key="add-button" actualWidth={layout.width}/>,
          height1: layout.width,
          viewToMeasure: null,
        },done);
      }}/>;
      this.setState({viewToMeasure: view});
    }
  },

  renderNextMemo: function() {
    var memos = notes;
    console.log(this.state.renderedItemCount, "<", memos.length);
    if(this.state.renderedItemCount < memos.length) {
      var memo = memos[this.state.renderedItemCount];
      var view = <View key={this.state.renderedItemCount} style={{opacity:0}} onLayout={(e) => {
        var layout = e.nativeEvent.layout;

        var memoView = <Memo key={memo.id} note={memo}/>;
        var changes;
        if(this.state.height1 > this.state.height2) {
          changes = {
            height2: this.state.height2 + layout.height,
            column2: this.state.column2.concat([memoView]),
          }
        } else {
          changes = {
            height1: this.state.height1 + layout.height,
            column1: this.state.column1.concat([memoView]),
          }
        }

        this.setState(Object.assign(changes,{
          renderedItemCount: this.state.renderedItemCount+1
        }),this.renderNextMemo);

      }}>
        <Memo key={memo.id} note={memo}/>
      </View>;

      this.setState({viewToMeasure: view});
    } else {
      this.setState({viewToMeasure: null});
    }
  },

  render: function() {
    return (
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <View style={[styles.column,{paddingLeft: 10}]}>
            {this.state.renderedAddButton}
            {this.state.column1}
            {this.state.viewToMeasure}
          </View>

          <View style={styles.column}>
            {this.state.column2}
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
