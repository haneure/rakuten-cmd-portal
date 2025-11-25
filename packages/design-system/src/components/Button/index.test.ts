import { Button } from './Button';
import * as ButtonExports from './index';

describe('Button Component Exports', () => {
  it('exports Button component', () => {
    expect(ButtonExports.Button).toBeDefined();
    expect(ButtonExports.Button).toBe(Button);
  });

  it('exports types (compile-time check)', () => {
    // Types are compile-time only, so we just verify the component is exported correctly
    expect(ButtonExports).toHaveProperty('Button');
  });
});
