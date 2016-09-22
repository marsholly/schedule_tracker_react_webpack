const React = require('react');
const { TextField, TimePicker, RaisedButton, FlatButton, Dialog } = require('material-ui');
const uuid = require('uuid');

const style = {
  margin: 12,
};

const NewSchedule = React.createClass({
  getInitialState() {
    return {
      open: false,
      title: '',
      startTime: null,
      endTime: null
    }
  },

  handleOpen() {
   this.setState({ open: true });
  },

  handleClose() {
   this.setState({ open: false });
  },

  titleChange(e) {
    let title = e.target.value;
    this.setState({ title });
  },

  startTimeChange(e, date) {
    this.setState({ startTime: date });
  },

  endTimeChange(e, date) {
    this.setState({ endTime: date });
  },

  _onSubmit() {
    let newSchedule = {
      title: this.state.title,
      startTime: this.state.startTime,
      endTime: this.state.endTime,
      id: uuid()
    };
    this.props.createNewSchedule(newSchedule);
    this.setState({
      title: '',
      startTime: null,
      endTime: null
    });
    this.handleClose();
  },

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Add"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this._onSubmit}
      />,
    ];
    return (
      <div className="row">
        <div className="text-center">
          <RaisedButton label="New Schedule" primary={true} style={style} onTouchTap={this.handleOpen}/>
          <Dialog
            title="Add New Schedule"
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
          >
            <TextField
              hintText="Title"
              errorText="This field is required"
              floatingLabelText="Schedule Title"
              value = {this.state.title}
              onChange = {e => this.titleChange(e)}
            />
            <TimePicker
              format="24hr"
              hintText="24hr Format"
              floatingLabelText="Start Time"
              value={this.state.startTime}
              onChange={this.startTimeChange}
            />
            <TimePicker
              format="24hr"
              hintText="24hr Format"
              floatingLabelText="End Time"
              value={this.state.endTime}
              onChange={this.endTimeChange}
            />
          </Dialog>
        </div>
      </div>
    )
  }
});

module.exports = NewSchedule;
