import * as DesignSystem from './index';

describe('Design System Exports', () => {
  it('exports Button component', () => {
    expect(DesignSystem.Button).toBeDefined();
  });

  it('exports ButtonProps type', () => {
    // Type exports are compile-time only, so we just verify the module structure
    expect(DesignSystem).toHaveProperty('Button');
  });

  it('exports theme', () => {
    expect(DesignSystem.theme).toBeDefined();
    expect(DesignSystem.theme).toHaveProperty('colors');
    expect(DesignSystem.theme).toHaveProperty('spacing');
    expect(DesignSystem.theme).toHaveProperty('typography');
  });

  it('exports colors', () => {
    expect(DesignSystem.colors).toBeDefined();
    expect(DesignSystem.colors).toHaveProperty('primary');
    expect(DesignSystem.colors).toHaveProperty('gray');
  });

  it('exports spacing', () => {
    expect(DesignSystem.spacing).toBeDefined();
    expect(DesignSystem.spacing).toHaveProperty('0');
    expect(DesignSystem.spacing).toHaveProperty('4');
  });

  it('exports typography', () => {
    expect(DesignSystem.typography).toBeDefined();
    expect(DesignSystem.typography).toHaveProperty('fontFamily');
    expect(DesignSystem.typography).toHaveProperty('fontSize');
  });
});
