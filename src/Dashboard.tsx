import { StaticChart, useDashboard } from "@quillsql/react";
import { DashboardFilters } from "./DashboardFilters";
import "./dashboard.css";

export function Dashboard({ dashboardName }: { dashboardName: string }) {
  const { sections, isLoading, filters, applyFilters } = useDashboard(dashboardName);

  if (isLoading || !sections) return <div className="dashboard-status">Loading...</div>;

  return (
    <div className="dashboard">
      <DashboardFilters filters={filters} applyFilters={applyFilters} />
      <div className="reports-grid">
        {Object.keys(sections).map((sectionName) => {
          const reports = sections[sectionName];
          if (reports.length === 0) return null;
          return (
            <section key={sectionName} className="report-section">
              <div className="section-cards">
              {reports.map((report) => {
                const isMetric = report.chartType === "metric";
                const isTable = report.chartType === "table";
                const cardClass = isMetric
                  ? "report-card report-card--metric"
                  : isTable
                    ? "report-card report-card--table"
                    : "report-card";
                const chartClass = isMetric
                  ? "chart-frame--metric"
                  : isTable
                    ? "chart-frame--table"
                    : "chart-frame--chart";

                return (
                  <div key={report.id} className={cardClass}>
                    <h4 className="report-title">
                      {report.name || "Untitled Report"}
                    </h4>
                    <StaticChart reportId={report.id} className={chartClass} />
                  </div>
                );
              })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
