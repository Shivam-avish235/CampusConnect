export const pct = (a, b) => (b === 0 ? 0 : Math.round((a / b) * 100));

export function attendanceStatus(p) {
  if (p >= 80) return { label: "Good", tone: "success" };
  if (p >= 75) return { label: "Warning", tone: "warning" };
  return { label: "Critical", tone: "danger" };
}

export const assignmentTone = {
  Pending: "warning",
  Submitted: "info",
  Graded: "success",
  Overdue: "danger",
  Missing: "danger",
  Active: "success",
  Inactive: "neutral",
  Open: "success",
  Closed: "neutral",
  Published: "success",
  Draft: "neutral",
  Archived: "neutral",
  High: "danger",
  Normal: "info",
  Low: "neutral",
};

export const stageTone = {
  Applied: "info",
  Shortlisted: "purple",
  Interview: "warning",
  Selected: "success",
  Rejected: "danger",
};

export const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
