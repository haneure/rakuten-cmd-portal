import { Card } from './Card';
import type { CardPadding, CardProps, CardVariant } from './Card.types';

describe('Card barrel export', () => {
  it('exports Card component', () => {
    expect(Card).toBeDefined();
  });

  it('exports CardProps type', () => {
    const props: CardProps = { children: 'test' };
    expect(props).toBeDefined();
  });

  it('exports CardVariant type', () => {
    const variant: CardVariant = 'default';
    expect(variant).toBeDefined();
  });

  it('exports CardPadding type', () => {
    const padding: CardPadding = 'md';
    expect(padding).toBeDefined();
  });
});
