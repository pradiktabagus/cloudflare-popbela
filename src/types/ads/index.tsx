import type { DeviceViewProps } from '../device';

export type TAdProps = DeviceViewProps;
export type AdsProps = {
  adUnit?: string | string[];
  pubadstargetting?: Targetting;
  classNames?: string;
  isTransition?: boolean;
};

type Targetting = {
  name: string;
  value: string | string[];
};
export type GeneralSize = SingleSize | MultiSize;
type MultiSize = SingleSize[];
type NamedSize = 'fluid' | ['fluid'];
type SingleSize = SingleSizeArray | NamedSize;
type SingleSizeArray = [number, number];
export type AdsSlotProps = {
  adUnit?: string;
  size?: GeneralSize;
  slotId?: string;
  targetting?: Targetting;
  pubadstargetting?: Targetting;
  isTransition?: boolean;
};
export type TAdsAmp = {
  kategori: string | string[];
};
export type TadsSlot = {
  className?: string;
};

export type TadsSlotGlance = {
  className?: string;
  id: string;
};

export type FluidItem = ['fluid'];
export type SizeItem = [number, number];
export type TargetItem = [string, string | string[]];
export type ResponsiveItem = {
  breakpoint: SizeItem;
  sizes: SizeItem | SizeItem[];
};
export type AdsContextValue = {
  isLoading: boolean;
};

type AdsProviderProps = {
  debug?: boolean;
  enableLazyload?: boolean;
  children?: React.ReactNode;
  DFPNetworkID: string | number | undefined;
};

export type AdsProviderComponent = React.FC<AdsProviderProps>;

export type SizeMappings = FluidItem | SizeItem | SizeItem[] | ResponsiveItem[];
export type AdItem = {
  divId: string;
  slotId: string;
  sizeMappings: SizeMappings;
  slotTargetting: TargetItem[];
  type?: string | 'custom' | 'INTERSTITIAL';
  category?: string;
};
type AdProps = {
  id: string;
  className?: string;
  classNameUnits?: string;
  placeholder?: boolean;
};
export type DefineSlot = {
  size: GeneralSize;
  adUnitPath: string;
  div: string;
  targetingArguments: {
    [elemName: string]: string;
  };
  collapseEmptyDivs?: boolean;
};
export type AdComponent = React.FC<AdProps>;
