import { useState } from 'react';
import { AppShell, Burger, Button, Group, Title, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { CardsItem } from '@/types';
import { CartButton } from './CartButton/CartButton';
import { TodoList } from './TodoList/TodoList';
import classes from './Main.module.css';

export function Main() {
  const [cart, setCart] = useState<CardsItem[]>([]);

  const addCart = (product: CardsItem, count: number) => {
    setCart((prev: CardsItem[]) => {
      const isProductInCart = prev.some((item) => item.id === product.id);

      if (isProductInCart) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, count: item.count + count } : item
        );
      }
      return [...prev, { ...product, count }];
    });
  };

  const changeCount = (id: number, count: number) => {
    setCart((prev: CardsItem[]) => {
      if (count <= 0) {
        return prev.filter((item) => item.id !== id);
      }

      return prev.map((item) => (item.id === id ? { ...item, count } : item));
    });
  };

  const [opened, { toggle }] = useDisclosure();
  return (
    <>
      <AppShell
        header={{ height: 80 }}
        navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
        padding="md"
        className={classes.appShell}
      >
        <AppShell.Header className={classes.header}>
          <Group h="100%" px="md" justify="space-between">
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />

            <Group gap="xl">
              <Title order={3} className={classes.title}>
                Vegetable
              </Title>
              <Button variant="filled" color="#54B46A" radius="xl" size="sm">
                Catalog
              </Button>
            </Group>

            <Group ml="xl" gap={0} visibleFrom="m">
              <UnstyledButton>
                <CartButton changeCount={changeCount} numbers={cart.length} cart={cart} />
              </UnstyledButton>
            </Group>
          </Group>
        </AppShell.Header>
        <AppShell.Main>
          <TodoList addCart={addCart} />
        </AppShell.Main>
      </AppShell>
    </>
  );
}
