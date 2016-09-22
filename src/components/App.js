const React = require('react');
const NewSchedule = require('./NewSchedule');
const { MuiThemeProvider } = require('material-ui');


const App = React.createClass({
  getInitialState() {
    return {
      schedule: []
    }
  },

  createNewSchedule(newSchedule) {
    console.log('newSchedule:', newSchedule)
  },

  render() {
    return (
      <MuiThemeProvider>
        <div className="container">
          <h1 className="text-center">Schedule Tracker</h1>
          <NewSchedule createNewSchedule={this.createNewSchedule}/>
        </div>
      </MuiThemeProvider>
    )
  }
});

module.exports = App;
