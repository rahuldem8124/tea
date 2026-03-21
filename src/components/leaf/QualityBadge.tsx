import { QualityGrade } from "@/types";
import { cn } from "@/lib/utils";

const gradeStyles: Record<QualityGrade, string> = {
  "A+": "bg-success/20 text-success border-success/40 glow-green",
  A: "bg-primary/20 text-primary border-primary/40",
  B: "bg-warning/20 text-warning border-warning/40 glow-yellow",
  C: "bg-muted text-muted-foreground border-border",
};

export function QualityBadge({ grade }: { grade: QualityGrade }) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest border transition-all",
        gradeStyles[grade]
      )}
    >
      {grade}
    </span>
  );
}
