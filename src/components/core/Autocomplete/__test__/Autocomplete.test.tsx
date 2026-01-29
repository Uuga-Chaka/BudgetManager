import {type ReactElement} from 'react';

import {render, screen, userEvent} from '@testing-library/react-native';

import AppKeyBoardAwareScrollView from '@app/components/AppKeyBoardAwareScrollView/AppKeyBoardAwareScrollView';
import {useAppTheme} from '@app/theme/useAppTheme';
import {mockTheme} from '@app/utils/test/theme.mock';

import Text from '../../Text/Text';
import Autocomplete from '../Autocomplete';

jest.mock('@app/theme/useAppTheme');

type ListItemObjectMock = {firstName: string; lastName: string}[];
const listItemMock: ListItemObjectMock = [
  {
    firstName: 'John',
    lastName: 'Doe',
  },
  {
    firstName: 'Jane',
    lastName: 'Doe',
  },
  {
    firstName: 'Average',
    lastName: 'Joe',
  },
];

const renderItemMock = <T,>(item: T) => <Text testID="autocomplete_listitem">{item}</Text>;

const setup = <T,>({
  data = [],
  emptyText,
  renderItem,
  filterOptions,
}: {
  data?: T[];
  emptyText?: string;
  renderItem: (value: T) => ReactElement;
  filterOptions?: (data: T[], value: string) => void;
}) => {
  const user = userEvent.setup();

  render(
    <AppKeyBoardAwareScrollView>
      <Autocomplete<T>
        placeholder="autocomplete"
        data={data ?? []}
        renderItem={renderItem || renderItemMock}
        ListEmptyComponent={<Text>{emptyText}</Text>}
        filterOptions={filterOptions}
      />
    </AppKeyBoardAwareScrollView>,
  );

  const inputs = screen.getAllByPlaceholderText('autocomplete');

  return {user, inputs};
};

describe('Autocomplete test suite', () => {
  beforeEach(() => {
    (useAppTheme as jest.Mock).mockReturnValue(mockTheme);
  });

  describe('basic functionality', () => {
    it('should renders default state of Autocomplete component', () => {
      const {inputs} = setup<string>({renderItem: renderItemMock});
      expect(inputs[0]).not.toBeUndefined();
      expect(inputs[1]).toBeUndefined();
    });

    it('should render open state when first input is focused', async () => {
      const expectedValue = 'hey';
      const {inputs, user} = setup({renderItem: renderItemMock});

      expect(inputs[1]).toBeUndefined();

      await user.type(inputs[0], expectedValue, {skipBlur: true});

      const afterPressInputs = await screen.findByTestId('autocomplete_popover_input');

      expect(afterPressInputs).not.toBeUndefined();
    });

    it('should close popover after blur event', async () => {
      const expectedValue = 'hey';

      const {inputs, user} = setup({renderItem: renderItemMock});

      await user.type(inputs[0], expectedValue, {skipBlur: true});
      let afterPressInputs = await screen.findAllByPlaceholderText('autocomplete');

      await user.type(afterPressInputs[1], expectedValue);
      expect(afterPressInputs.length).toBe(2);

      afterPressInputs = await screen.findAllByPlaceholderText('autocomplete');
      expect(afterPressInputs.length).toBe(1);
    });

    it('should render empty state when data property is empty', async () => {
      const expectedValue = 'empty state';

      const {inputs, user} = setup({emptyText: expectedValue, renderItem: renderItemMock});

      await user.type(inputs[0], expectedValue, {skipBlur: true});

      const emptyState = screen.getByText(expectedValue);

      expect(emptyState.children[0]).toEqual(expectedValue);
    });

    it('should set the same value for both inputs when text change', async () => {
      const expectedValue = 'hey';

      const {inputs, user} = setup({renderItem: renderItemMock});

      await user.type(inputs[0], '');
      const afterPressInputs = await screen.findAllByPlaceholderText('autocomplete');

      await user.type(afterPressInputs[1], expectedValue);
      expect(afterPressInputs.length).toBe(2);

      expect(afterPressInputs.map(e => e.props.value)).toEqual([expectedValue, expectedValue]);
    });
  });

  describe('data is array of strings', () => {
    it('should render all the listed items in the data property', async () => {
      const expectedValue = 'value';

      const {inputs, user} = setup({
        data: [expectedValue, expectedValue, expectedValue],
        renderItem: renderItemMock,
      });

      await user.type(inputs[0], expectedValue, {skipBlur: true});

      const listItems = screen.getAllByText(expectedValue);

      expect(listItems.length).toEqual(3);
    });

    it('should filter the list when input value changes', async () => {
      const {inputs, user} = setup({
        data: ['value-1', 'value-2', 'value-3'],
        renderItem: renderItemMock,
      });

      await user.type(inputs[0], '1', {skipBlur: true});
      const listItems = await screen.getAllByTestId('autocomplete_listitem');
      expect(listItems.length).toBe(1);
    });

    it('should execute onSelect with the arguments being the item selected', () => {});
  });

  describe('data is an array of objects', () => {
    it('should render all the listed items in the data property', async () => {
      const {inputs, user} = setup({
        data: listItemMock,
        renderItem: ({firstName, lastName}) => (
          <Text>
            {firstName}-{lastName}
          </Text>
        ),
      });
      await user.type(inputs[0], '', {skipBlur: true});

      listItemMock.forEach(({firstName, lastName}) => {
        screen.getAllByText(`${firstName}-${lastName}`);
      });
    });

    it('should filter properly given filterOptions', async () => {
      const {inputs, user} = setup({
        data: listItemMock,
        renderItem: ({firstName, lastName}) => (
          <Text>
            {firstName}-{lastName}
          </Text>
        ),
        filterOptions: (data, value) => data.filter(d => d.firstName === value),
      });
      await user.type(inputs[0], 'Jane', {skipBlur: true});
      screen.getAllByText(`Jane-Doe`);
    });

    it('should execute onSelect with the arguments being the item selected', () => {});
  });
});
