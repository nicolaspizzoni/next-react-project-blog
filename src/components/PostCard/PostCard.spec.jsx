import { render, screen } from '@testing-library/react';
import PostCard from '.';

const props = {
  post: {
    title: 'title 1',
    id: 1,
    body: 'body 1',
    cover: 'img/img.png',
  },
};

const props2 = {
  post: {
    title: '',
    id: 1,
    body: '',
    cover: '',
  },
};

describe('<PostCard />', () => {
  test('should render correctly', () => {
    //Pegar um snapshot do componente no console de testes
    // const {debug} = render(<PostCard {...props}/>)
    // debug()
    render(<PostCard {...props} />);

    // screen.getByAltText('title 1') serve para pegar img pelo alt

    expect(screen.getByRole('img', { name: 'title 1' })).toHaveAttribute('src', 'img/img.png');

    //heading é usado para todos os h1 - h6
    expect(screen.getByRole('heading', { name: /title 1/i })).toBeInTheDocument();
    expect(screen.getByText('body 1')).toBeInTheDocument();
  });

  test('should not have posts', () => {
    render(<PostCard {...props2} />);

    // queryByRole serve para pegar o elemento pelo codigo e nao pelo resultado, em casos de o resultado ser vazio
    expect(screen.queryAllByRole('heading', { name: /title/i })).toHaveLength(0);
  });

  test('should match snapshot', () => {
    const { container } = render(<PostCard {...props} />);

    //container.firstChild é o elemento que está sendo renderizado
    expect(container.firstChild).toMatchSnapshot();
  });
});
