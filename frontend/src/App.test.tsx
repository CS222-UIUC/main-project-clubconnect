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

  expect(screen.getByText(/Welcome to ClubConnect/i)).toBeInTheDocument();
  expect(screen.getByText(/Why Choose/i)).toBeInTheDocument();
  expect(screen.getAllByText(/Explore Clubs/i).length).toBeGreaterThan(0); //button and section
});

test('renders Home page when navigating to /home', () => {
  render(
    <MemoryRouter initialEntries={['/home']}>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByText(/Welcome to ClubConnect/i)).toBeInTheDocument();
  expect(screen.getByText(/Why Choose/i)).toBeInTheDocument();
  expect(screen.getAllByText(/Explore Clubs/i).length).toBeGreaterThan(0); //button and section
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

