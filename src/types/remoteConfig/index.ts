export type TFlags = TFlag[];
export type TFlag = {
  flag?: string;
  value?: string;
};
export type TFlagContext = {
  flags?: TFlags;
  isLoadingFlag?: boolean;
};
export type TFlagValue = {
  result?: any;
  isLoadingFlag?: boolean;
};
