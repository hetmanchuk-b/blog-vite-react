import {
  Check,
  Book,
  Pen,
  Lock,
  LogOut,
  LogIn,
  Menu,
  UserPlus,
  LoaderCircle,
  PanelLeftDashed,
  UserRoundCog,
  ChevronDown,
  X,
  type LucideIcon,
} from 'lucide-react';

export type Icon = LucideIcon;

export const Icons = {
  check: Check,
  book: Book,
  pen: Pen,
  lock: Lock,
  logout: LogOut,
  login: LogIn,
  signup: UserPlus,
  menu: Menu,
  loader: LoaderCircle,
  sidebar: PanelLeftDashed,
  userSettings: UserRoundCog,
  chevronDown: ChevronDown,
  close: X,
}