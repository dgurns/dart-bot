import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { upcomingTrainsResponse } from '__mocks__/upcoming-trains';
import IrishRail from 'services/IrishRail';
import ChatBox from 'components/ChatBox';

describe('ChatBox', () => {
  it('should render a default message from the bot', () => {
    render(<ChatBox />);
    screen.getByText(/ask me something/i, { exact: false });
  });

  it('should respond with an error message when the user asks something ambiguous', async () => {
    render(<ChatBox />);
    const textInputArea = screen.getByPlaceholderText(/Your message here/i, {
      exact: false,
    });
    fireEvent.change(textInputArea, { target: { value: 'My message' } });
    fireEvent.keyDown(textInputArea, { key: 'Enter' });
    screen.getByText('You');
    screen.getByText('My message');
    await waitFor(() => {
      screen.getByText(/Sorry/i, { exact: false });
    });
  });

  it('should respond with a station list when the user asks for it', async () => {
    render(<ChatBox />);
    const textInputArea = screen.getByPlaceholderText(/Your message here/i, {
      exact: false,
    });
    fireEvent.change(textInputArea, {
      target: { value: 'Get me a station list' },
    });
    fireEvent.keyDown(textInputArea, { key: 'Enter' });
    screen.getByText('You');
    screen.getByText('Get me a station list');
    await waitFor(() => {
      screen.getByText(/Malahide/i, { exact: false });
      screen.getByText(/Greystones/i, { exact: false });
    });
  });

  it('should respond with upcoming train times for a given station', async () => {
    jest
      .spyOn(IrishRail, 'getNextTrainsAtStation')
      .mockReturnValue(Promise.resolve(upcomingTrainsResponse.slice(0, 2)));

    render(<ChatBox />);
    const textInputArea = screen.getByPlaceholderText(/Your message here/i, {
      exact: false,
    });
    fireEvent.change(textInputArea, {
      target: { value: 'Get upcoming trains from Howth' },
    });
    fireEvent.keyDown(textInputArea, { key: 'Enter' });

    screen.getByText('You');
    screen.getByText('Get upcoming trains from Howth');

    await waitFor(() => {
      screen.getByText(
        /Next trains departing from Howth: To Howth at 00:00, To Howth at 00:00/i
      );
    });
  });
});
