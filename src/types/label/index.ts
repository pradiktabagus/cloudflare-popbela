import type { BoxProps, WrapProps } from '@chakra-ui/layout';

type LabelPath = {
  title: string;
  path?: string;
};

export type LabelProps = LabelPath & BoxProps;
export type LabelsAmpProps = {
  paths: LabelPath[];
  labelProps?: BoxProps;
};

export type LabelsProps = {
  paths: LabelPath[];
  labelBgColor?: string;
  labelProps?: BoxProps;
} & WrapProps;
