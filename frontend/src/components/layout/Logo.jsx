import { GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ className, compact }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-display text-base font-bold tracking-tight text-foreground",
        className,
      )}
    >
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground">
        <GraduationCap className="h-5 w-5" aria-hidden />
      </span>
      {!compact && <span className="text-lg">CampusConnect</span>}
    </span>
  );
}
