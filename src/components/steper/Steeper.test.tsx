import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { MantineProvider } from '@mantine/core';
import { Steppers } from './Stepper';

function renderWithMantine(ui: React.ReactElement) {
  return render(<MantineProvider>{ui}</MantineProvider>);
}

describe('Stepper', () => {
  it('вызывает onCountChange при клике на кнопку минус и плюс', () => {
    const onCountChange = vi.fn();

    renderWithMantine(<Steppers onCountChange={onCountChange} />);

    fireEvent.click(screen.getByTestId('plus-button'));
    expect(onCountChange).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByTestId('minus-button'));
    expect(onCountChange).toHaveBeenCalledTimes(2);
  });

  it('блокирует кнопку минус когда count <= 1 и разблокирует когда count > 1', () => {
    const onCountChange = vi.fn();
    const { rerender } = renderWithMantine(
      <Steppers initialCount={1} onCountChange={onCountChange} />
    );

    expect(screen.getByTestId('minus-button')).toBeDisabled();

    rerender(
      <MantineProvider>
        <Steppers initialCount={2} onCountChange={onCountChange} />
      </MantineProvider>
    );

    expect(screen.getByTestId('minus-button')).not.toBeDisabled();
  });
});
