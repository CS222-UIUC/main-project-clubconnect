import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

/*
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
});*/

describe('App Routing', () => {
  test('renders Home component by default', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App/>
      </MemoryRouter>
    );
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
  });

  test('renders Login component when navigating to /login', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <App/>
      </MemoryRouter>
    );
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });

  test('renders Profile component when navigating to /profile', () => {
    render(
      <MemoryRouter initialEntries={['/profile']}>
        <App/>
      </MemoryRouter>
    );
    expect(screen.getByText(/Profile/i)).toBeInTheDocument();
  });

  test('renders Clubs component when navigating to /Clubs', () => {
    render(
      <MemoryRouter initialEntries={['/clubs']}>
        <App/>
      </MemoryRouter>
    );
    expect(screen.getByText(/Clubs/i)).toBeInTheDocument();
  });

  test('renders Page Not Found when navigating to invalid paths', () => {
    render(
      <MemoryRouter initialEntries={['/invalid']}>
        <App/>
      </MemoryRouter>
    );
    expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument();
  });
});





