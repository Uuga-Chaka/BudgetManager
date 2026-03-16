import {ScrollView, View} from 'react-native';

import Button from '@app/components/core/Button/Button';
import Text from '@app/components/core/Text/Text';
import {DEFAULT_BUDGET_SETUP, SAVE_YOURSELF_BUDGET} from '@app/consts/budgetGroupOptions';
import {Routes, type RootOnboardingScreenProps} from '@app/navigation/navigation.types';
import {useSetupStore} from '@app/store';

import {styles} from './BudgetPlanScreen.styles';
import {type RuleList} from './BudgetPlanScreen.types';

export default function BudgetPlanScreen({
  navigation,
}: RootOnboardingScreenProps<typeof Routes.SelectBudgetPlan>) {
  const {setPercentageGroupName, setPercentageGroups} = useSetupStore();

  const handleBudgetSelection = ({groupName, budgetGroup, buttonRedirection}: RuleList) => {
    if (groupName && budgetGroup) {
      setPercentageGroupName(groupName);
      setPercentageGroups(budgetGroup);
    }
    navigation.navigate(buttonRedirection);
  };
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.headerContainer}>
        <Text variant="h5" style={styles.headerText}>
          Selecciona el plan de presupuesto que quieres usar.
        </Text>
      </View>
      <View style={styles.listContainer}>
        {ruleList
          .filter(e => !e.disabled)
          .map(e => (
            <RuleItem {...e} onPress={() => handleBudgetSelection(e)} key={e.title} />
          ))}
      </View>
    </ScrollView>
  );
}

const RuleItem = ({title, description, onPress}: RuleItemProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text variant="s1">{title}</Text>
        <Text variant="p2">{description}</Text>
        <Button onPress={onPress}>Seleccionar regla</Button>
      </View>
      <View style={styles.cardImagePlaceholder} />
    </View>
  );
};

type RuleItemProps = {
  title: string;
  description: string;
  onPress: () => void;
  image?: string;
};

// TODO: Handle implementation for pay yourself first
const ruleList: RuleList[] = [
  {
    title: 'Regla 50/30/20',
    description:
      'Un acercamiento balanceado: 50% para necesidad, 30% para deseos y 20% para ahorros y deudas',
    buttonRedirection: Routes.NetIncomeSetup,
    image: 'image',
    groupName: '50/30/20-Rule',
    budgetGroup: DEFAULT_BUDGET_SETUP,
  },
  {
    title: 'Pagate a ti mismo primero',
    description:
      'Prioriza tu futuro. Aparta tua ahorros primero y luego gasta el resto de manera responsable',
    buttonRedirection: Routes.NetIncomeSetup,
    image: 'image',
    groupName: 'Save yourself',
    budgetGroup: SAVE_YOURSELF_BUDGET,
    disabled: true,
  },
  {
    title: 'Asignación personalizada',
    description: 'Define tus propias reglas. Crea categorias y porcentages que cuadran tus metas',
    buttonRedirection: Routes.IncomeSetup,
    image: 'image',
  },
];
