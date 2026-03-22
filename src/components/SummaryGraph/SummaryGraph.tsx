import React, {useRef} from 'react';

import {useNavigation} from '@react-navigation/native';
import {useFont} from '@shopify/react-native-skia';
import {Gesture} from 'react-native-gesture-handler';
import {useSharedValue} from 'react-native-reanimated';
import {runOnJS} from 'react-native-worklets';
import {Bar, type CartesianActionsHandle, CartesianChart, useChartPressState} from 'victory-native';

import lato from '@app/assets/fonts/Lato-Regular.ttf';
import {Routes, type RootTabScreenNavigationProps} from '@app/navigation/navigation.types';

import {ToolTip} from './ToolTip';

const SummaryGraph = ({
  data,
  totalIncome,
}: {
  totalIncome: number;
  data: {
    name: string;
    id: string;
    spent: number;
    targetLimit: number;
    targetPercentage: number;
  }[];
}) => {
  const font = useFont(lato, 14);
  const selectedBars = useSharedValue('');

  const {navigate} = useNavigation<RootTabScreenNavigationProps<typeof Routes.Transactions>>();

  const cartesianRef = useRef<CartesianActionsHandle<typeof state>>(null);

  const {state} = useChartPressState({
    x: '',
    y: {
      targetLimit: 0,
      spent: 0,
    },
  });

  const handleNavigation = (budgetId: string) => {
    navigate(Routes.TransactionByBudget, {budgetId});
  };

  const tapGesture = Gesture.Tap()
    .onStart(e => {
      const actions = cartesianRef.current;
      if (actions) {
        actions.handleTouch(state, e.x, e.y);
      }
    })
    .onEnd(() => {
      const currentTouch = state.x.value.value;
      const lastTouch = selectedBars.value;

      if (currentTouch !== '' && currentTouch === lastTouch) {
        runOnJS(handleNavigation)(currentTouch);
      }

      selectedBars.value = currentTouch;
    });

  const composed = Gesture.Race(tapGesture);

  const graphMaxHeight = data.reduce((max, d) => Math.max(max, d.targetLimit, d.spent), 0);

  return (
    <CartesianChart
      data={data}
      xKey={'id'}
      yKeys={['spent', 'targetLimit']}
      domainPadding={{left: 150, right: 150, top: 70}}
      domain={{y: [0, graphMaxHeight + 0.05 * totalIncome]}}
      actionsRef={cartesianRef}
      customGestures={composed}
      frame={{
        lineWidth: 0,
      }}
      renderOutside={() => (
        <ToolTip
          x={state.x.position}
          y={state.y.targetLimit.position}
          y2={state.y.spent.position}
          actual={state.y.spent.value}
          budget={state.y.targetLimit.value}
          font={font}
        />
      )}
      axisOptions={{
        formatXLabel: value => {
          const categories = data.map(e => e.name);
          return categories.includes(String(value)) ? String(value) : '';
        },
        lineColor: 'transparent',
        labelColor: 'transparent',
      }}>
      {({points, chartBounds}) => {
        return (
          <>
            <Bar
              points={points.targetLimit}
              chartBounds={chartBounds}
              innerPadding={0.5}
              color="#e1265b72"
              roundedCorners={{topLeft: 4, topRight: 4}}
            />
            <Bar
              points={points.spent}
              chartBounds={chartBounds}
              innerPadding={0.5}
              color="#e1265b"
              roundedCorners={{topLeft: 4, topRight: 4}}
            />
          </>
        );
      }}
    </CartesianChart>
  );
};

export default SummaryGraph;
