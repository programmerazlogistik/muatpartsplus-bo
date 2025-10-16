import { Fragment, useCallback, useEffect, useState } from "react";

import { useDevice } from "@muatmuat/hooks/use-device";
import { cn, formatDate } from "@muatmuat/lib/utils";

import { tMockFn } from "../../lib/mock-t";
import { Button } from "../Button";
import { IconComponent } from "../IconComponent";
import { LightboxProvider, useLightbox } from "../Lightbox/Lightbox";
import { TimelineContainer } from "./TimelineContainer";
import { TimelineItem } from "./TimelineItem";
import {
  OrderStatusEnum,
  OrderStatusIcon,
  OrderStatusTitle,
} from "./detailpesanan.enum";
import { DriverStatusLabel } from "./driver-status.enum";
import { getStatusDriverMetadata } from "./getStatusDriverMetadata";

interface PhotoEvidence {
  packages?: any[];
  pods?: any[];
  photo?: any[];
}

interface StatusObject {
  statusCode: string;
  beforeStatusCode?: string;
  isParentProof?: boolean;
  photoEvidences?: PhotoEvidence;
  requiresPhoto?: boolean;
  date?: string;
  mappedOrderStatus?: string;
}

interface ParentStatus {
  mappedOrderStatus: string;
  date?: string;
  children?: StatusObject[];
  shippingEvidence?: PhotoEvidence;
}

interface DataTimeline {
  statusDefinitions: ParentStatus[];
}

interface StatusMeta {
  statusCode: string;
  index: number | null;
}

const getStatusCodeMeta = (statusCode?: string): StatusMeta => {
  if (!statusCode) return { statusCode: "", index: null };
  const splitted = statusCode.split("_");
  let index: number | null = null;
  if (!isNaN(Number(splitted[splitted.length - 1]))) {
    index = Number(splitted.pop());
  }
  return { statusCode: splitted.join("_"), index };
};

const calculateTitle = (
  currentStatus: StatusObject | null,
  activeIndex: number,
  images: PhotoEvidence,
  t: (key: string, options?: Record<string, any>, defaultValue?: string) => string
): string => {
  if (!currentStatus) return "";
  if (currentStatus.isParentProof) {
    const packagesCount = images.packages?.length || 0;
    if (currentStatus.mappedOrderStatus === OrderStatusEnum.DOCUMENT_DELIVERY) {
      return t(
        "DriverTimeline.labelLihatBuktiPengiriman",
        {},
        "Lihat Bukti Pengiriman"
      );
    }
    if (activeIndex < packagesCount) {
      return t(
        "DriverTimeline.labelBuktiBongkarBarang",
        {},
        "Bukti Bongkar Barang"
      );
    }
    return t("DriverTimeline.labelPODBongkar", {}, "POD Bongkar");
  }
  if (!currentStatus.beforeStatusCode?.includes("SEDANG")) {
    const { statusCode, index } = getStatusCodeMeta(currentStatus.statusCode);
    const statusName = `${t(DriverStatusLabel[statusCode])}${index && index > 1 ? ` ${index}` : ""}`;
    return t(
      "DriverTimeline.labelBuktiStatus",
      { statusName },
      "Bukti {statusName}"
    );
  }
  const { statusCode, index } = getStatusCodeMeta(
    currentStatus.beforeStatusCode
  );
  const isPodImage = activeIndex >= (images.packages?.length || 0);
  let titleKey: string;
  if (isPodImage) {
    titleKey = statusCode?.includes("MUAT")
      ? index && index > 1
        ? "DriverTimeline.labelPODMuatMulti"
        : "DriverTimeline.labelPODMuat"
      : index && index > 1
        ? "DriverTimeline.labelPODBongkarMulti"
        : "DriverTimeline.labelPODBongkar";
  } else {
    titleKey = statusCode?.includes("MUAT")
      ? index && index > 1
        ? "DriverTimeline.labelBuktiMuatBarangMulti"
        : "DriverTimeline.labelBuktiMuatBarang"
      : index && index > 1
        ? "DriverTimeline.labelBuktiBongkarBarangMulti"
        : "DriverTimeline.labelBuktiBongkarBarang";
  }
  return t(titleKey, { index });
};

export interface DriverTimelineProps {
  dataTimeline: DataTimeline;
  onClickProof?: (item: StatusObject) => void;
  t?: (key: string, options?: Record<string, any>, defaultValue?: string) => string;
}

export const DriverTimeline: React.FC<DriverTimelineProps> = ({
  dataTimeline,
  onClickProof,
  t = tMockFn
}) => {
  const [images, setImages] = useState<PhotoEvidence>({ packages: [], pods: [], photo: [] });
  const [currentStatus, setCurrentStatus] = useState<StatusObject | null>(null);
  const [lightboxActiveIndex, setLightboxActiveIndex] = useState(0);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const newTitle = calculateTitle(
      currentStatus,
      lightboxActiveIndex,
      images,
      t
    );
    setTitle(newTitle);
  }, [currentStatus, lightboxActiveIndex, images, t]);

  const handleSetLightboxData = useCallback((statusObject: StatusObject) => {
    const evidence = statusObject.isParentProof
      ? statusObject.photoEvidences
      : statusObject.photoEvidences;
    setImages({
      packages: evidence?.packages || [],
      pods: evidence?.pods || [],
      photo: evidence?.photo || [],
    });
    setCurrentStatus(statusObject);
  }, []);

  return (
    <div>
      <LightboxProvider
        images={[
          ...(images.packages || []),
          ...(images.pods || []),
          ...(images.photo || []),
        ]}
        image={null}
        title={title}
      >
        {dataTimeline?.statusDefinitions.map((parent, parentIndex) => (
          <Fragment key={`${parent.mappedOrderStatus}-${parentIndex}`}>
            {parent?.children && parent.children.length > 0 && (
              <TimelineContainer className="mb-4 md:mb-5">
                {parent.children.map((driverStatusItem, index) => (
                  <ItemWithLightbox
                    key={driverStatusItem.statusCode}
                    data={{
                      item: driverStatusItem,
                      isActive: parentIndex === 0 && index === 0,
                      isLastInGroup: index === parent.children.length - 1,
                      orderStatus: parent.mappedOrderStatus,
                    }}
                    setLightboxActiveIndex={setLightboxActiveIndex}
                    onSetLightboxData={handleSetLightboxData}
                    onMobileClick={onClickProof}
                    index={index}
                  />
                ))}
              </TimelineContainer>
            )}
            <ParentItem
              parent={parent}
              isActive={parentIndex === 0}
              isLastItem={
                parentIndex === dataTimeline.statusDefinitions.length - 1
              }
              onSetLightboxData={handleSetLightboxData}
            />
          </Fragment>
        ))}
      </LightboxProvider>
    </div>
  );
};

interface ItemData {
  item: StatusObject;
  isActive: boolean;
  isLastInGroup: boolean;
  orderStatus: string;
}

interface ItemWithLightboxProps {
  data: ItemData;
  setLightboxActiveIndex: (index: number) => void;
  onSetLightboxData: (statusObject: StatusObject) => void;
  onMobileClick?: (item: StatusObject) => void;
  index: number;
  t?: (key: string, options?: Record<string, any>, defaultValue?: string) => string;
}

const ItemWithLightbox: React.FC<ItemWithLightboxProps> = ({
  data,
  setLightboxActiveIndex,
  onSetLightboxData,
  onMobileClick,
  index,
  t = tMockFn,
}) => {
  const { item, isActive, isLastInGroup, orderStatus } = data;
  const { current, openLightbox } = useLightbox();
  const { isMobile } = useDevice();

  useEffect(() => {
    setLightboxActiveIndex(current);
  }, [current, setLightboxActiveIndex]);

  const handleProofClick = () => {
    if (isMobile && onMobileClick) {
      onMobileClick(item);
      return;
    }
    onSetLightboxData(item);
    openLightbox(0);
  };

  const statusMeta = getStatusDriverMetadata({
    orderStatus,
    driverStatus: item.statusCode,
    t,
  });

  const labelDetail = (): string => {
    if (
      item.statusCode?.startsWith("MENUJU_") ||
      item.statusCode?.startsWith("PENGIRIMAN_")
    ) {
      if (item?.beforeStatusCode?.includes?.("MUAT"))
        return t(
          "DriverTimeline.labelLihatBuktiMuatBarangPOD",
          {},
          "Lihat Bukti Muat Barang & POD"
        );
      else
        return t(
          "DriverTimeline.labelLihatBuktiBongkarBarangPOD",
          {},
          "Lihat Bukti Bongkar Barang & POD"
        );
    }
    return t(
      "DriverTimeline.labelLihatBuktiStatus",
      { statusName: statusMeta.label },
      "Lihat Bukti {statusName}"
    );
  };

  return (
    <TimelineItem
      variant="bullet-driver-status"
      activeIndex={isActive ? 0 : -1}
      index={index}
      title={statusMeta.label}
      isLast={isLastInGroup}
      timestamp={item.date}
      className="grid-cols-[32px_1fr] gap-x-3 pb-4"
      appearance={{
        titleClassname: isActive
          ? "font-semibold text-neutral-900"
          : "text-neutral-600",
      }}
      buttonDetail={
        item.requiresPhoto && (
          <Button variant="link" className="mt-1" onClick={handleProofClick}>
            {labelDetail()}
          </Button>
        )
      }
    />
  );
};

interface ParentItemProps {
  parent: ParentStatus;
  isActive: boolean;
  isLastItem: boolean;
  onSetLightboxData: (statusObject: StatusObject) => void;
  t?: (key: string, options?: Record<string, any>, defaultValue?: string) => string;
}

const iconStyles: Record<string, string> = {
  canceled: "bg-error-400 text-neutral-50",
  active: "bg-muat-trans-primary-400 text-muat-trans-primary-900",
  inactive: "bg-neutral-200 text-neutral-600 border-neutral-400",
};

const ParentItem: React.FC<ParentItemProps> = ({
  parent,
  isActive,
  isLastItem,
  onSetLightboxData,
  t = tMockFn,
}) => {
  const { isMobile } = useDevice();
  const { openLightbox } = useLightbox();

  const handleShowProof = () => {
    const syntheticStatus: StatusObject = {
      statusCode: parent.mappedOrderStatus,
      isParentProof: true,
      photoEvidences: parent.shippingEvidence,
      mappedOrderStatus: parent.mappedOrderStatus,
    };
    onSetLightboxData(syntheticStatus);
    openLightbox(0);
  };

  const variant = parent.mappedOrderStatus?.startsWith("CANCELED")
    ? "canceled"
    : isActive
      ? "active"
      : "inactive";
  const icon =
    variant === "canceled" && !isMobile
      ? "/icons/close-circle.svg"
      : variant === "canceled" && isMobile
        ? "/icons/close-circle.svg"
        : OrderStatusIcon[parent.mappedOrderStatus];
  const title = t(OrderStatusTitle[parent.mappedOrderStatus]);
  const withLine =
    parent.mappedOrderStatus === OrderStatusEnum.DOCUMENT_DELIVERY;
  const withDivider = !isLastItem && !withLine;
  const timestamp = parent.date;

  const buttonProps = (() => {
    const evidence = parent?.shippingEvidence;
    if (evidence?.packages && evidence.packages.length > 0 || evidence?.pods && evidence.pods.length > 0) {
      return {
        label: t(
          "DriverTimeline.labelLihatBuktiMuatBarangPOD",
          {},
          "Lihat Bukti Muat Barang & POD"
        ),
        onClick: handleShowProof,
      };
    }
    if (evidence?.photo && evidence.photo.length > 0) {
      return {
        label: t(
          "DriverTimeline.labelLihatBuktiPengiriman",
          {},
          "Lihat Bukti Pengiriman"
        ),
        onClick: handleShowProof,
      };
    }
    return null;
  })();

  const className = cn(
    isActive && !parent?.children && "md:mt-0",
    buttonProps && "pb-2"
  );

  return (
    <div className="w-full">
      <div className={cn("flex items-center gap-3", className)}>
        <div className="flex flex-col items-center self-stretch">
          <div
            className={cn(
              "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-transparent md:border",
              iconStyles[variant]
            )}
          >
            <IconComponent src={icon || ""} className="h-5 w-5 md:h-4 md:w-4" />
          </div>
          {withLine && (
            <div className="w-0 flex-1 border-l-2 border-dashed border-neutral-400" />
          )}
        </div>
        <div className={cn("w-full flex-1", withLine && "pb-8 pt-2")}>
          <div
            className={cn(
              "flex items-center justify-between text-sm font-bold leading-tight",
              variant === "inactive" ? "text-neutral-600" : "text-neutral-900"
            )}
          >
            <div className="relative flex-1">
              <span>{title}</span>
              {buttonProps && (
                <button
                  onClick={buttonProps.onClick}
                  className="text-primary-700 absolute -bottom-0.5 left-0 translate-y-full text-xs font-medium"
                >
                  {buttonProps.label}
                </button>
              )}
            </div>
            {timestamp && (
              <span
                className={cn(
                  "block w-20 text-right text-xs font-medium leading-tight md:w-fit",
                  isMobile ? "text-neutral-900" : "text-neutral-600"
                )}
              >
                {formatDate(timestamp)}
              </span>
            )}
          </div>
        </div>
      </div>
      {withDivider && (
        <div className="my-4 grid items-center gap-3 md:my-5 md:grid-cols-[32px_1fr]">
          <div className="hidden md:block" />
          <hr className="w-full border-neutral-400" />
        </div>
      )}
    </div>
  );
};