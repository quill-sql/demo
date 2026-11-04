import { Select } from "@base-ui/react/select";

export type FilterOption = {
  label: string;
  value: string;
};

export function FilterSelect({
  label,
  value,
  options,
  onValueChange,
  placeholder = "All",
}: {
  label: string;
  value: string;
  options: FilterOption[];
  onValueChange: (value: string) => void;
  placeholder?: string;
}) {
  const items = options.some((option) => option.value === "")
    ? options
    : [{ label: placeholder, value: "" }, ...options];

  return (
    <div className="filter-field">
      <Select.Root
        items={items}
        value={value}
        onValueChange={(next) => {
          if (next != null) onValueChange(next);
        }}
      >
        <Select.Label className="filter-label">{label}</Select.Label>
        <Select.Trigger className="filter-trigger">
          <Select.Value className="filter-value" placeholder={placeholder} />
          <Select.Icon className="filter-icon">
            <CaretIcon />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Positioner
            className="filter-positioner"
            sideOffset={6}
            alignItemWithTrigger={false}
          >
            <Select.Popup className="filter-popup">
              <Select.List className="filter-list">
                {items.map((item) => (
                  <Select.Item
                    key={item.value || "all"}
                    value={item.value}
                    className="filter-item"
                  >
                    <Select.ItemIndicator className="filter-item-indicator">
                      <CheckIcon />
                    </Select.ItemIndicator>
                    <Select.ItemText className="filter-item-text">{item.label}</Select.ItemText>
                  </Select.Item>
                ))}
              </Select.List>
            </Select.Popup>
          </Select.Positioner>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}

export function FilterMultiSelect({
  label,
  value,
  options,
  onValueChange,
  placeholder = "All",
}: {
  label: string;
  value: string[];
  options: FilterOption[];
  onValueChange: (value: string[]) => void;
  placeholder?: string;
}) {
  return (
    <div className="filter-field">
      <Select.Root
        multiple
        items={options}
        value={value}
        onValueChange={onValueChange}
      >
        <Select.Label className="filter-label">{label}</Select.Label>
        <Select.Trigger className="filter-trigger">
          <Select.Value className="filter-value">
            {(selected: string[]) => formatSelection(selected, options, placeholder)}
          </Select.Value>
          <Select.Icon className="filter-icon">
            <CaretIcon />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Positioner
            className="filter-positioner"
            sideOffset={6}
            alignItemWithTrigger={false}
          >
            <Select.Popup className="filter-popup">
              <Select.List className="filter-list">
                {options.map((item) => (
                  <Select.Item key={item.value} value={item.value} className="filter-item">
                    <Select.ItemIndicator className="filter-item-indicator">
                      <CheckIcon />
                    </Select.ItemIndicator>
                    <Select.ItemText className="filter-item-text">{item.label}</Select.ItemText>
                  </Select.Item>
                ))}
              </Select.List>
            </Select.Popup>
          </Select.Positioner>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}

function formatSelection(selected: string[], options: FilterOption[], placeholder: string) {
  if (selected.length === 0) return placeholder;
  const labels = selected.map(
    (selectedValue) => options.find((option) => option.value === selectedValue)?.label ?? selectedValue,
  );
  if (labels.length === 1) return labels[0];
  return `${labels[0]} (+${labels.length - 1})`;
}

function CaretIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M11 10H5l3 3.5zm0-4H5l3-3.5z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" aria-hidden="true">
      <path d="m2.5 8.5 4 4 7-9" strokeWidth="1.5" />
    </svg>
  );
}
