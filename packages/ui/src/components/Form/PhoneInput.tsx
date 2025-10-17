"use client";

import React from "react";

import { cn } from "@muatmuat/lib/utils";
import { Input } from "@muatmuat/ui/Form";
import { Popover, PopoverContent, PopoverTrigger } from "@muatmuat/ui/Popover";
import { ChevronDown } from "lucide-react";
import * as RPNInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";

type PhoneInputProps = Omit<
  React.ComponentProps<"input">,
  "onChange" | "value" | "ref"
> &
  Omit<RPNInput.Props<typeof RPNInput.default>, "onChange"> & {
    onChange?: (value: RPNInput.Value) => void;
  };

type CountryEntry = { label: string; value: RPNInput.Country | undefined };

type CountrySelectProps = {
  disabled?: boolean;
  value: RPNInput.Country;
  options: CountryEntry[];
  onChange: (country: RPNInput.Country) => void;
  className?: string;
};

interface CountrySelectOptionProps extends RPNInput.FlagProps {
  selectedCountry: RPNInput.Country;
  onChange: (country: RPNInput.Country) => void;
  onSelectComplete: () => void;
}

/**
 * Main Phone Input Component
 */
const PhoneInput: React.ForwardRefExoticComponent<PhoneInputProps> =
  React.forwardRef<React.ElementRef<typeof RPNInput.default>, PhoneInputProps>(
    ({ className, onChange, value, ...props }, ref) => {
      return (
        <RPNInput.default
          ref={ref}
          className={cn(
            "flex items-center overflow-hidden rounded-md border border-neutral-600",
            className
          )}
          flagComponent={FlagComponent}
          countrySelectComponent={CountrySelect}
          inputComponent={InputComponent}
          smartCaret={false}
          value={value || undefined}
          onChange={(value) => onChange?.(value || ("" as RPNInput.Value))}
          {...props}
        />
      );
    }
  );
PhoneInput.displayName = "PhoneInput";

/**
 * Input component for the phone number part
 */
const InputComponent = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, value, onChange, ...props }, ref) => (
  <input
    className={cn("h-8 w-full rounded-e-md rounded-s-none px-3", className)}
    value={typeof value === "string" ? value : String(value || "")}
    onChange={onChange}
    {...props}
    ref={ref}
  />
));
InputComponent.displayName = "InputComponent";

/**
 * Country Select Dropdown Component
 */
const CountrySelect = ({
  disabled,
  value: selectedCountry,
  options: countryList,
  onChange,
  className,
}: CountrySelectProps) => {
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);
  const [searchValue, setSearchValue] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Popover
      open={isOpen}
      modal
      onOpenChange={(open) => {
        setIsOpen(open);
        open && setSearchValue("");
      }}
    >
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "flex h-8 items-center gap-1 border-r border-neutral-600 px-1",
            className
          )}
          disabled={disabled}
        >
          <FlagComponent
            country={selectedCountry}
            countryName={selectedCountry}
          />
          <span className="font-medium text-neutral-600">{`+${RPNInput.getCountryCallingCode(selectedCountry)}`}</span>

          <ChevronDown
            className={cn(
              "size-4 opacity-50",
              disabled ? "hidden" : "opacity-100"
            )}
            aria-hidden="true"
          />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="start">
        <div className="p-2">
          <Input
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
              setTimeout(() => {
                if (scrollAreaRef.current) {
                  scrollAreaRef.current.scrollTop = 0;
                }
              }, 0);
            }}
            placeholder="Search country..."
            className="h-8"
            icon={{ left: "/icons/search16.svg" }}
          />
        </div>
        <div ref={scrollAreaRef} className="max-h-64 overflow-y-auto">
          {countryList.filter(({ value, label }) => {
            if (!searchValue) return true;
            if (!value) return false;
            const lowerSearch = searchValue.toLowerCase();
            return (
              label.toLowerCase().includes(lowerSearch) ||
              RPNInput.getCountryCallingCode(value)
                .toLowerCase()
                .includes(lowerSearch)
            );
          }).length === 0 ? (
            <div className="py-6 text-center text-sm text-neutral-500">
              No country found.
            </div>
          ) : (
            <div className="p-1">
              {countryList.map(({ value, label }) =>
                value ? (
                  <CountrySelectOption
                    key={value}
                    country={value}
                    countryName={label}
                    selectedCountry={selectedCountry}
                    onChange={onChange}
                    onSelectComplete={() => setIsOpen(false)}
                  />
                ) : null
              )}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

/**
 * Component for rendering each country option in the dropdown
 */
const CountrySelectOption = ({
  country,
  countryName,
  selectedCountry,
  onChange,
  onSelectComplete,
}: CountrySelectOptionProps) => {
  const handleSelect = () => {
    onChange(country);
    onSelectComplete();
  };

  return (
    <button
      type="button"
      onClick={handleSelect}
      className={cn(
        "flex w-full cursor-pointer items-center gap-2 rounded-md p-2 text-left text-sm",
        "hover:bg-neutral-100 focus:bg-neutral-100 focus:outline-none"
      )}
      role="option"
      aria-selected={country === selectedCountry}
    >
      <FlagComponent country={country} countryName={countryName} />
      <span className="flex-1 truncate">{countryName}</span>
      <span className="text-neutral-500">{`+${RPNInput.getCountryCallingCode(country)}`}</span>
    </button>
  );
};

/**
 * Component for rendering the country flag
 */
const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
  const Flag = flags[country];

  return (
    <span className="inline-block h-4 w-6 overflow-hidden rounded-sm bg-neutral-200">
      {Flag && <Flag title={countryName} />}
    </span>
  );
};

export { PhoneInput };
