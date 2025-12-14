import { useEffect, useRef, useState } from "react";
import { cn } from "../../utils/cn";
import styles from "./Select.module.css";
import { SelectProps } from "./Select.types";

export const Select = ({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  size = "md",
  state = "default",
  disabled = false,
  error,
  helperText,
  label,
  required = false,
  className,
  name,
  id,
  searchable = false,
  searchPlaceholder = "Search...",
  clearable = false,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);
  const [searchQuery, setSearchQuery] = useState("");
  const selectRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Find the selected option label
  const selectedOption = options.find((opt) => opt.value === selectedValue);
  const displayText = selectedOption ? selectedOption.label : placeholder;

  // Filter options based on search query
  const filteredOptions =
    searchable && searchQuery
      ? options.filter((opt) =>
          opt.label.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : options;

  // Handle option selection
  const handleSelect = (optionValue: string) => {
    setSelectedValue(optionValue);
    onChange?.(optionValue);
    setIsOpen(false);
    setSearchQuery("");
  };

  // Handle clear selection
  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedValue(undefined);
    onChange?.("");
  };

  // Toggle dropdown
  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      if (!isOpen && searchable) {
        // Focus search input when opening
        setTimeout(() => searchInputRef.current?.focus(), 0);
      }
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchQuery("");
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Sync internal state with prop changes
  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  const actualState = error ? "error" : state;

  return (
    <div className={cn(styles.container, className)}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}

      <div
        ref={selectRef}
        className={cn(
          styles.select,
          styles[size],
          styles[actualState],
          disabled && styles.disabled,
          isOpen && styles.open
        )}
      >
        <button
          type="button"
          className={styles.trigger}
          onClick={handleToggle}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          id={id}
        >
          <span
            className={cn(styles.value, !selectedOption && styles.placeholder)}
          >
            {displayText}
          </span>
          <div className={styles.icons}>
            {clearable && selectedValue && !disabled && (
              <button
                type="button"
                className={styles.clearButton}
                onClick={handleClear}
                aria-label="Clear selection"
              >
                ✕
              </button>
            )}
            <span className={cn(styles.arrow, isOpen && styles.arrowOpen)}>
              ▼
            </span>
          </div>
        </button>

        {isOpen && (
          <div className={styles.dropdown}>
            {searchable && (
              <div className={styles.searchWrapper}>
                <input
                  ref={searchInputRef}
                  type="text"
                  className={styles.searchInput}
                  placeholder={searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            )}
            <ul className={styles.optionsList} role="listbox">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <li
                    key={option.value}
                    className={cn(
                      styles.option,
                      option.value === selectedValue && styles.selected,
                      option.disabled && styles.optionDisabled
                    )}
                    onClick={() =>
                      !option.disabled && handleSelect(option.value)
                    }
                    role="option"
                    aria-selected={option.value === selectedValue}
                    aria-disabled={option.disabled}
                  >
                    {option.label}
                  </li>
                ))
              ) : (
                <li className={styles.noResults}>No results found</li>
              )}
            </ul>
          </div>
        )}
      </div>

      {/* Hidden input for form submission */}
      {name && <input type="hidden" name={name} value={selectedValue || ""} />}

      {(error || helperText) && (
        <p className={cn(styles.helperText, error && styles.errorText)}>
          {error || helperText}
        </p>
      )}
    </div>
  );
};
