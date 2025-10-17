import * as React from "react";

export interface CardProps {
  className?: string;
  keys?: string | number;
  children?: React.ReactNode;
}

export interface CardHeaderProps {
  className?: string;
  children?: React.ReactNode;
}

export interface CardContentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface CardFooterProps {
  className?: string;
  children?: React.ReactNode;
}

export interface ListContentProps {
  icon: string | React.ComponentType<any>;
  title: string;
  value: string;
  className?: string;
}

export interface ConditionalDivProps {
  className?: string;
  children?: React.ReactNode;
  [key: string]: any;
}

export interface CardRiwayatPerubahanRootProps {
  title?: string;
  children?: React.ReactNode;
  t?: (
    key: string,
    params?: Record<string, any>,
    defaultValue?: string
  ) => string;
}

export interface CardRiwayatPerubahanItemProps {
  isActive?: boolean;
  timestamp: string;
  actor: string;
  action: string;
  children?: React.ReactNode;
}

export interface CardRiwayatPerubahanContentPerubahanProps {
  title?: string;
  className?: string;
  children?: React.ReactNode;
  appearance?: {
    contentClassName?: string;
  };
  footer?: React.ReactNode;
  t?: (
    key: string,
    params?: Record<string, any>,
    defaultValue?: string
  ) => string;
}

export interface ChangeSectionProps {
  isFirst?: boolean;
  icon: string;
  title: string;
  timestamp: string;
  children?: React.ReactNode;
  className?: string;
  appearance?: {
    contentClassName?: string;
  };
}

export interface ChangeDetailColumnProps {
  label: string;
  children?: React.ReactNode;
}

export interface ItemPerubahanDriverProps {
  isFirst?: boolean;
  timestamp: string;
  before: {
    picture: string;
    name: string;
  };
  after: {
    picture: string;
    name: string;
  };
  t?: (
    key: string,
    params?: Record<string, any>,
    defaultValue?: string
  ) => string;
}

export interface ArmadaInfoProps {
  picture: string;
  plate: string;
  name: string;
  t?: (
    key: string,
    params?: Record<string, any>,
    defaultValue?: string
  ) => string;
}

export interface ItemPerubahanArmadaProps {
  isFirst?: boolean;
  timestamp: string;
  before: {
    picture: string;
    plate: string;
    name: string;
  };
  after: {
    picture: string;
    plate: string;
    name: string;
  };
  t?: (
    key: string,
    params?: Record<string, any>,
    defaultValue?: string
  ) => string;
}

export interface TransporterInfoProps {
  picture: string;
  name: string;
  units: number;
  phone?: string;
  t?: (
    key: string,
    params?: Record<string, any>,
    defaultValue?: string
  ) => string;
}

export interface ItemPerubahanTransporterProps {
  title?: string;
  isFirst?: boolean;
  isLast?: boolean;
  timestamp: string;
  before: TransporterInfoProps[];
  after: TransporterInfoProps[];
  blastCount?: number;
  className?: string;
  appearance?: {
    sectionContentClassName?: string;
  };
  t?: (
    key: string,
    params?: Record<string, any>,
    defaultValue?: string
  ) => string;
}

export interface ItemPesananDibatalkanProps {
  picture?: string;
  name?: string;
  unit?: number;
  reason?: string;
  t?: (
    key: string,
    params?: Record<string, any>,
    defaultValue?: string
  ) => string;
}

export interface ItemPenolakanGMProps {
  title: string;
  reason: string;
}

export interface LocationInfo {
  sequence: number;
  address: string;
  note?: string;
  contactName?: string;
  contactPhone?: string;
}

export interface RouteInfo {
  pickups: LocationInfo[];
  dropoffs: LocationInfo[];
  distance: string;
}

export interface ItemPerubahanRuteProps {
  before: RouteInfo;
  after: RouteInfo;
  isFirst?: boolean;
  className?: string;
  appearance?: {
    sectionContentClassName?: string;
  };
  t?: (
    key: string,
    params?: Record<string, any>,
    defaultValue?: string
  ) => string;
}

export interface ItemPerubahanWaktuProps {
  before: {
    label?: string;
    timestamp: string;
  };
  after: {
    label?: string;
    timestamp: string;
  };
  isFirst?: boolean;
  isLast?: boolean;
  className?: string;
  appearance?: {
    sectionContentClassName?: string;
  };
  t?: (
    key: string,
    params?: Record<string, any>,
    defaultValue?: string
  ) => string;
}

export interface TimeInfoProps {
  title: string;
  timestamp?: string;
}
