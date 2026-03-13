import React, {useMemo} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';

import {type LucideProps} from 'lucide-react-native';
import {Pie, PolarChart} from 'victory-native';

import {HouseIcon, PiggyBankIcon, ShoppingBagIcon} from '@app/assets/Icons';
import Button from '@app/components/core/Button/Button';
import Text from '@app/components/core/Text/Text';
import {Routes, type RootOnboardingScreenProps} from '@app/navigation/navigation.types';
import {type ThemeProps} from '@app/theme/theme';
import {useAppTheme} from '@app/theme/useAppTheme';

const styleProps = (theme: ThemeProps) => {
  const styles = StyleSheet.create({
    bdItemContainer: {
      alignItems: 'center',
      backgroundColor: theme.colors.background + '80',
      borderRadius: theme.radius.l,
      flexDirection: 'row',
      gap: theme.spacing.m,
      padding: theme.spacing.s,
    },
    budgetCategoryContainer: {
      gap: theme.spacing.xs,
    },
    charContainer: {
      height: 300,
      padding: 20,
      width: '100%',
    },
    labelColor: {
      borderRadius: 4,
      height: theme.sizes.m,
      width: theme.sizes.m,
    },
    labelsContainer: {
      flexDirection: 'row',
      gap: theme.spacing.xs,
      justifyContent: 'center',
    },
    listItemContainer: {
      gap: theme.spacing.xs,
      paddingTop: 32,
      paddingVertical: theme.spacing.xs,
    },
    singleLabelContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: theme.spacing.xs,
    },
    typeAmountContainer: {
      alignItems: 'flex-end',
      flex: 1,
      gap: theme.spacing.xs,
    },
  });
  return styles;
};

const BudgetSummaryScreen = ({
  navigation,
}: RootOnboardingScreenProps<typeof Routes.BudgetSummary>) => {
  const {colors, theme} = useAppTheme();
  const Data = useMemo(() => {
    return [
      {
        categories: ['Renta', 'Utilidades', 'Mercado'],
        color: colors.primary,
        icon: HouseIcon,
        label: 'Necesidades',
        percentage: '50%',
        value: 500,
      },
      {
        categories: ['Salidas', 'Pasatiempo', 'Gimansio'],
        color: colors.success,
        icon: ShoppingBagIcon,
        label: 'Deseos',
        percentage: '30%',
        value: 300,
      },
      {
        categories: ['Invertir', 'Seguro'],
        color: colors.info,
        icon: PiggyBankIcon,
        label: 'Ahorros',
        percentage: '20%',
        value: 200,
      },
    ];
  }, []);

  const styles = styleProps(theme);

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={Data}
      contentContainerStyle={styles.listItemContainer}
      ListHeaderComponent={() => (
        <>
          <Text variant="h1">{(5000000).toLocaleString()}</Text>

          <View style={styles.charContainer}>
            <PolarChart data={Data} labelKey={'label'} valueKey={'value'} colorKey={'color'}>
              <Pie.Chart innerRadius={100} />
            </PolarChart>
          </View>
          <View style={styles.labelsContainer}>
            {Data.map(e => (
              <View key={e.label} style={styles.singleLabelContainer}>
                <View style={[styles.labelColor, {backgroundColor: e.color}]} />
                <View>
                  <Text> {e.label}</Text>
                </View>
              </View>
            ))}
          </View>
        </>
      )}
      ListFooterComponent={() => (
        <Button onPress={() => navigation.navigate(Routes.Home)}>Finalizar</Button>
      )}
      renderItem={({item: {icon, value, label, percentage, categories}}) => (
        <SummaryListItem
          Icon={icon}
          budgetAmount={value}
          budgetName={label}
          budgetPercentage={percentage}
          categories={categories}
        />
      )}
    />
  );
};

export default BudgetSummaryScreen;

const SummaryListItem = ({
  budgetName,
  categories,
  budgetPercentage,
  budgetAmount,
  Icon,
}: {
  budgetName: string;
  categories: string[];
  budgetPercentage: string;
  budgetAmount: number;
  Icon: (props?: LucideProps) => React.JSX.Element;
}) => {
  const {colors, theme} = useAppTheme();
  const styles = styleProps(theme);

  return (
    <View style={styles.bdItemContainer}>
      <Icon color={colors.white} />
      <View style={styles.budgetCategoryContainer}>
        <Text variant="s1">
          {budgetName} ({budgetPercentage})
        </Text>
        <Text>{categories.join(', ')}</Text>
      </View>
      <View style={styles.typeAmountContainer}>
        <Text variant="s1">$ {budgetAmount.toLocaleString()}</Text>
      </View>
    </View>
  );
};
