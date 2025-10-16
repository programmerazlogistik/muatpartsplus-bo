import { OrderStatusEnum, OrderStatusTitle } from "./detailpesanan.enum";
import { DriverStatusEnum, DriverStatusLabel } from "./driver-status.enum";

const SHOULD_RETURNS_DRIVER_STATUS = [
  OrderStatusEnum.LOADING,
  OrderStatusEnum.UNLOADING,
  OrderStatusEnum.FLEET_CHANGE,
];

export interface GetStatusDriverMetadataParams {
  driverStatus?: string | null;
  orderStatus?: string | null;
  t: (key: string, options?: Record<string, any>, defaultValue?: string) => string;
}

export interface StatusDriverMetadata {
  variant: string;
  label: string;
}

export const getStatusDriverMetadata = ({
  driverStatus = null,
  orderStatus = null,
  t,
}: GetStatusDriverMetadataParams): StatusDriverMetadata => {
  let variant = "primary";
  let label = "";
  const splitStatus = driverStatus?.split?.("_");
  if (!splitStatus) return { variant, label };

  // Special case: WAITING_CONFIRMATION_CHANGES with MENUNGGU_ARMADA_PENGGANTI should use primary variant
  if (
    orderStatus === OrderStatusEnum.WAITING_CONFIRMATION_CHANGES &&
    driverStatus === DriverStatusEnum.FLEET_CHANGE.MENUNGGU.code
  ) {
    variant = "primary";
  } else if (orderStatus?.startsWith("WAITING")) variant = "warning";
  else if (orderStatus?.startsWith("CANCELED")) variant = "error";
  else if (orderStatus === OrderStatusEnum.COMPLETED) variant = "success";

  if (!SHOULD_RETURNS_DRIVER_STATUS.includes(orderStatus as string)) {
    label = t(OrderStatusTitle[orderStatus as string]);
    return { variant, label };
  }

  const locationIndex = Number(splitStatus.slice(-1)?.[0]);
  if (isNaN(locationIndex)) {
    label = t(DriverStatusLabel[splitStatus.join("_")]);
    return { variant, label };
  }
  let newStatus = splitStatus.slice(0, -1).join("_");
  if (newStatus.includes("SEDANG")) {
    newStatus = `SEDANG_${splitStatus[1]}_MULTIPLE`;
  }

  label = `${t(DriverStatusLabel[newStatus])} ${locationIndex}`;
  return { variant, label };
};