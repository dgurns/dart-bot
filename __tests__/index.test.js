import { render, screen } from '@testing-library/react';
import Home from 'pages/index';

describe('Home page', () => {
  it('should render a chat box', () => {
    render(<Home />);
    screen.getByText(/DartBot/i);
    screen.getByPlaceholderText(/Your message here.../i);
  });
});
