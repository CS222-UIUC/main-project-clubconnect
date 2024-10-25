import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
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
