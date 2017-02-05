import React, { PureComponent, PropTypes } from "react";
import { connect } from "react-redux";
import { fetchData, changeUserName, changeUserAge, sendTweet } from "../actions";
import "./App.css";

class App extends PureComponent {
  static propTypes = {
    fetchData: PropTypes.func.isRequired,
    changeUserName: PropTypes.func.isRequired,
    changeUserAge: PropTypes.func.isRequired,
    sendTweet: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.onClickFetchDataButton = this.onClickFetchDataButton.bind(this);
    this.onClickChangeUserNameButton = this.onClickChangeUserNameButton.bind(this);
    this.onClickChangeUserAgeButton = this.onClickChangeUserAgeButton.bind(this);
    this.onClickSendTweetButton = this.onClickSendTweetButton.bind(this);
  }

  onClickFetchDataButton(e) {
    this.props.fetchData();
  }

  onClickChangeUserNameButton(e) {
    this.props.changeUserName(this.refs.name.value);
  }

  onClickChangeUserAgeButton(e) {
    this.props.changeUserAge(parseInt(this.refs.age.value, 10));
  }

  onClickSendTweetButton(e) {
    this.props.sendTweet(this.refs.tweet.value);
  }

  render() {
    return (
      <div className="app">
        <div>
          <button onClick={this.onClickFetchDataButton}>Fetch Data</button>
        </div>
        <div>
          <label>User Name: <input ref="name" /></label>
          <button onClick={this.onClickChangeUserNameButton}>Change</button>
        </div>
        <div>
          <label>User Age: <input ref="age" /></label>
          <button onClick={this.onClickChangeUserAgeButton}>Change</button>
        </div>
        <div>
          <label>Tweet: <input ref="tweet" /></label>
          <button onClick={this.onClickSendTweetButton}>Send</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  name: state.user.name,
  age: state.user.age
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchData: () => dispatch(fetchData()),
  changeUserName: (name) => dispatch(changeUserName(name)),
  changeUserAge: (age) => dispatch(changeUserAge(age)),
  sendTweet: (tweet) => dispatch(sendTweet(tweet))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);