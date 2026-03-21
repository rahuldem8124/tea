import { MachineStatus } from "@/types";
import { cn } from "@/lib/utils";

export function StatusBadge({ status }: { status: MachineStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
        status === "Active" && "status-active",
        status === "Maintenance" && "status-maintenance",
        status === "Broken" && "status-broken"
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          status === "Active" && "bg-primary",
          status === "Maintenance" && "bg-warning",
          status === "Broken" && "bg-destructive"
        )}
      />
      {status}
    </span>
  );
}
