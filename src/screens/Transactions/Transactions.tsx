import React from 'react';

import AppKeyBoardAwareScrollView from '@app/components/AppKeyBoardAwareScrollView/AppKeyBoardAwareScrollView';
import {DashboardCard} from '@app/components/DashboardCard/DashboardCard';
import TransactionList from '@app/components/TransactionList/TransactionList';

export default function Transactions() {
  return (
    <AppKeyBoardAwareScrollView>
      <DashboardCard />
      <TransactionList />
    </AppKeyBoardAwareScrollView>
  );
}
