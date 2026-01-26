import {render, screen, userEvent} from '@testing-library/react-native';

import {useAppTheme} from '@app/theme/useAppTheme';
import {mockTheme} from '@app/utils/test/theme.mock';

import Text from '../../Text/Text';
import Autocomplete from '../Autocomplete';

jest.mock('@app/theme/useAppTheme');

describe('Autocomplete test suite', () => {
  beforeEach(() => {
    (useAppTheme as jest.Mock).mockReturnValue(mockTheme);
  });

  it('renders default state of Autocomplete component', () => {
    render(<Autocomplete placeholder="autocomplete" data={[]} renderItem={() => null} />);

    const inputs = screen.getAllByPlaceholderText('autocomplete');
    expect(inputs[0]).not.toBeUndefined();
    expect(inputs[1]).toBeUndefined();
  });

  it('render open state when first input is focused', async () => {
    const user = userEvent.setup();
    const expectedValue = 'hey';
    render(<Autocomplete placeholder="autocomplete" data={[]} renderItem={() => null} />);
    const inputs = screen.getAllByPlaceholderText('autocomplete');

    expect(inputs[1]).toBeUndefined();

    await user.type(inputs[0], expectedValue, {skipBlur: true});

    const afterPressInputs = await screen.findByTestId('autocomplete_popover_input');

    expect(afterPressInputs).not.toBeUndefined();
  });

  it('closes popover after blur event', async () => {
    const user = userEvent.setup();
    const expectedValue = 'hey';

    render(<Autocomplete placeholder="autocomplete" data={[]} renderItem={() => null} />);
    const inputs = screen.getAllByPlaceholderText('autocomplete');

    await user.type(inputs[0], expectedValue, {skipBlur: true});
    let afterPressInputs = await screen.findAllByPlaceholderText('autocomplete');

    await user.type(afterPressInputs[1], expectedValue);
    expect(afterPressInputs.length).toBe(2);

    afterPressInputs = await screen.findAllByPlaceholderText('autocomplete');
    expect(afterPressInputs.length).toBe(1);
  });

  it('renders empty state when data property is empty', async () => {
    const user = userEvent.setup();
    const expectedValue = 'empty state';

    render(
      <Autocomplete<{id: string}>
        placeholder="autocomplete"
        data={[]}
        renderItem={({item}) => <Text>{item.id}</Text>}
        ListEmptyComponent={<Text>{expectedValue}</Text>}
      />,
    );
    const inputs = screen.getAllByPlaceholderText('autocomplete');

    await user.type(inputs[0], expectedValue, {skipBlur: true});

    const emptyState = screen.getByText(expectedValue);

    expect(emptyState.children[0]).toEqual(expectedValue);
  });

  it('should render all the listed items in the data property', async () => {
    const user = userEvent.setup();
    const expectedValue = 'value';

    render(
      <Autocomplete
        placeholder="autocomplete"
        data={[{value: expectedValue}, {value: expectedValue}, {value: expectedValue}]}
        renderItem={({item}) => <Text>{item.value}</Text>}
        ListEmptyComponent={<Text>{expectedValue}</Text>}
      />,
    );
    const inputs = screen.getAllByPlaceholderText('autocomplete');

    await user.type(inputs[0], expectedValue, {skipBlur: true});

    const listItems = screen.getAllByText(expectedValue);

    expect(listItems.length).toEqual(3);
  });
});
