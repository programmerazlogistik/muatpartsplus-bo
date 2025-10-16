import { useState } from "react";

import { useDevice } from "@muatmuat/hooks/use-device";
import { cn } from "@muatmuat/lib/utils";

import IconComponent from "../IconComponent/IconComponent";

/**
 * A standard translation function signature.
 */
export type TranslationFunction = (key: string) => string;

export interface RatingInputProps {
  /**
   * An optional translation function. If not provided, it will return the key itself.
   * @param key The translation key string.
   * @returns The translated string.
   */
  t?: TranslationFunction;
  /**
   * The current selected rating value, from 0 to 5.
   * @default 0
   */
  value?: number;
  /**
   * Callback function that fires when a star is clicked.
   * @param rating The new rating value (1-5).
   */
  onChange?: (rating: number) => void;
  /**
   * If `true`, the rating input will be disabled and non-interactive.
   * @default false
   */
  disabled?: boolean;
  /**
   * If `true`, a descriptive text label (e.g., "Sangat Baik") will be shown next to the stars.
   * @default true
   */
  withLabel?: boolean;
}

/**
 * A star-based rating input component that allows users to select a rating from 1 to 5.
 * It supports disabled states, hover effects, and an optional descriptive label.
 */
const RatingInput = ({
  t = (label) => label,
  value = 0,
  onChange,
  disabled = false,
  withLabel = true,
}: RatingInputProps) => {
  const { isMobile } = useDevice();
  const [hover, setHover] = useState<number>(0);

  /**
   * Returns the corresponding translated text label for a given rating score.
   * @param score The numeric rating value (1-5).
   * @returns The translated label string.
   */
  const getRatingLabel = (score: number): string => {
    switch (score) {
      case 1:
        return t("labelSangatBuruk");
      case 2:
        return t("labelBuruk");
      case 3:
        return t("labelCukup");
      case 4:
        return t("labelBaik");
      case 5:
        return t("labelSangatBaik");
      default:
        return "";
    }
  };

  const handleStarClick = (rating: number) => {
    if (!disabled && onChange) {
      onChange(rating);
    }
  };

  const handleMouseEnter = (rating: number) => {
    if (!disabled) {
      setHover(rating);
    }
  };

  const handleMouseLeave = () => {
    if (!disabled) {
      setHover(0);
    }
  };

  return (
    <div className="flex items-center gap-4 md:gap-1">
      <div className="flex items-center [&>*+*]:pl-1">
        {[1, 2, 3, 4, 5].map((starValue) => (
          <button
            type="button"
            key={starValue}
            disabled={disabled}
            onClick={() => handleStarClick(starValue)}
            onMouseEnter={() => handleMouseEnter(starValue)}
            onMouseLeave={handleMouseLeave}
            className="disabled:cursor-not-allowed"
            aria-label={`Rate ${starValue} out of 5 stars`}
          >
            <IconComponent
              className={cn(
                "transition-colors duration-200",
                (hover || value) >= starValue
                  ? "text-secondary-700"
                  : isMobile
                    ? "text-neutral-700"
                    : "text-neutral-400"
              )}
              src={
                isMobile && (hover || value) < starValue
                  ? "/icons/bintang-outline24.svg"
                  : "/icons/bintang-solid24.svg"
              }
              size="medium"
            />
          </button>
        ))}
      </div>
      {withLabel && value > 0 && (
        <span className="text-xs font-semibold leading-[14.4px] text-neutral-900">
          {getRatingLabel(value)}
        </span>
      )}
    </div>
  );
};

export default RatingInput;
