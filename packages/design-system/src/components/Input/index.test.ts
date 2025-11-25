import { Input } from './Input';
import type { InputProps, InputSize, InputType, InputVariant } from './Input.types';

describe('Input barrel export', () => {
  it('exports Input component', () => {
    expect(Input).toBeDefined();
  });

  it('exports InputProps type', () => {
    const props: InputProps = { placeholder: 'test' };
    expect(props).toBeDefined();
  });

  it('exports InputSize type', () => {
    const size: InputSize = 'md';
    expect(size).toBeDefined();
  });

  it('exports InputVariant type', () => {
    const variant: InputVariant = 'default';
    expect(variant).toBeDefined();
  });

  it('exports InputType type', () => {
    const type: InputType = 'text';
    expect(type).toBeDefined();
  });
});
