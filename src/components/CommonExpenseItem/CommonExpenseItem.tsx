import {StyleSheet, TouchableOpacity, View} from 'react-native';

import {CheckIcon} from '@app/assets/Icons';
import {type ThemeProps} from '@app/theme/theme';
import {useAppTheme} from '@app/theme/useAppTheme';

import Text from '../core/Text/Text';

const styleProps = (theme: ThemeProps) => {
  const styles = StyleSheet.create({
    checkboxContainer: {
      backgroundColor: theme.colors.background + '80',
      borderRadius: theme.radius.l,
      minHeight: 40,
      minWidth: 40,
      padding: theme.sizes.s,
    },
    container: {
      alignItems: 'center',
      backgroundColor: theme.colors.background + '80',
      borderColor: theme.colors.transparent,
      borderRadius: theme.radius.l,
      borderWidth: 1,
      flexDirection: 'row',
      gap: theme.spacing.m,

      padding: theme.spacing.s,
    },
    detailContainer: {
      flexDirection: 'row',
    },
    infoContainer: {
      gap: 8,
    },
    selectedContainer: {
      backgroundColor: theme.colors.background + 'c0',
      borderColor: theme.colors.primary,
    },
    textBudget: {
      fontSize: theme.fontSizes.size14,
      opacity: 1,
    },
    textCategory: {
      fontSize: theme.fontSizes.size14,
    },
  });
  return styles;
};

export const CommonExpenseItem = ({
  name,
  category,
  budget,
  onPress,
  isSelected,
}: {
  name: string;
  category: string;
  budget: string;
  onPress: (expense: string) => void;
  isSelected: boolean;
}) => {
  const {theme, colors} = useAppTheme();
  const styles = styleProps(theme);

  const handleBudgetColor =
    {
      Deseos: colors.info,
      Ocio: colors.primary,
      Necesidades: colors.success,
    }[budget] || colors.primary;

  return (
    <TouchableOpacity
      onPress={() => onPress(name)}
      style={[styles.container, isSelected && styles.selectedContainer]}>
      <View style={styles.checkboxContainer}>
        {isSelected && <CheckIcon color={colors.primary} />}
      </View>
      <View style={styles.infoContainer}>
        <Text variant="h6">{name}</Text>
        <View style={styles.detailContainer}>
          <Text style={[styles.textBudget, {color: handleBudgetColor}]}>{budget}</Text>
          <Text style={styles.textCategory}> | {category}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
