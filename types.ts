
export enum AppState {
  INITIAL,
  IMPROVING_PROMPT,
  SUGGESTING_FEATURES,
  FEATURES_READY,
  GENERATING_UI,
  UI_READY,
  ERROR,
}

export interface FeatureOption {
  name: string;
  description: string;
}

export interface FeatureCategory {
  category: string;
  description: string;
  options: FeatureOption[];
}

export interface SelectedFeature {
  category: string;
  selectedOption: string;
}
