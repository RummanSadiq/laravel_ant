import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import background from './react_Images/background.jpg';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
