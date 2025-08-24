// import { render, screen,  fireEvent } from '@testing-library/react';

// import { describe, it, expect, vi } from 'vitest';
// import { TodoList } from './TodoList';

// function renderWithMantine(ui: React.ReactElement) {
//   return render(<MantineProvider>{ui}</MantineProvider>);
// }

// describe('TodoList интеграционные тесты', () => {

//   it('при загрузке страницы показывается loader', () => {
//     renderWithMantine(<TodoList addCart={() => {}}/>);
//   })
//   // it('показывает Loader при загрузке', () => {
//   //   renderWithMantine(<TodoList addCart={() => {}} />);
//   //   expect(screen.getByRole('Loader')).toBeInTheDocument();
//   // });

//   // it('отображает продукты после загрузки', async () => {
//   //   renderWithMantine(<TodoList addCart={() => {}} />);
//   //   // Ждем появления любого текста (замените на более конкретное ожидание при необходимости)
//   //   const productName = await screen.findByText(/.+/);
//   //   expect(productName).toBeInTheDocument();
//   // });

//   // it('вызывает addCart при клике на кнопку', async () => {
//   //   const addCartMock = vi.fn();
//   //   renderWithMantine(<TodoList addCart={addCartMock} />);
//   //   // Ждем появления кнопок
//   //   await screen.findByText(/.+/);
//   //   const buttons = screen.getAllByRole('button');
//   //   fireEvent.click(buttons[0]);
//   //   expect(addCartMock).toHaveBeenCalledTimes(1);
//   // });
// });

import { render, screen, waitFor } from '@testing-library/react';
import ky from 'ky';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { MantineProvider } from '@mantine/core';
import { TodoList } from './TodoList';

// Мокаем ky
vi.mock('ky');

const mockProducts = [
  {
    id: 1,
    name: 'Test Product 1',
    price: '10.00',
    category: 'test',
    image: 'test1.jpg',
    inStock: true,
  },
  {
    id: 2,
    name: 'Test Product 2',
    price: '20.00',
    category: 'test',
    image: 'test2.jpg',
    inStock: true,
  },
];

const mockAddCart = vi.fn();

function renderWithMantine(ui: React.ReactElement) {
  return render(<MantineProvider>{ui}</MantineProvider>);
}

describe('TodoList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('показывает loader при загрузке', () => {
    (ky.get as any).mockReturnValue({
      json: () => new Promise(() => {}),
    });

    renderWithMantine(<TodoList addCart={mockAddCart} />);

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('при загрузке данных должен отображаться заголовок "Catalog"', async () => {
    (ky.get as any).mockReturnValue({
      json: () => Promise.resolve(mockProducts),
    });
    renderWithMantine(<TodoList addCart={mockAddCart} />);
    await waitFor(() => {
      expect(screen.getByText('Catalog')).toBeInTheDocument();
    });
  });

  it('при успешной загрузке данных должны отображаться карточки товаров', async () => {
    (ky.get as any).mockReturnValue({
      json: () => Promise.resolve(mockProducts),
    });

    renderWithMantine(<TodoList addCart={mockAddCart} />);

    await waitFor(() => {
      expect(screen.getByText('Test Product 1')).toBeInTheDocument();
      expect(screen.getByText('Test Product 2')).toBeInTheDocument();
    });
  });
});
