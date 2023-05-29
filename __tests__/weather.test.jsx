import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import Home from '../app/page';

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />);

    expect(
      screen.getByRole('heading', {
        name: /weather app demo/i,
      })
    ).toBeInTheDocument();
    screen.getByRole('checkbox', {
      name: /celsius/i,
    });
    fireEvent.change(
      screen.getByRole('textbox', {
        name: /city:/i,
      }),
      { target: { value: 'Barranquilla' } }
    ); // Replace 'Your Value' with the desired input value

    expect(screen.getByDisplayValue(/barranquilla/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/Temperature/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/Description/i)).toBeInTheDocument();
  });
});
