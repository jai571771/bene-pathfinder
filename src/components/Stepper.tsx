import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface StepperProps {
  steps: string[];
  currentStep: number;
  onStepClick?: (step: number) => void;
}

export const Stepper = ({ steps, currentStep, onStepClick }: StepperProps) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const isClickable = onStepClick && index <= currentStep;

          return (
            <div key={step} className="flex-1 flex items-center">
              {/* Step indicator */}
              <div className="flex flex-col items-center relative">
                <button
                  onClick={() => isClickable && onStepClick(index)}
                  disabled={!isClickable}
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-200",
                    isCompleted && "bg-success text-success-foreground",
                    isCurrent && "bg-accent text-accent-foreground ring-4 ring-accent/20",
                    !isCompleted && !isCurrent && "bg-muted text-muted-foreground",
                    isClickable && "cursor-pointer hover:ring-4 hover:ring-accent/10"
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </button>
                <span className={cn(
                  "absolute -bottom-6 text-xs font-medium whitespace-nowrap",
                  isCurrent ? "text-foreground" : "text-muted-foreground"
                )}>
                  {step}
                </span>
              </div>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="flex-1 h-1 mx-2">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-300",
                      index < currentStep ? "bg-success" : "bg-muted"
                    )}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
