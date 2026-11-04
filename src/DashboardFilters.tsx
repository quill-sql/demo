import { useState } from "react";
import {
  DashboardFilterType,
  FilterType,
  type DashboardDateFilter,
  type DashboardFilter,
  type DashboardMultiFilter,
  type DashboardSingleFilter,
  type DashboardTenantFilter,
  type Filter,
} from "@quillsql/react";
import { DateRangePicker } from "./DateRangePicker";
import { FilterMultiSelect, FilterSelect } from "./FilterSelect";

type FilterUpdate =
  | Filter
  | {
      label: string;
      value:
        | string
        | string[]
        | {
            startDate?: Date;
            endDate?: Date;
            preset?: string;
          };
    };

function toDate(value: Date | undefined) {
  if (!value) return undefined;
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

function stringOptions(options: { label: string; value: string | number }[]) {
  return options.map((option) => ({
    label: option.label || String(option.value),
    value: String(option.value),
  }));
}

export function DashboardFilters({
  filters,
  applyFilters,
}: {
  filters: DashboardFilter[];
  applyFilters: (filters: FilterUpdate[]) => void;
}) {
  return (
    <section className="filters" aria-label="Filters">
      {filters.length === 0 ? (
        <OrdersFilters applyFilters={applyFilters} />
      ) : filters.map((filter) => {
        if (filter.type === DashboardFilterType.Date) {
          return (
            <DateFilterControl
              key={filter.label}
              filter={filter}
              onChange={(value) => applyFilters([{ label: filter.label, value }])}
            />
          );
        }
        if (filter.type === DashboardFilterType.Select) {
          return (
            <SelectFilterControl
              key={filter.label}
              filter={filter}
              onChange={(value) => applyFilters([{ label: filter.label, value }])}
            />
          );
        }
        if (filter.type === DashboardFilterType.MultiSelect) {
          return (
            <MultiFilterControl
              key={filter.label}
              filter={filter}
              onChange={(value) => applyFilters([{ label: filter.label, value }])}
            />
          );
        }
        return (
          <TenantFilterControl
            key={filter.label}
            filter={filter}
            onChange={(value) => applyFilters([{ label: filter.label, value }])}
          />
        );
      })}
    </section>
  );
}

const categoryOptions = [
  { label: "Hardware", value: "Hardware" },
  { label: "Cloud", value: "Cloud" },
  { label: "Software", value: "Software" },
];

function startOfDay(date: Date) {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

function endOfDay(date: Date) {
  const copy = new Date(date);
  copy.setHours(23, 59, 59, 999);
  return copy;
}

function daysAgo(days: number) {
  const date = startOfDay(new Date());
  date.setDate(date.getDate() - days);
  return date;
}

function OrdersFilters({
  applyFilters,
}: {
  applyFilters: (filters: FilterUpdate[]) => void;
}) {
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [preset, setPreset] = useState<string | undefined>();
  const [category, setCategory] = useState("");

  function apply(next: { startDate?: Date; endDate?: Date; category: string }) {
    const filters: Filter[] = [];
    if (next.startDate && next.endDate) {
      filters.push({
        filterType: FilterType.Date,
        field: "created_at",
        table: "orders",
        value: {
          startDate: startOfDay(next.startDate).toISOString(),
          endDate: endOfDay(next.endDate).toISOString(),
        },
      });
    }
    if (next.category) {
      filters.push({
        filterType: FilterType.String,
        field: "category",
        table: "orders",
        value: next.category,
      });
    }
    applyFilters(filters);
  }

  return (
    <>
      <DateRangePicker
        label="Date"
        startDate={startDate}
        endDate={endDate}
        presetValue={preset}
        presets={[
          { label: "All time", value: "all" },
          { label: "Last 7 days", value: "7d", startDate: daysAgo(6), endDate: startOfDay(new Date()) },
          { label: "Last 30 days", value: "30d", startDate: daysAgo(29), endDate: startOfDay(new Date()) },
        ]}
        onChange={(value) => {
          setStartDate(value.startDate);
          setEndDate(value.endDate);
          setPreset(value.preset || undefined);
          apply({ startDate: value.startDate, endDate: value.endDate, category });
        }}
      />
      <FilterSelect
        label="Category"
        value={category}
        options={categoryOptions}
        onValueChange={(value) => {
          setCategory(value);
          apply({ startDate, endDate, category: value });
        }}
      />
    </>
  );
}

function DateFilterControl({
  filter,
  onChange,
}: {
  filter: DashboardDateFilter;
  onChange: (value: { startDate?: Date; endDate?: Date; preset: string }) => void;
}) {
  return (
    <DateRangePicker
      label={filter.label}
      startDate={toDate(filter.value.startDate)}
      endDate={toDate(filter.value.endDate)}
      presetValue={filter.value.presetValue}
      presets={filter.options.map((option) => ({
        label: option.label,
        value: option.value,
        startDate: toDate(option.startDate),
        endDate: toDate(option.endDate),
      }))}
      onChange={onChange}
    />
  );
}

function SelectFilterControl({
  filter,
  onChange,
}: {
  filter: DashboardSingleFilter;
  onChange: (value: string) => void;
}) {
  return (
    <FilterSelect
      label={filter.label}
      value={filter.value ?? ""}
      options={filter.options}
      onValueChange={onChange}
    />
  );
}

function MultiFilterControl({
  filter,
  onChange,
}: {
  filter: DashboardMultiFilter;
  onChange: (value: string[]) => void;
}) {
  return (
    <FilterMultiSelect
      label={filter.label}
      value={filter.value ?? []}
      options={filter.options}
      onValueChange={onChange}
    />
  );
}

function TenantFilterControl({
  filter,
  onChange,
}: {
  filter: DashboardTenantFilter;
  onChange: (value: string | string[]) => void;
}) {
  const options = stringOptions(filter.options);
  if (Array.isArray(filter.value)) {
    return (
      <FilterMultiSelect
        label={filter.label}
        value={filter.value.map((value) => String(value))}
        options={options}
        onValueChange={onChange}
      />
    );
  }
  return (
    <FilterSelect
      label={filter.label}
      value={filter.value == null ? "" : String(filter.value)}
      options={options}
      onValueChange={onChange}
    />
  );
}
