import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});


test ('renders "Discover New CLubs on Campus" heading and club details', () => {
  render(<App/>);
  const headingElement = screen.getByText(/Discover New CLubs on Campus/i);
  expect(headingElement).toBeInTheDocument();

  const clubName = screen.getByText(/Club 1/i);
  expect(clubName).toBeInTheDocument();

  const clubCategory = screen.getByText(/Academic/i);
  expect(clubCategory).toBeInTheDocument();

  const clubMeetingTime = screen.getByText(/Tuesday 6:00 PM/i);
  expect(clubMeetingTime).toBeInTheDocument();
});
