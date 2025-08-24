import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { MantineProvider } from '@mantine/core';
import { CardsItem } from '@/types';
import { Cards } from './Card';

function renderWithMantine(ui: React.ReactElement) {
  return render(<MantineProvider>{ui}</MantineProvider>);
}

const mockProduct: CardsItem = {
  id: 1,
  name: 'Test Product',
  price: 10.0,
  category: 'fruits',
  image: 'test.jpg',
  count: 1,
  map: undefined,
};

const mockAddCart = vi.fn();

describe('Card Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('отображает название продукта и изображение', () => {
    renderWithMantine(<Cards {...mockProduct} addCart={mockAddCart} />);

    expect(screen.getByAltText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Test Product')).toBeInTheDocument();
  });

  it('отображает начальную цену продукта', () => {
    renderWithMantine(<Cards {...mockProduct} addCart={mockAddCart} />);

    expect(screen.getByText('$ 10')).toBeInTheDocument();
  });

  it('отображает текущее количество товара', () => {
    renderWithMantine(<Cards {...mockProduct} addCart={mockAddCart} />);

    const countElement = screen.getByText('1');
    expect(countElement).toBeInTheDocument();
  });
});
