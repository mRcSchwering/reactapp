import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});


it('renders Home link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText("Home");
  expect(linkElement).toBeInTheDocument();
});
