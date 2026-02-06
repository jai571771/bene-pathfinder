import { Check, X, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface EligibilityScoreCardProps {
  score: number;
  ruleMatches?: {
    age: boolean;
    income: boolean;
    location: boolean;
    gender: boolean;
    category: boolean;
  };
  compact?: boolean;
}

export const EligibilityScoreCard = ({ score, ruleMatches, compact = false }: EligibilityScoreCardProps) => {
  const percentage = Math.round(score * 100);
  const scoreLevel = percentage >= 80 ? 'high' : percentage >= 50 ? 'medium' : 'low';
  
  const getScoreColor = () => {
    switch (scoreLevel) {
      case 'high': return 'text-success';
      case 'medium': return 'text-warning';
      case 'low': return 'text-destructive';
    }
  };

  const getScoreBg = () => {
    switch (scoreLevel) {
      case 'high': return 'bg-success';
      case 'medium': return 'bg-warning';
      case 'low': return 'bg-destructive';
    }
  };

  const getScoreRingBg = () => {
    switch (scoreLevel) {
      case 'high': return 'stroke-success';
      case 'medium': return 'stroke-warning';
      case 'low': return 'stroke-destructive';
    }
  };

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <div className={cn("text-lg font-bold", getScoreColor())}>
          {percentage}%
        </div>
        <div className="text-xs text-muted-foreground">match</div>
      </div>
    );
  }

  return (
    <div className="card-elevated p-6">
      <div className="flex items-start gap-6">
        {/* Circular Progress */}
        <div className="relative">
          <svg className="w-24 h-24 transform -rotate-90">
            <circle
              cx="48"
              cy="48"
              r="40"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-muted"
            />
            <circle
              cx="48"
              cy="48"
              r="40"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${percentage * 2.51} 251`}
              className={getScoreRingBg()}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={cn("text-2xl font-bold", getScoreColor())}>
              {percentage}%
            </span>
          </div>
        </div>

        {/* Rule Matches */}
        {ruleMatches && (
          <div className="flex-1 space-y-2">
            <h4 className="text-sm font-semibold text-foreground mb-3">Eligibility Criteria</h4>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(ruleMatches).map(([key, value]) => (
                <div
                  key={key}
                  className={cn(
                    "flex items-center gap-2 text-sm",
                    value ? "text-success" : "text-destructive"
                  )}
                >
                  {value ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <X className="h-4 w-4" />
                  )}
                  <span className="capitalize">{key}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Score Label */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center gap-2">
          <div className={cn("h-2 w-2 rounded-full", getScoreBg())} />
          <span className="text-sm font-medium">
            {scoreLevel === 'high' && 'Highly Eligible'}
            {scoreLevel === 'medium' && 'Partially Eligible'}
            {scoreLevel === 'low' && 'Low Eligibility'}
          </span>
        </div>
      </div>
    </div>
  );
};
