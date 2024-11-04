import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import App from './App';

test('renders navbar with correct links', () => {
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );

  expect(screen.getByRole('link', { name: /Home/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Clubs/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Contact/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Login/i })).toBeInTheDocument();
});

test('renders Home page on open', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByText(/Home page/i)).toBeInTheDocument();
});

test('renders Home page when navigating to /home', () => {
  render(
    <MemoryRouter initialEntries={['/home']}>
      <App />
    </MemoryRouter>
  );

  // Check if the login page is displayed
  expect(screen.getByText(/Home page/i)).toBeInTheDocument();
});

test('renders Login page when navigating to /login', () => {
  render(
    <MemoryRouter initialEntries={['/login']}>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByText(/Login to your account/i)).toBeInTheDocument();
});

test('renders Contact page when navigating to /contact', () => {
  render(
    <MemoryRouter initialEntries={['/contact']}>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByText(/Contact page/i)).toBeInTheDocument();
});

test('renders Clubs page when navigating to /clubs', () => {
  render(
    <MemoryRouter initialEntries={['/clubs']}>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByText(/Clubs page/i)).toBeInTheDocument();
});

test('renders "Discover New Clubs on Campus" heading and club details', () => {
  render(<App />);
  const headingElement = screen.getByText(/Discover New CLubs on Campus/i);
  expect(headingElement).toBeInTheDocument();

  const clubName = screen.getByText(/Club 1/i);
  expect(clubName).toBeInTheDocument();

  const clubCategory = screen.getByText(/Academic/i);
  expect(clubCategory).toBeInTheDocument();

  const clubMeetingTime = screen.getByText(/Tuesday 6:00 PM/i);
  expect(clubMeetingTime).toBeInTheDocument();
});

test('renders "JOIN HERE" button and location details', () => {
  render(<App />);

  const joinButton = screen.getByText(/JOIN HERE/i);
  expect(joinButton).toBeInTheDocument();

  const locationText = screen.getByText(/Location: CIF Room 3014/i);
  expect(locationText).toBeInTheDocument();

  const timeText = screen.getByText(/Time: 6-7 PM Thursdays/i);
  expect(timeText).toBeInTheDocument();
});

test('renders the featured section', () => {
  render(<App />);

  const featuredHeading = screen.getByText(/Featured/i);
  expect(featuredHeading).toBeInTheDocument();

  const featuredAbout = screen.getByText(/About Us/i);
  expect(featuredAbout).toBeInTheDocument();

  const featuredTeam = screen.getByText(/The Team/i);
  expect(featuredTeam).toBeInTheDocument();

  const featuredJoin = screen.getByText(/Why Should You Join/i);
  expect(featuredJoin).toBeInTheDocument();

  const featuredResources = screen.getByText(/Resources/i);
  expect(featuredResources).toBeInTheDocument();
});
