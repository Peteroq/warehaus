'use client';

import { AnimatedCounter } from '@/components/react/ui/AnimatedCounter';
import { StatusIndicator } from '@/components/react/ui/StatusIndicator';
import { BasePanel } from './BasePanel';

interface DataPanelProps {
  label: string;
  value: number;
  suffix?: string;
  trend?: 'up' | 'down' | 'neutral';
  status?: 'online' | 'offline' | 'busy';
}

const trendIcons: Record<string, { symbol: string; color: string }> = {
  up: { symbol: '\u2191', color: 'text-success' },
  down: { symbol: '\u2193', color: 'text-warning' },
  neutral: { symbol: '\u2192', color: 'text-muted' },
};

export function DataPanel({
  label,
  value,
  suffix,
  trend,
  status,
}: DataPanelProps) {
  return (
    <BasePanel>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-muted">{label}</p>
          <p className="mt-1 font-display text-2xl font-semibold text-foreground">
            <AnimatedCounter target={value} suffix={suffix} />
            {trend && (
              <span
                className={`ml-2 text-sm ${trendIcons[trend].color}`}
              >
                {trendIcons[trend].symbol}
              </span>
            )}
          </p>
        </div>
        {status && (
          <StatusIndicator status={status} label={status} size="md" />
        )}
      </div>
    </BasePanel>
  );
}
