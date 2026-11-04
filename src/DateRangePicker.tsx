import { useEffect, useId, useState } from "react";
import { Popover } from "@base-ui/react/popover";
import { DayPicker, type DateRange } from "react-day-picker";
import "react-day-picker/style.css";

export type DateRangePreset = {
  label: string;
  value: string;
  startDate?: Date;
  endDate?: Date;
};

type DateRangeChange = {
  startDate?: Date;
  endDate?: Date;
  preset: string;
};

const dateFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

function formatRange(start?: Date, end?: Date) {
  if (start && end) {
    return `${dateFormat.format(start)} - ${dateFormat.format(end)}`;
  }
  if (start) return dateFormat.format(start);
  if (end) return dateFormat.format(end);
  return null;
}

function useMonthCount() {
  const [count, setCount] = useState(() =>
    window.matchMedia("(min-width: 720px)").matches ? 2 : 1,
  );

  useEffect(() => {
    const media = window.matchMedia("(min-width: 720px)");
    const onChange = () => setCount(media.matches ? 2 : 1);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return count;
}

export function DateRangePicker({
  label,
  startDate,
  endDate,
  presetValue,
  presets,
  onChange,
}: {
  label: string;
  startDate?: Date;
  endDate?: Date;
  presetValue?: string;
  presets: DateRangePreset[];
  onChange: (value: DateRangeChange) => void;
}) {
  const labelId = useId();
  const months = useMonthCount();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<DateRange | undefined>();
  const activePreset = presets.find((preset) => preset.value === presetValue);
  const triggerText =
    activePreset?.label ?? formatRange(startDate, endDate) ?? "Select dates";

  return (
    <div className="filter-field">
      <span className="filter-label" id={labelId}>
        {label}
      </span>
      <Popover.Root
        open={open}
        onOpenChange={(next) => {
          setOpen(next);
          if (next) {
            setDraft(startDate ? { from: startDate, to: endDate } : undefined);
          }
        }}
      >
        <Popover.Trigger className="filter-trigger" aria-labelledby={labelId}>
          <span className={activePreset || startDate || endDate ? "filter-value" : "filter-value is-placeholder"}>
            {triggerText}
          </span>
          <CalendarIcon />
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Positioner className="filter-positioner" sideOffset={6} align="start">
            <Popover.Popup className="range-popup" aria-label={label}>
              {presets.length > 0 && (
                <div className="range-presets" role="listbox" aria-label={`${label} presets`}>
                  {presets.map((preset) => (
                    <button
                      key={preset.value}
                      type="button"
                      className="range-preset"
                      role="option"
                      aria-selected={preset.value === presetValue}
                      onClick={() => {
                        onChange({
                          startDate: preset.startDate,
                          endDate: preset.endDate,
                          preset: preset.value,
                        });
                        setOpen(false);
                      }}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              )}
              <DayPicker
                className="range-calendar"
                mode="range"
                resetOnSelect
                numberOfMonths={months}
                defaultMonth={draft?.from ?? startDate ?? new Date()}
                selected={draft}
                onSelect={(range) => {
                  setDraft(range);
                  if (range?.from && range.to) {
                    onChange({
                      startDate: range.from,
                      endDate: range.to,
                      preset: "",
                    });
                    setOpen(false);
                  }
                }}
              />
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}

function CalendarIcon() {
  return (
    <svg className="filter-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2 6.5h12M5 2v2.5M11 2v2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
