import {
  BadgeDollarSign,
  ChartArea,
  DollarSign,
  LucideProps,
  Plus,
  Settings,
  Trash2,
} from 'lucide-react-native';
import {ReactElement} from 'react';

export type LucidaIconType = (props: LucideProps) => ReactElement;

const defaultProps: LucideProps = {color: 'black', size: 24};
export const TrashIcon = (props = defaultProps) => <Trash2 {...props} />;
export const TransactionIcon = (props = defaultProps) => <BadgeDollarSign {...props} />;
export const DashboardIcon = (props = defaultProps) => <ChartArea {...props} />;
export const SettingsIcon = (props = defaultProps) => <Settings {...props} />;
export const PlusIcons = (props = defaultProps) => <Plus {...props} />;
export const DollarSignIcon = (props = defaultProps) => <DollarSign {...props} />;
