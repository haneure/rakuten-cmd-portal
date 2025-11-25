import { colors } from './colors';
import * as ThemeExports from './index';
import { spacing } from './spacing';
import { typography } from './typography';

describe('Theme Exports', () => {
  it('exports theme object', () => {
    expect(ThemeExports.theme).toBeDefined();
    expect(ThemeExports.theme.colors).toBeDefined();
    expect(ThemeExports.theme.spacing).toBeDefined();
    expect(ThemeExports.theme.typography).toBeDefined();
  });

  it('exports colors', () => {
    expect(ThemeExports.colors).toBeDefined();
    expect(ThemeExports.colors).toBe(colors);
  });

  it('exports spacing', () => {
    expect(ThemeExports.spacing).toBeDefined();
    expect(ThemeExports.spacing).toBe(spacing);
  });

  it('exports typography', () => {
    expect(ThemeExports.typography).toBeDefined();
    expect(ThemeExports.typography).toBe(typography);
  });

  it('theme contains correct structure', () => {
    expect(ThemeExports.theme).toHaveProperty('shadows');
    expect(ThemeExports.theme).toHaveProperty('radius');
    expect(ThemeExports.theme).toHaveProperty('transitions');
  });
});
