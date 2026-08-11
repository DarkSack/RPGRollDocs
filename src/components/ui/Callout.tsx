import type { ReactNode } from "react";
import { InfoIcon, LightbulbIcon, AlertTriangleIcon, AlertOctagonIcon, CheckCircleIcon } from "../icons/Icon";
import type { IconProps } from "../icons/Icon";

type CalloutTone = "info" | "tip" | "warning" | "danger" | "success";

const TONE_STYLES: Record<CalloutTone, { wrap: string; iconWrap: string; icon: (p: IconProps) => ReactNode; label: string }> = {
  info: {
    wrap: "border-sky-200 bg-sky-50/70 text-sky-900 dark:border-sky-500/25 dark:bg-sky-500/[0.07] dark:text-sky-100",
    iconWrap: "bg-sky-100 text-sky-600 dark:bg-sky-500/15 dark:text-sky-300",
    label: "Nota",
    icon: InfoIcon,
  },
  tip: {
    wrap: "border-emerald-200 bg-emerald-50/70 text-emerald-900 dark:border-emerald-500/25 dark:bg-emerald-500/[0.07] dark:text-emerald-100",
    iconWrap: "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300",
    label: "Tip",
    icon: LightbulbIcon,
  },
  success: {
    wrap: "border-green-200 bg-green-50/70 text-green-900 dark:border-green-500/25 dark:bg-green-500/[0.07] dark:text-green-100",
    iconWrap: "bg-green-100 text-green-600 dark:bg-green-500/15 dark:text-green-300",
    label: "Listo",
    icon: CheckCircleIcon,
  },
  warning: {
    wrap: "border-amber-200 bg-amber-50/70 text-amber-900 dark:border-amber-500/25 dark:bg-amber-500/[0.07] dark:text-amber-100",
    iconWrap: "bg-amber-100 text-amber-600 dark:bg-amber-500/15 dark:text-amber-300",
    label: "Cuidado",
    icon: AlertTriangleIcon,
  },
  danger: {
    wrap: "border-red-200 bg-red-50/70 text-red-900 dark:border-red-500/25 dark:bg-red-500/[0.07] dark:text-red-100",
    iconWrap: "bg-red-100 text-red-600 dark:bg-red-500/15 dark:text-red-300",
    label: "Importante",
    icon: AlertOctagonIcon,
  },
};

export function Callout({
  tone = "info",
  title,
  children,
}: {
  tone?: CalloutTone;
  title?: string;
  children: ReactNode;
}) {
  const style = TONE_STYLES[tone];
  const Icon = style.icon;

  return (
    <div className={`flex gap-3 rounded-xl border px-4 py-3.5 text-sm shadow-soft ${style.wrap}`} role="note">
      <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${style.iconWrap}`}>
        <Icon size={16} />
      </div>
      <div className="min-w-0 flex-1 space-y-1 pt-0.5">
        <p className="font-semibold">{title ?? style.label}</p>
        <div className="leading-relaxed [&_a]:underline [&_code]:rounded [&_code]:bg-black/5 [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.85em] dark:[&_code]:bg-white/10">
          {children}
        </div>
      </div>
    </div>
  );
}
