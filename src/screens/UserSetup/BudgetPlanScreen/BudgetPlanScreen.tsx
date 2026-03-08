import {ScrollView, View} from 'react-native';

import Button from '@app/components/core/Button/Button';
import Text from '@app/components/core/Text/Text';
import {Routes, type RootOnboardingScreenProps} from '@app/navigation/navigation.types';

import {styles} from './BudgetPlanScreen.styles';

export default function BudgetPlanScreen({
  navigation,
}: RootOnboardingScreenProps<typeof Routes.SelectBudgetPlan>) {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.headerContainer}>
        <Text variant="h5" style={styles.headerText}>
          Selecciona el plan de presupuesto que quieres usar.
        </Text>
      </View>
      <View style={styles.listContainer}>
        {ruleList.map(e => (
          <RuleItem
            {...e}
            onPress={() => navigation.navigate(Routes.NetIncomeSetup)}
            key={e.title}
          />
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

const ruleList = [
  {
    title: 'Regla 50/30/20',
    description:
      'Un acercamiento balanceado: 50% para necesidad, 30% para deseos y 20% para ahorros y deudas',
    buttonRedirection: Routes.NetIncomeSetup,
    image: 'image',
  },
  {
    title: 'Pagate a ti mismo primero',
    description:
      'Prioriza tu futuro. Aparta tua ahorros primero y luego gasta el resto de manera responsable',
    buttonRedirection: Routes.NetIncomeSetup,
    image: 'image',
  },
  {
    title: 'Asignación personalizada',
    description: 'Define tus propias reglas. Crea categorias y porcentages que cuadran tus metas',
    buttonRedirection: Routes.IncomeSetup,
    image: 'image',
  },
];
