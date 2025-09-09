"use client";

import { useEffect, useRef, useState } from "react";

import PropTypes from "prop-types";

import { cn } from "@/lib/utils";

import Checkbox from "../Form/Checkbox";
import IconComponent from "../IconComponent/IconComponent";
import { InputSearch } from "../InputSearch/InputSearch";
import SelectedItemsModal from "../SelectedItemsModal/SelectedItemsModal";

const MultiSelectDropdown = ({
  options = [],
  selectedItems = [],
  placeholder = "Pilih Opsi",
  searchPlaceholder = "Cari Opsi",
  titleModal = "Selected Items",
  onSelectionChange = () => {},
  className = "",
  disabled = false,
  errorMessage = null,
  showAllOption = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef(null);

  const isAllSelected =
    showAllOption &&
    options.length > 0 &&
    selectedItems.length === options.length;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectAll = () => {
    onSelectionChange(isAllSelected ? [] : [...options]);
  };

  const handleRemoveAll = (e) => {
    e.stopPropagation();
    onSelectionChange([]);
  };

  const handleSelect = (option) => {
    const newSelected = selectedItems.some(
      (item) => item.value === option.value
    )
      ? selectedItems.filter((item) => item.value !== option.value)
      : [...selectedItems, option];
    onSelectionChange(newSelected);
  };

  const handleRemoveItem = (e, item) => {
    e.stopPropagation();
    handleSelect(item);
  };

  const handleToggle = () => {
    // CHANGE: Logic now explicitly checks for disabled state
    if (!disabled) {
      setIsOpen(!isOpen);
      if (!isOpen) setSearch("");
    }
  };

  const renderSelectedItems = () => {
    if (isAllSelected) {
      return (
        // CHANGE: Conditional styling for the "All" badge
        <div
          className={cn(
            "flex items-center gap-2 rounded-full border bg-white px-2 py-1 text-xxs font-semibold",
            disabled ? "border-[#868686]" : "border-primary-700"
          )}
        >
          <span
            className={cn(
              "text-xxs",
              disabled ? "text-[#868686]" : "text-primary-700"
            )}
          >
            All
          </span>

          <button
            onClick={!disabled ? handleRemoveAll : undefined}
            className={cn(
              "text-primary-700 hover:text-primary-700",
              disabled && "pointer-events-none"
            )}
          >
            <IconComponent
              src="/icons/close12.svg"
              color={disabled ? "gray" : "primary"}
              width={12}
              height={12}
            />
          </button>
        </div>
      );
    }

    if (selectedItems.length === 0) {
      return <span className="text-start text-[#868686]">{placeholder}</span>;
    }

    return (
      <>
        {selectedItems.slice(0, 3).map((item) => (
          // CHANGE: Conditional styling for individual badges
          <div
            key={item.value}
            className={cn(
              "flex items-center gap-2 rounded-full border bg-white px-2 py-1 text-xxs font-semibold",
              disabled ? "border-[#868686]" : "border-primary-700"
            )}
          >
            <span
              className={cn(
                "text-xxs",
                disabled ? "text-[#868686]" : "text-primary-700"
              )}
            >
              {item.label}
            </span>

            <button
              onClick={!disabled ? handleRemoveAll : undefined}
              className={cn(
                "text-primary-700 hover:text-primary-700",
                disabled && "pointer-events-none"
              )}
            >
              <IconComponent
                color={disabled ? "gray" : "primary"}
                src="/icons/close12.svg"
                width={12}
                height={12}
              />
            </button>
          </div>
        ))}
        {selectedItems.length > 3 && (
          <button
            type="button"
            onClick={(e) => {
              // This button is always clickable
              e.stopPropagation();
              setIsModalOpen(true);
            }}
            // CHANGE: Keep the original style regardless of disabled state
            className="rounded-full bg-primary-700 px-3 py-[6px] text-xxs font-semibold text-white"
          >
            +{selectedItems.length - 3}
          </button>
        )}
      </>
    );
  };

  return (
    <div className={cn("relative w-full", className)} ref={dropdownRef}>
      <button
        type="button"
        onClick={handleToggle}
        // CHANGE: REMOVED the disabled attribute here.
        // The component's disabled behavior is now handled by the onClick logic and CSS classes.
        // This allows the child "+N" button to remain clickable.
        className={cn(
          "flex min-h-[33px] w-full items-center rounded-md border p-2 text-xs font-medium transition-colors duration-200 focus:outline-none",
          "flex flex-shrink-0 justify-between gap-2",
          errorMessage ? "border-error-400" : "border-neutral-600",
          // CHANGE: Added hover effect only when not disabled
          !disabled && "hover:border-primary-700",
          disabled
            ? "cursor-not-allowed bg-neutral-100 text-neutral-500"
            : "cursor-pointer bg-white text-neutral-900"
        )}
      >
        <div className="flex flex-1 flex-wrap items-center gap-2">
          {renderSelectedItems()}
        </div>
        {!disabled && (
          <IconComponent
            src="/icons/chevron-down.svg"
            className={cn(
              "h-4 w-4 flex-shrink-0 transition-transform duration-200",
              isOpen ? "rotate-180" : ""
            )}
          />
        )}
      </button>

      {errorMessage && !isOpen && (
        <p className="mt-2 text-xs font-medium text-error-400">
          {errorMessage}
        </p>
      )}

      {/* The rest of the component remains the same */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full z-50 max-h-80 overflow-hidden rounded-md border border-primary-700 bg-white shadow-lg">
          <div className="border-neutral-200 p-3">
            <InputSearch
              placeholder={searchPlaceholder}
              searchValue={search}
              setSearchValue={setSearch}
              hideDropdown
              appearance={{ inputClassName: "h-8 text-xs" }}
            />
          </div>
          <div className="pb-2 pr-3">
            <div className="max-h-[194px] overflow-y-auto">
              {filteredOptions && filteredOptions?.length > 0 ? (
                <>
                  {showAllOption && (
                    <div
                      onClick={handleSelectAll}
                      className="flex cursor-pointer items-center gap-1 px-3 py-2 transition-colors duration-150 hover:bg-neutral-50"
                    >
                      <Checkbox
                        checked={isAllSelected}
                        onChange={handleSelectAll}
                        label=""
                      />
                      <span className="text-xs font-[400] text-neutral-900">
                        All
                      </span>
                    </div>
                  )}

                  {filteredOptions.map((option) => (
                    <div
                      key={option.value}
                      onClick={() => handleSelect(option)}
                      className="flex cursor-pointer items-center gap-1 px-3 py-2 transition-colors duration-150 hover:bg-neutral-50"
                    >
                      <Checkbox
                        checked={selectedItems.some(
                          (item) => item.value === option.value
                        )}
                        onChange={() => handleSelect(option)}
                      />
                      <span className="text-xs font-[400] text-neutral-900">
                        {option.label}
                      </span>
                    </div>
                  ))}
                </>
              ) : (
                <div className="px-3 py-4 text-center text-sm text-neutral-500">
                  Data tidak ditemukan
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <SelectedItemsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={titleModal}
        items={selectedItems}
      />
    </div>
  );
};

MultiSelectDropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.any.isRequired,
    })
  ).isRequired,
  selectedItems: PropTypes.array,
  placeholder: PropTypes.string,
  searchPlaceholder: PropTypes.string,
  onSelectionChange: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  errorMessage: PropTypes.string,
  showAllOption: PropTypes.bool,
};

export default MultiSelectDropdown;
