const React = require('react');
const { render } = require('react-dom');
const App = require('./components/App');
const injectTapEventPlugin = require('react-tap-event-plugin');

injectTapEventPlugin();

render(
  <App />,
  document.getElementById('root')
);
