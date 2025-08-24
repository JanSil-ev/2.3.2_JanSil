import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { MantineProvider } from '@mantine/core';
import { CardsItem } from '@/types';
import { CartButton } from './CartButton';

function renderWithMantine(ui: React.ReactElement) {
  return render(<MantineProvider>{ui}</MantineProvider>);
}

const mockCartItems: CardsItem[] = [
  {
    id: 1,
    name: 'Test Product 1 - 1kg',
    price: 10.0,
    category: 'fruits',
    image: 'test1.jpg',
    count: 2,
    map: undefined,
  },
  {
    id: 2,
    name: 'Test Product 2 - 500g',
    price: 20.0,
    category: 'vegetables',
    image: 'test2.jpg',
    count: 1,
    map: undefined,
  },
];

const mockChangeCount = vi.fn();

describe('CartButton Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('отображает кнопку корзины с количеством товаров', () => {
    renderWithMantine(
      <CartButton numbers={3} cart={mockCartItems} changeCount={mockChangeCount} />
    );

    expect(screen.getByTestId('button')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('отображает кнопку корзины без бейджа при нулевом количестве', () => {
    renderWithMantine(<CartButton numbers={0} cart={[]} changeCount={mockChangeCount} />);

    expect(screen.getByTestId('button')).toBeInTheDocument();
    expect(screen.queryByText('0')).not.toBeInTheDocument();
  });

  it('открывает меню при клике на кнопку', async () => {
    renderWithMantine(
      <CartButton numbers={2} cart={mockCartItems} changeCount={mockChangeCount} />
    );

    const cartButton = screen.getByTestId('button');
    fireEvent.click(cartButton);

    expect(await screen.findByText('Test Product 1')).toBeInTheDocument();
    expect(screen.getByText('Test Product 2')).toBeInTheDocument();
  });

  it('отображает товары в корзине с правильными ценами', async () => {
    renderWithMantine(
      <CartButton numbers={2} cart={mockCartItems} changeCount={mockChangeCount} />
    );

    const cartButton = screen.getByTestId('button');
    fireEvent.click(cartButton);

    await screen.findByText('Test Product 1');
    await screen.findByText('Test Product 2');

    const priceElements = screen.getAllByText(/\$ \d+/);

    expect(priceElements).toHaveLength(3);

    const prices = priceElements.map((el) => el.textContent);
    expect(prices).toContain('$ 20');
    expect(prices).toContain('$ 40');
  });

  it('отображает сообщение о пустой корзине', async () => {
    renderWithMantine(<CartButton numbers={0} cart={[]} changeCount={mockChangeCount} />);

    const cartButton = screen.getByTestId('button');
    fireEvent.click(cartButton);

    expect(await screen.findByText('Your cart is empty!')).toBeInTheDocument();
  });
});
