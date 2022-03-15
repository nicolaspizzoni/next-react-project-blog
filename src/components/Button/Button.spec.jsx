//spec é comumente usado para testes unitarios (preferencial)

import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '.';

describe('<Button />', () => {
  test('should render button with text', () => {
    const fn = jest.fn();
    render(<Button text="Load More" onClick={fn} />);

    //para testar se foram executados todos os expects (assertions), no caso 2
    expect.assertions(2);

    const button = screen.getByRole('button', { name: /load more/i });
    expect(button).toHaveAttribute('class', 'button');
    expect(button).toBeInTheDocument();
  });

  test('should call function on button click', () => {
    // Criando um Mock function
    // mais simples com jest.fn() que cria uma função ficticia
    const fn = jest.fn();
    render(<Button text="Load More" onClick={fn} />);

    const button = screen.getByRole('button', { name: /load more/i });

    // criar evento de click
    fireEvent.click(button);

    // checagem mais natural do usuário
    userEvent.click(button);

    // esperar que seja chamada a função uma vez
    expect(fn).toHaveBeenCalledTimes(2);
  });

  test('should be disabled when disabled equals true', () => {
    const fn = jest.fn();
    render(<Button text="Load More" onClick={fn} disabled={true} />);

    const button = screen.getByRole('button', { name: /load more/i });

    // expect(button).not.toBeDisabled()
    expect(button).toBeDisabled();
  });

  test('should be enabled when disabled is false', () => {
    const fn = jest.fn();
    render(<Button text="Load More" disabled={false} onClick={fn} />);

    const button = screen.getByRole('button', { class: /button/i });

    expect(button).toBeEnabled();
  });

  test('should match snapshot', () => {
    const fn = jest.fn();
    const { container } = render(<Button text="Load More" disabled={false} onClick={fn} />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
