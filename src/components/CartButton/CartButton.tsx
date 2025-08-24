import { IconShoppingCart } from '@tabler/icons-react';
import { Badge, Button, Menu, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { CardsItem } from '@/types';
import cartIcon from '../image/cart_empty.svg';
import { Steppers } from '../steper/Stepper';
import classes from './CartButton.module.css';

type CartButtonProps = {
  numbers: number;
  cart: CardsItem[];
  changeCount: (id: number, count: number) => void;
};

export function CartButton({ numbers, cart, changeCount }: CartButtonProps) {
  const [opened, { open, close }] = useDisclosure(false);

  const totalSum = cart.reduce((sum, item) => sum + item.price * item.count, 0);

  return (
    <>
      <Menu
        opened={opened}
        onClose={close}
        width={444}
        position="bottom-end"
        offset={25}
        arrowPosition="center"
      >
        <Menu.Target>
          <Button
            component="div"
            mt="md"
            radius="md"
            color="#56B280"
            onClick={open}
            leftSection={numbers > 0 ? <Badge>{numbers}</Badge> : ''}
            rightSection={<IconShoppingCart />}
            data-testid="button"
          >
            Cart
          </Button>
        </Menu.Target>
        <Menu.Dropdown className={classes.menuDropdown}>
          {cart.length > 0 ? (
            <>
              {cart.map((product: CardsItem) => (
                <div key={product.id} className={classes.cartItem}>
                  <img src={product.image} alt={product.name} className={classes.image} />
                  <div>
                    <Text fw={500} className={classes.productName}>
                      {product.name.split(' - ')[0]}
                    </Text>
                    <Text c="dimmed" className={classes.productWeight}>
                      {product.name.split(' - ')[1]}
                    </Text>
                  </div>

                  <div className={classes.productPrice}>
                    <Text>$ {product.price * product.count}</Text>
                  </div>
                  <Steppers
                    onCountChange={(newCount) => changeCount(product.id, newCount)}
                    initialCount={product.count}
                    allowZero
                  />
                </div>
              ))}

              <Menu.Item>
                <div className={classes.total}>
                  <Text fw={500}>Total</Text>
                  <Text fw={600}>$ {totalSum}</Text>
                </div>
              </Menu.Item>
            </>
          ) : (
            <div className={classes.emptyCart}>
              <img src={cartIcon} alt="Empty cart" className={classes.emptyCartImage} />
              <Text fw={500} size="lg" mt="md">
                Your cart is empty!
              </Text>
            </div>
          )}
        </Menu.Dropdown>
      </Menu>
    </>
  );
}
