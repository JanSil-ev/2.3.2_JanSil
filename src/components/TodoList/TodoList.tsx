import { useEffect, useState } from 'react';
import ky from 'ky';
import { Center, Flex, Loader } from '@mantine/core';
import { CardsItem } from '@/types';
import { Cards } from './Card/Card';
import classes from './TodoList.module.css';

interface Props {
  addCart: (product: CardsItem, count: number) => void;
}

export function TodoList({ addCart }: Props) {
  const [products, setProducts] = useState<CardsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const json = await ky
          .get('https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json')
          .json();
        setProducts(json as CardsItem[]);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <Center style={{ height: '100vh' }}>
        <Loader type="Loader" size="xl" variant="dots" data-testid="loader" />
      </Center>
    );
  }

  return (
    <>
      <div className={classes.container}>
        <h2 className={classes.title}>Catalog</h2>

        <Flex
          gap="md"
          justify="center"
          align="center"
          direction="row"
          wrap="wrap"
          className={classes.flexContainer}
        >
          {products?.map((p) => (
            <Cards key={p.id} {...p} addCart={addCart} />
          ))}
        </Flex>
      </div>
    </>
  );
}
