import { cn } from "@/lib/utils";

interface ProfileCompletenessProps {
  percentage: number;
  size?: 'sm' | 'md' | 'lg';
}

export const ProfileCompleteness = ({ percentage, size = 'md' }: ProfileCompletenessProps) => {
  const sizes = {
    sm: { ring: 'w-16 h-16', text: 'text-lg', strokeWidth: 6 },
    md: { ring: 'w-24 h-24', text: 'text-2xl', strokeWidth: 8 },
    lg: { ring: 'w-32 h-32', text: 'text-3xl', strokeWidth: 10 },
  };

  const { ring, text, strokeWidth } = sizes[size];
  const radius = size === 'sm' ? 28 : size === 'md' ? 40 : 56;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;

  const getColor = () => {
    if (percentage >= 80) return 'stroke-success text-success';
    if (percentage >= 50) return 'stroke-warning text-warning';
    return 'stroke-accent text-accent';
  };

  return (
    <div className="card-elevated p-6">
      <div className="flex items-center gap-6">
        {/* Circular Progress */}
        <div className={cn("relative", ring)}>
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="50%"
              cy="50%"
              r={radius}
              stroke="currentColor"
              strokeWidth={strokeWidth}
              fill="none"
              className="text-muted"
            />
            <circle
              cx="50%"
              cy="50%"
              r={radius}
              strokeWidth={strokeWidth}
              fill="none"
              strokeLinecap="round"
              strokeDasharray={strokeDasharray}
              className={cn("transition-all duration-500", getColor())}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={cn("font-bold", text, getColor())}>
              {percentage}%
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1">
          <h4 className="font-semibold text-foreground mb-1">Profile Completion</h4>
          <p className="text-sm text-muted-foreground mb-3">
            {percentage >= 100 
              ? "Your profile is complete!" 
              : `Complete your profile to unlock ${100 - percentage}% more scheme recommendations.`}
          </p>
          {percentage < 100 && (
            <a href="/profile" className="text-sm font-medium text-accent hover:underline">
              Complete Profile →
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
