import {theme} from '@app/theme/theme';
import {type ThemeContextTypes} from '@app/theme/useAppTheme';

const selectedMockTheme = theme['dark'];
export const mockTheme: ThemeContextTypes = {
  theme: selectedMockTheme,
  colors: selectedMockTheme.colors,
  mode: 'dark',
  sizes: selectedMockTheme.sizes,
  statusBarMode: 'dark',
  toggleSelectedTheme: () => console.log('mocked'),
};
