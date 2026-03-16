import React, {useMemo} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';

import {CommonActions} from '@react-navigation/native';
import {type LucideProps} from 'lucide-react-native';
import {Pie, PolarChart} from 'victory-native';

import {HouseIcon, PiggyBankIcon, ShoppingBagIcon} from '@app/assets/Icons';
import Button from '@app/components/core/Button/Button';
import Text from '@app/components/core/Text/Text';
import {BUDGET_ID} from '@app/consts/budgetGroupOptions';
import {localStorageKeys} from '@app/consts/localStorageKeys';
import {database} from '@app/database';
import {finalizeOnboardingData} from '@app/database/queries/createIncome';
import {Routes, type RootOnboardingScreenProps} from '@app/navigation/navigation.types';
import {useSetupStore} from '@app/store';
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
      flex: 1,
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
      flexShrink: 0,
      gap: theme.spacing.xs,
    },
  });
  return styles;
};

const BudgetSummaryScreen = ({
  navigation,
}: RootOnboardingScreenProps<typeof Routes.BudgetSummary>) => {
  const {colors, theme} = useAppTheme();
  const {
    commonExpenses,
    incomeAmount,
    percentageGroups,
    incomeName,
    percentageGroupName,
    // TODO: add countryCode,
  } = useSetupStore();

  const Data = useMemo(() => {
    const uiConfigs = {
      [BUDGET_ID.NECESSITIES]: {color: colors.primary, icon: HouseIcon},
      [BUDGET_ID.WISHES]: {color: colors.success, icon: ShoppingBagIcon},
      [BUDGET_ID.SAVINGS]: {color: colors.info, icon: PiggyBankIcon},
    };

    return percentageGroups.map(group => {
      const associatedExpenses = commonExpenses
        .filter(expense => expense.budgetId === group.id)
        .map(expense => expense.name);

      const config = uiConfigs[group.id];

      return {
        id: group.id,
        label: group.name,
        percentage: `${group.percentage * 100}%`,
        value: incomeAmount * group.percentage,
        categories: associatedExpenses,
        color: config.color,
        icon: config.icon,
      };
    });
  }, [commonExpenses, incomeAmount]);

  const styles = styleProps(theme);

  const handleFinish = async () => {
    try {
      await finalizeOnboardingData({
        commonExpenses,
        incomeAmount,
        incomeName,
        percentageGroupName,
      });
      await database.localStorage.set(localStorageKeys.IS_ONBOARDING_COMPLETED, true);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: Routes.Home}],
        }),
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={Data}
      contentContainerStyle={styles.listItemContainer}
      ListHeaderComponent={() => (
        <>
          <Text variant="h1">$ {incomeAmount.toLocaleString()}</Text>

          <View style={styles.charContainer}>
            <PolarChart data={Data} labelKey={'label'} valueKey={'value'} colorKey={'color'}>
              <Pie.Chart innerRadius={100} startAngle={-90} />
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
      ListFooterComponent={() => <Button onPress={handleFinish}>Finalizar</Button>}
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
        <Text variant="s1">{`${budgetName}\n(${budgetPercentage})`} </Text>
        <Text variant="c1" numberOfLines={1}>
          {categories.length > 0 ? categories.join(', ') : '-'}
        </Text>
      </View>
      <View style={styles.typeAmountContainer}>
        <Text variant="s1">$ {budgetAmount.toLocaleString()}</Text>
      </View>
    </View>
  );
};
