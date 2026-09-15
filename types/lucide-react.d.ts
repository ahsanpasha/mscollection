declare module "lucide-react" {
  import * as React from "react";

  export interface LucideProps extends React.SVGProps<SVGSVGElement> {
    size?: string | number;
    absoluteStrokeWidth?: boolean;
    color?: string;
    strokeWidth?: string | number;
    className?: string;
  }

  export type LucideIcon = React.ForwardRefExoticComponent<
    LucideProps & React.RefAttributes<SVGSVGElement>
  >;

  export const ArrowRight: LucideIcon;
  export const Check: LucideIcon;
  export const ChevronDown: LucideIcon;
  export const Compass: LucideIcon;
  export const Eye: LucideIcon;
  export const Heart: LucideIcon;
  export const Menu: LucideIcon;
  export const MessageCircle: LucideIcon;
  export const MessageSquare: LucideIcon;
  export const Minus: LucideIcon;
  export const Plus: LucideIcon;
  export const RotateCcw: LucideIcon;
  export const Search: LucideIcon;
  export const ShieldCheck: LucideIcon;
  export const ShoppingBag: LucideIcon;
  export const SlidersHorizontal: LucideIcon;
  export const Sparkles: LucideIcon;
  export const Trash2: LucideIcon;
  export const Truck: LucideIcon;
  export const UserRound: LucideIcon;
  export const User: LucideIcon;
  export const Package: LucideIcon;
  export const MapPin: LucideIcon;
  export const HelpCircle: LucideIcon;
  export const X: LucideIcon;
  export const Star: LucideIcon;

  export const icons: Record<string, LucideIcon>;
  const Lucide: Record<string, LucideIcon>;
  export default Lucide;
}
