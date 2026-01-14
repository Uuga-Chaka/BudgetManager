import {type IndexPath} from '@ui-kitten/components';

export type CategoryInputProps = {
  onGroupNameChange?: (value: string) => void;
  onSelectCategory?: (value: IndexPath | IndexPath[]) => void;
  defaultGroupName?: string;
  onDelete?: (value: IndexPath | IndexPath[]) => void;
};
