const React = require('react');
const NewSchedule = require('./NewSchedule');
const ScheduleList = require('./ScheduleList');
const { MuiThemeProvider } = require('material-ui');
const moment = require('moment');


const App = React.createClass({
  getInitialState() {
    return {
      schedules: []
    }
  },

  shouldComponentUpdate(nextProps, nextState) {
    let nextSchedules = nextState.schedules;
    let newScheduleOrder = nextSchedules.sort((cur, next) => {
      let a = moment(cur.startTime).format('lll');
      let b = moment(next.startTime).format('lll');
      let curT = new Date(a);
      let nextT = new Date(b);
      return ( curT - nextT );
    });
    this.setState({ schedules: newScheduleOrder });
    return true;
  },

  componentDidMount() {
    let scheduleStore = this.scheduleStorage();
    this.setState({ schedules: scheduleStore });
  },

  createNewSchedule(newSchedule) {
    let { schedules } = this.state;
    this.setState({
      schedules: [...schedules, newSchedule]
    });

    let scheduleStore = this.scheduleStorage();
    scheduleStore.push(newSchedule);
    this.writeToStorage(scheduleStore);
  },

  scheduleStorage() {
    let json = localStorage.scheduleStore;
    let scheduleStore;
    try {
      scheduleStore = JSON.parse(json);
    } catch(e) {
      scheduleStore = [];
    }
    return scheduleStore;
  },

  writeToStorage(scheduleStore) {
    localStorage.scheduleStore = JSON.stringify(scheduleStore);
  },

  deleteSchedule(id) {
    let scheduleStore = this.scheduleStorage();
    scheduleStore = scheduleStore.filter(schedule => schedule.id !== id);
    this.writeToStorage(scheduleStore);

    let { schedules } = this.state;
    this.setState({ schedules: scheduleStore });
  },

  updateSchedule(editSchedule) {
    let json = localStorage.scheduleStore;
    let scheduleStore = JSON.parse(json);
    let index = scheduleStore.findIndex(schedule => {
      return schedule.id === editSchedule.id;
    });
    scheduleStore[index] = editSchedule;
    localStorage.scheduleStore = JSON.stringify(scheduleStore);
    this.setState({
      schedules: scheduleStore
    })
  },

  render() {
    return (
      <MuiThemeProvider>
        <div className="container">
          <h1 className="text-center">Schedule Tracker</h1>
          <NewSchedule createNewSchedule={this.createNewSchedule}/>
          <ScheduleList schedules={this.state.schedules} deleteSchedule={this.deleteSchedule} updateSchedule={this.updateSchedule}/>
        </div>
      </MuiThemeProvider>
    )
  }
});

module.exports = App;
