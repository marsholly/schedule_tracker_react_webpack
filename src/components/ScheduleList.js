const React = require('react');
const { TextField, TimePicker, RaisedButton, FlatButton, Dialog, DatePicker} = require('material-ui');
const moment = require('moment');

const style = {
  margin: 12,
};

const ScheduleList = React.createClass({
  getInitialState() {
    return {
      open: false,
      editTitle:'',
      editStartTime: null,
      editEndTime: null,
      editId:''
    }
  },

  deleteRow(id) {
    this.props.deleteSchedule(id);
  },

  editRow(schedule) {
    this.setState({ open: true });
    this.setState({
      editTitle: schedule.title,
      editId: schedule.id
    });
  },

  saveEdit() {
    let editSchedule = {
      title: this.state.editTitle,
      startTime: this.state.editStartTime,
      endTime: this.state.editEndTime,
      id: this.state.editId
    };
    this.props.updateSchedule(editSchedule);
    this.setState({ editId: ''});
    this.handleClose();
  },

  editStartTimeChange(e, date) {
    this.setState({ editStartTime: date });
  },

  editEndTimeChange(e, date) {
    this.setState({ editEndTime: date });
  },

  handleClose() {
    this.setState({ open: false });
  },

  render() {
    let { schedules } = this.props;
    let rows = schedules.map(schedule => {
      return (
        <tr key={schedule.id}>
          <td>{schedule.title}</td>
          <td>{moment(schedule.startTime).format('lll')}</td>
          <td>{moment(schedule.endTime).format('lll')}</td>
          <td>
            <button className="btn btn-warning btn-xs" onClick={() => this.editRow(schedule)}>
              <i className="glyphicon glyphicon-pencil"></i>
            </button>
          </td>
          <td>
            <button className="btn btn-danger btn-xs" onClick={() => this.deleteRow(schedule.id)}>
              <i className="glyphicon glyphicon-trash"></i>
            </button>
          </td>
        </tr>
      )
    });

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Edit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.saveEdit}
      />,
    ];

    return (
      <div>
        <table className="table table-striped">
          <thead>
            <tr className="success">
              <th>Title</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
        <Dialog
          title="Edit Schedule"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <TextField
            hintText="Title"
            errorText="This field is required"
            floatingLabelText="Schedule Title"
            value = {this.state.editTitle}
            onChange = {e => { this.setState({editTitle: e.target.value}) }}
          />
          <TimePicker
            format="24hr"
            hintText="24hr Format"
            floatingLabelText="Start Time"
            value={this.state.editStartTime}
            onChange={this.editStartTimeChange}
          />
          <TimePicker
            format="24hr"
            hintText="24hr Format"
            floatingLabelText="End Time"
            value={this.state.editEndTime}
            onChange={this.editEndTimeChange}
          />
        </Dialog>
      </div>
    )
  }
});

module.exports = ScheduleList;
