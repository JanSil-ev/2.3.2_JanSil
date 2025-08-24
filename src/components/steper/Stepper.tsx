import { useEffect, useState } from 'react';
import { IconMinus, IconPlus } from '@tabler/icons-react';
import { Badge, Button, Flex } from '@mantine/core';
import classes from './Stepper.module.css';

export interface SteppersProps {
  onCountChange: (count: number, id?: number) => void;
  initialCount?: number;
  allowZero?: boolean;
}

export function Steppers({ onCountChange, initialCount = 1, allowZero = false }: SteppersProps) {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    setCount(Math.max(allowZero ? 0 : 1, initialCount || 1));
  }, [initialCount, allowZero]);

  const updateCount = (newCount: number) => {
    const validatedCount = Math.max(allowZero ? 0 : 1, newCount);
    setCount(validatedCount);
    onCountChange(validatedCount);
  };

  const addBag = () => updateCount(count + 1);
  const delBag = () => updateCount(count - 1);

  return (
    <>
      <div className={classes.stepperGroup}>
        <Flex gap={4} align="center">
          <Button
            variant="subtle"
            color="gray"
            onClick={delBag}
            disabled={count <= (allowZero ? 0 : 1)}
            className={classes.stepperButton}
            size="compact-sm"
            data-testid="minus-button"
          >
            <IconMinus size={16} />
          </Button>

          <Badge variant="outline" className={classes.stepperBadge}>
            {count}
          </Badge>

          <Button
            variant="subtle"
            color="gray"
            onClick={addBag}
            className={classes.stepperButton}
            size="compact-sm"
            data-testid="plus-button"
          >
            <IconPlus size={16} />
          </Button>
        </Flex>
      </div>
    </>
  );
}
