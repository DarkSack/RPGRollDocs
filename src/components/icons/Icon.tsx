import type { SVGProps } from "react";

export type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function base(props: IconProps, children: React.ReactNode) {
  const { size = 18, ...rest } = props;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {children}
    </svg>
  );
}

/* Chrome / navegación ------------------------------------------------- */

export const SunIcon = (p: IconProps) =>
  base(p, <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" /></>);

export const MoonIcon = (p: IconProps) =>
  base(p, <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />);

export const SearchIcon = (p: IconProps) =>
  base(p, <><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></>);

export const MenuIcon = (p: IconProps) =>
  base(p, <path d="M4 6h16M4 12h16M4 18h16" />);

export const CloseIcon = (p: IconProps) =>
  base(p, <path d="M18 6 6 18M6 6l12 12" />);

export const ChevronRightIcon = (p: IconProps) => base(p, <path d="m9 18 6-6-6-6" />);
export const ChevronDownIcon = (p: IconProps) => base(p, <path d="m6 9 6 6 6-6" />);
export const ArrowLeftIcon = (p: IconProps) => base(p, <path d="M19 12H5M12 19l-7-7 7-7" />);
export const ArrowRightIcon = (p: IconProps) => base(p, <path d="M5 12h14M12 5l7 7-7 7" />);
export const ExternalLinkIcon = (p: IconProps) =>
  base(p, <><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><path d="M15 3h6v6M10 14 21 3" /></>);

export const CopyIcon = (p: IconProps) =>
  base(p, <><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></>);
export const CheckIcon = (p: IconProps) => base(p, <path d="M20 6 9 17l-5-5" />);
export const DownloadIcon = (p: IconProps) =>
  base(p, <><path d="M12 3v12" /><path d="m7 10 5 5 5-5" /><path d="M5 21h14" /></>);

export const GithubIcon = (p: IconProps) => {
  const { size = 18, ...rest } = p;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...rest}>
      <path d="M12 .3a12 12 0 0 0-3.8 23.38c.6.1.83-.26.83-.58v-2.17c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.08-.75.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.08 1.83 2.82 1.3 3.5 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.58A12 12 0 0 0 12 .3Z" />
    </svg>
  );
};

export const ListIcon = (p: IconProps) =>
  base(p, <><path d="M8 6h13M8 12h13M8 18h13" /><path d="M3 6h.01M3 12h.01M3 18h.01" /></>);
export const HashIcon = (p: IconProps) =>
  base(p, <path d="M4 9h16M4 15h16M10 3 8 21M16 3l-2 18" />);

/* Callouts -------------------------------------------------------------- */

export const InfoIcon = (p: IconProps) => base(p, <><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></>);
export const LightbulbIcon = (p: IconProps) =>
  base(p, <><path d="M9 18h6M10 22h4M12 2a6 6 0 0 0-4 10.5c.6.5 1 1.3 1 2.1V15h6v-.4c0-.8.4-1.6 1-2.1A6 6 0 0 0 12 2Z" /></>);
export const AlertTriangleIcon = (p: IconProps) =>
  base(p, <><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" /><path d="M12 9v4M12 17h.01" /></>);
export const AlertOctagonIcon = (p: IconProps) =>
  base(p, <><path d="M7.86 2h8.28L22 7.86v8.28L16.14 22H7.86L2 16.14V7.86Z" /><path d="M12 8v4M12 16h.01" /></>);
export const CheckCircleIcon = (p: IconProps) =>
  base(p, <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m22 4-10 10-3-3" /></>);

/* Categorías / addons ---------------------------------------------------- */

export const DiceIcon = (p: IconProps) =>
  base(p, <><rect x="3" y="3" width="18" height="18" rx="4" /><circle cx="8.5" cy="8.5" r="1" fill="currentColor" stroke="none" /><circle cx="15.5" cy="8.5" r="1" fill="currentColor" stroke="none" /><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" /><circle cx="8.5" cy="15.5" r="1" fill="currentColor" stroke="none" /><circle cx="15.5" cy="15.5" r="1" fill="currentColor" stroke="none" /></>);
export const LayersIcon = (p: IconProps) =>
  base(p, <><path d="m12 2 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5" /><path d="m3 17 9 5 9-5" /></>);
export const UsersIcon = (p: IconProps) =>
  base(p, <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>);
export const SwordIcon = (p: IconProps) =>
  base(p, <><path d="m14.5 17.5 3-3L21 18l-3.5 3.5Z" /><path d="M13 13 3 3M9 3H3v6" /><path d="m14.5 17.5-11-11" /></>);
export const ShieldIcon = (p: IconProps) => base(p, <path d="M12 2 4 5v6c0 5 3.4 8.7 8 11 4.6-2.3 8-6 8-11V5Z" />);
export const SparklesIcon = (p: IconProps) =>
  base(p, <><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" /></>);
export const PackageIcon = (p: IconProps) =>
  base(p, <><path d="M21 8 12 3 3 8v8l9 5 9-5Z" /><path d="M3 8l9 5 9-5M12 13v8" /></>);
export const HammerIcon = (p: IconProps) =>
  base(p, <><path d="m15 12-8.5 8.5a2.1 2.1 0 1 1-3-3L12 9" /><path d="M17.64 15 22 10.64M20.91 11.7 19.66 10.4a5 5 0 0 0-1.51-1.09l-.7-.32-.2-2.05L14.63 4l-.31 1.5-1.5.31-2.05-.2-.32-.7A5 5 0 0 0 9.36 3.4L8.06 2.14" /></>);
export const CoinsIcon = (p: IconProps) =>
  base(p, <><circle cx="8" cy="8" r="6" /><path d="M18.09 10.37A6 6 0 1 1 10.34 18M7 6h1v4M16.71 13.88l.7.71-2.82 2.82" /></>);
export const LeafIcon = (p: IconProps) =>
  base(p, <><path d="M11 20A7 7 0 0 1 4 13c0-5 5-10 12-11 1 7-4 12-11 12" /><path d="M4 13c3-1 5-3 6-6" /></>);
export const FishIcon = (p: IconProps) =>
  base(p, <><path d="M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.46-3.44 6-7 6-3.56 0-7.56-2.54-8.5-6Z" /><path d="M18 12v.01M6.5 12 2 9.5M6.5 12 2 14.5M12.5 6c-1 1-1.5 2-1.5 3.5M12.5 18c-1-1-1.5-2-1.5-3.5" /></>);
export const CalendarIcon = (p: IconProps) =>
  base(p, <><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></>);
export const WandIcon = (p: IconProps) =>
  base(p, <><path d="m15 4 1 1M20 9l1 1M3 21l9-9M12.5 6.5l5 5" /><path d="M17.6 3.4 20.6 6.4M5 3l1 3-3-1 2 2-2 2 3-1-1 3 2-2 2 2-1-3 3 1-2-2 2-2-3 1 1-3-2 2Z" /></>);
export const BookIcon = (p: IconProps) =>
  base(p, <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" /></>);
export const ChatIcon = (p: IconProps) =>
  base(p, <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />);
export const FlagIcon = (p: IconProps) =>
  base(p, <><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1Z" /><path d="M4 22V3" /></>);
export const CompassIcon = (p: IconProps) =>
  base(p, <><circle cx="12" cy="12" r="10" /><path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12Z" /></>);
export const BoxesIcon = (p: IconProps) =>
  base(p, <><path d="M2.97 12.92 12 18l9-5.08M12 22V12M2.97 9.08 12 4l9 5.08M2.97 12.92V9.08L12 4l9.03 5.08v3.84L12 18l-9.03-5.08Z" /></>);
export const RabbitIcon = (p: IconProps) =>
  base(p, <><path d="M8 6c0-2 1-4 2.5-4S13 4 13 6M16 6c0-2 1-4 2.5-4S21 4 21 6" /><path d="M6 10c0-4 3-8 6.5-8" /><path d="M12 22c-4 0-7-2.5-7-6.5C5 12 7 10 9 9c1-3 3-4 5-4 3 0 5 2 5 5 0 2-1 3-1 3 2 1 3 3 3 6.5S16.5 22 12 22Z" /></>);
export const HardHatIcon = (p: IconProps) =>
  base(p, <><path d="M2 18h20M4 18v-2a8 8 0 0 1 16 0v2M10 10V4M8 18v-6h8v6" /></>);
export const TableListIcon = (p: IconProps) =>
  base(p, <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M9 9v11" /></>);
export const HeartPulseIcon = (p: IconProps) =>
  base(p, <><path d="M19 14c1.5-1.5 3-3.2 3-5.5A4.5 4.5 0 0 0 13.5 6 4.5 4.5 0 0 0 5 8.5c0 2.3 1.5 4 3 5.5l6 6 2-2" /><path d="M3.5 12h2l1.5-3 2 5 1.5-3H14" /></>);
export const RobotIcon = (p: IconProps) =>
  base(p, <><rect x="4" y="9" width="16" height="11" rx="2" /><path d="M12 2v4M8 13v2M16 13v2" /><circle cx="12" cy="4" r="1" fill="currentColor" stroke="none" /></>);
export const NpcIcon = (p: IconProps) =>
  base(p, <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" /></>);
export const GemIcon = (p: IconProps) =>
  base(p, <><path d="M6 3h12l4 6-10 12L2 9Z" /><path d="M2 9h20M9 3l3 6-3 12M15 3l-3 6 3 12" /></>);
export const WrenchIcon = (p: IconProps) =>
  base(p, <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L2 19l3 3 7.3-7.3a4 4 0 0 0 5.4-5.4l-2.8 2.8-2-2Z" />);
export const CubeIcon = (p: IconProps) =>
  base(p, <><path d="m21 8-9-5-9 5 9 5 9-5Z" /><path d="M3 8v8l9 5 9-5V8M12 13v8" /></>);
export const PlusIcon = (p: IconProps) => base(p, <path d="M12 5v14M5 12h14" />);
export const TrashIcon = (p: IconProps) =>
  base(p, <><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6" /><path d="M10 11v6M14 11v6" /></>);
export const EraserIcon = (p: IconProps) =>
  base(p, <><path d="m20 20-8.59-8.59a2 2 0 0 0-2.82 0L4 16l4 4h12Z" /><path d="M5.5 13.5 12 7l5 5-6.5 6.5" /></>);
export const RotateIcon = (p: IconProps) =>
  base(p, <><path d="M21 12a9 9 0 1 1-3.2-6.9" /><path d="M21 3v6h-6" /></>);
export const GridIcon = (p: IconProps) =>
  base(p, <><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></>);
export const TargetIcon = (p: IconProps) =>
  base(p, <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="0.7" fill="currentColor" stroke="none" /></>);
