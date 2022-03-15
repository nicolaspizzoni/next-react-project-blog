import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '.';

//describe define o conjunto de testes a serem feitos no componente
describe('<Home />', () => {
  test('dummy test 1', () => {
    expect(1).toBe(1);
  });

  test('dummy test 2', () => {
    expect(2).toBe(2);
  });

  // Falhou
  test('dummy test 3', () => {
    expect(3).toBe(3);
  });

  test('input', () => {
    render(<Home />);
    const input = screen.getByPlaceholderText(/Pesquisar/i);

    expect(input).toBeInTheDocument();

    expect(input.value).toBe('');

    const valor = 'Testando';

    // Criando evento de usuário de teclar no input o valor
    userEvent.type(input, valor);

    expect(input.value).toBe(valor);
    // expect(input.onchange).toHaveBeenCalledTimes(valor.length)
  });

  test('should match snapshot', () => {
    const { container } = render(<Home />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
