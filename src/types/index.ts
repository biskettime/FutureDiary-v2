export interface TagInfo {
  name: string;
  icon: string;
  color: string;
}

export interface DiaryEntry {
  id: string;
  title: string;
  content: string;
  date: string;
  mood?:
    | 'excited'
    | 'happy'
    | 'content'
    | 'neutral'
    | 'sad'
    | 'angry'
    | 'anxious';
  emoji?: string;
  tags?: (string | TagInfo)[];
  selectedWeather?: string[];
  selectedPeople?: string[];
  selectedSchool?: string[];
  selectedCompany?: string[];
  selectedTravel?: string[];
  selectedFood?: string[];
  selectedDessert?: string[];
  selectedDrink?: string[];
  actualResult?: 'realized' | 'not_realized' | string;
  resultStatus?: 'realized' | 'not_realized';
  createdAt: string;
  updatedAt: string;
}

export interface DiaryFilter {
  searchText?: string;
  mood?: 'good' | 'neutral' | 'bad';
  dateRange?: {
    start: string;
    end: string;
  };
}

export type RootStackParamList = {
  MainTabs: undefined;
  WriteEntry: {entry?: DiaryEntry; isEdit?: boolean};
  ViewEntry: {entry: DiaryEntry};
};

export type TabParamList = {
  Timeline: undefined;
  Home: undefined;
  Calendar: undefined;
  Search: undefined;
  Settings: undefined;
};
