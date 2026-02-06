import { CheckCircle, Clock, XCircle, FileText, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Application } from "@/data/mockData";

interface ApplicationTimelineProps {
  timeline: Application['timeline'];
  status: Application['status'];
}

const statusIcons = {
  Submitted: FileText,
  'Under Review': Clock,
  Approved: CheckCircle,
  Rejected: XCircle,
};

const statusColors = {
  Submitted: 'bg-info text-info-foreground',
  'Under Review': 'bg-warning text-warning-foreground',
  Approved: 'bg-success text-success-foreground',
  Rejected: 'bg-destructive text-destructive-foreground',
};

export const ApplicationTimeline = ({ timeline, status }: ApplicationTimelineProps) => {
  return (
    <div className="relative">
      {timeline.map((item, index) => {
        const Icon = statusIcons[item.status as keyof typeof statusIcons] || FileText;
        const colorClass = statusColors[item.status as keyof typeof statusColors] || 'bg-muted text-muted-foreground';
        const isLast = index === timeline.length - 1;

        return (
          <div key={index} className="flex gap-4 pb-6 last:pb-0">
            {/* Timeline line */}
            <div className="relative flex flex-col items-center">
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center",
                colorClass
              )}>
                <Icon className="h-5 w-5" />
              </div>
              {!isLast && (
                <div className="w-0.5 h-full bg-border absolute top-10" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 pb-2">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-foreground">{item.status}</h4>
                <span className="text-xs text-muted-foreground">
                  {new Date(item.date).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </div>
              {item.note && (
                <p className="text-sm text-muted-foreground mt-1">{item.note}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Compact horizontal timeline for cards
export const ApplicationTimelineCompact = ({ status }: { status: Application['status'] }) => {
  const steps = ['submitted', 'under_review', 'approved'];
  const currentIndex = steps.indexOf(status);
  const isRejected = status === 'rejected';

  return (
    <div className="flex items-center gap-2">
      {steps.map((step, index) => {
        const isCompleted = index <= currentIndex && !isRejected;
        const isCurrent = index === currentIndex;
        const isRejectedStep = isRejected && index === steps.indexOf('under_review');

        return (
          <div key={step} className="flex items-center gap-2">
            <div
              className={cn(
                "w-3 h-3 rounded-full transition-all",
                isCompleted && "bg-success",
                isCurrent && !isRejected && "bg-success ring-4 ring-success/20",
                isRejectedStep && "bg-destructive ring-4 ring-destructive/20",
                !isCompleted && !isRejectedStep && "bg-muted"
              )}
            />
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "w-8 h-0.5",
                  index < currentIndex && !isRejected ? "bg-success" : "bg-muted"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
