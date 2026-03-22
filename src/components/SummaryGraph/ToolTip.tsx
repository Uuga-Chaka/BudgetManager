import {Circle, RoundedRect, type SkFont, Text} from '@shopify/react-native-skia';
import {type SharedValue, useDerivedValue} from 'react-native-reanimated';

interface ToolTipProps {
  x: SharedValue<number>;
  y: SharedValue<number>;
  y2: SharedValue<number>;
  budget: SharedValue<number>;
  actual: SharedValue<number>;
  font: SkFont | null;
}

export function ToolTip({x, y, y2, budget, actual, font}: ToolTipProps) {
  const PADDING = 16;
  const bubbleWidth = useDerivedValue(() => {
    if (!font) return 0;
    const actualText = `Actual: $${actual.value.toLocaleString()}`;
    const budgetText = `Budget: $${budget.value.toLocaleString()}`;

    const actualWidth = font.measureText(actualText).width;
    const budgetWidth = font.measureText(budgetText).width;

    return Math.max(actualWidth, budgetWidth) + PADDING * 2;
  });

  const height = 50;
  const rectX = useDerivedValue(() => x.value - bubbleWidth.value / 2);
  const rectY = useDerivedValue(() => y.value - height - 15);

  return (
    <>
      <RoundedRect x={rectX} y={rectY} width={bubbleWidth} height={height} r={8} color="white" />
      <Text
        x={useDerivedValue(() => rectX.value + 10)}
        y={useDerivedValue(() => rectY.value + 20)}
        text={useDerivedValue(() => `Actual: $${actual.value.toLocaleString()}`)}
        font={font}
        color="black"
      />
      <Text
        x={useDerivedValue(() => rectX.value + 10)}
        y={useDerivedValue(() => rectY.value + 40)}
        text={useDerivedValue(() => `Budget: $${budget.value.toLocaleString()}`)}
        font={font}
        color="gray"
      />
      <Circle cx={x} cy={y} r={4} color="#e1265b72" />
      <Circle cx={x} cy={y2} r={4} color="#e1265b" />
    </>
  );
}
