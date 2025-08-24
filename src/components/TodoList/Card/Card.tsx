import { useState } from 'react';
import { IconShoppingCart } from '@tabler/icons-react';
import { Button, Card, Image, Text } from '@mantine/core';
import { Steppers } from '@/components/steper/Stepper';
import { CardsItem } from '@/types';
import classes from './Card.module.css';

interface Props extends CardsItem {
  addCart: (product: CardsItem, count: number) => void;
}

export function Cards({ id, name, price, image, category, addCart }: Props) {
  const CardNames = name.split(' - ');

  const [currentCount, setCurrentCount] = useState(1);
  const handleCountChange = (newCount: number) => {
    setCurrentCount(newCount);
  };

  const handleAddToCart = () => {
    if (currentCount > 0) {
      addCart(
        {
          id,
          name,
          price,
          image,
          category,
          map: undefined,
          count: currentCount,
        },
        currentCount
      );
      setCurrentCount(1);
    }
  };

  return (
    <Card key={id} shadow="sm" padding="lg" radius="md" className={classes.card}>
      <Card.Section className={classes.imageSection}>
        <Image src={image} alt={CardNames[0]} className={classes.image} />
      </Card.Section>

      <div className={classes.infoSection}>
        <div className={classes.productSection}>
          <Text fw={700} size="lg" className={classes.productName}>
            {CardNames[0]}
          </Text>{' '}
          <Text size="" className={classes.productKG}>
            {CardNames[1]}
          </Text>
        </div>
        <Steppers
          onCountChange={handleCountChange}
          initialCount={currentCount}
          key={currentCount}
        />
      </div>

      <div className={classes.priceSection}>
        <Text fw={7} size="xl" className={classes.price}>
          $ {currentCount > 1 ? price * currentCount : price}
        </Text>

        <Button
          color="brand.5"
          mt="md"
          radius="md"
          disabled={currentCount === 0}
          className={classes.addButton}
          onClick={handleAddToCart}
        >
          Add to cart <IconShoppingCart />
        </Button>
      </div>
    </Card>
  );
}
