import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { EmptyState, LoadingState } from "@/components/common";

export function DataTable({ columns, rows, pageSize = 8, loading, empty, onRowClick, caption }) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(rows.length / pageSize));
  const current = Math.min(page, totalPages);
  const slice = useMemo(
    () => rows.slice((current - 1) * pageSize, current * pageSize),
    [rows, current, pageSize],
  );

  if (loading) return <LoadingState rows={5} />;
  if (!rows.length)
    return (
      <>
        {empty ?? (
          <EmptyState
            title="Nothing to show"
            description="Try changing your filters or search terms."
          />
        )}
      </>
    );

  return (
    <div>
      {/* Desktop table */}
      <div className="hidden max-h-[70vh] overflow-auto md:block">
        <table className="w-full border-collapse text-sm">
          {caption ? <caption className="sr-only">{caption}</caption> : null}
          <thead className="sticky top-0 z-10 bg-muted/80 backdrop-blur">
            <tr>
              {columns.map((c) => (
                <th
                  key={c.key}
                  scope="col"
                  className={cn(
                    "whitespace-nowrap px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground",
                    c.className,
                  )}
                >
                  {c.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {slice.map((row) => (
              <tr
                key={row.id}
                {...(onRowClick
                  ? {
                      onClick: () => onRowClick(row),
                      tabIndex: 0,
                      role: "button",
                      onKeyDown: (e) => {
                        if (e.key === "Enter") onRowClick(row);
                      },
                    }
                  : {})}
                className={cn(
                  "border-t border-border",
                  onRowClick && "cursor-pointer hover:bg-muted/50",
                )}
              >
                {columns.map((c) => (
                  <td key={c.key} className={cn("px-5 py-3 align-middle", c.className)}>
                    {c.render(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile stacked cards */}
      <ul className="divide-y divide-border md:hidden">
        {slice.map((row) => (
          <li key={row.id} className="p-4">
            <button
              type="button"
              className="w-full space-y-2 text-left"
              onClick={() => onRowClick?.(row)}
            >
              {columns
                .filter((c) => !c.mobileHidden)
                .map((c) => (
                  <div key={c.key} className="flex items-start justify-between gap-3">
                    <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {c.header}
                    </span>
                    <span className="text-right text-sm">{c.render(row)}</span>
                  </div>
                ))}
            </button>
          </li>
        ))}
      </ul>

      {totalPages > 1 ? (
        <div className="flex items-center justify-between gap-3 border-t border-border px-5 py-3">
          <p className="text-caption">
            Page {current} of {totalPages} · {rows.length} records
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={current === 1}
              onClick={() => setPage(current - 1)}
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" /> Prev
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={current === totalPages}
              onClick={() => setPage(current + 1)}
              aria-label="Next page"
            >
              Next <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
