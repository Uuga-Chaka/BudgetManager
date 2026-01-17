import {create} from 'zustand';

import {getAllISOCodes} from '@app/utils/isoCountryCurrency';

interface LocaleState {
  availableRegions: ReturnType<typeof getAllISOCodes>;
  selectedRegion: string;
  setRegion: (code: string) => void;
}

export const useLocaleStore = create<LocaleState>(set => ({
  availableRegions: getAllISOCodes(),
  selectedRegion: 'CO',
  setRegion: code => set({selectedRegion: code}),
}));
