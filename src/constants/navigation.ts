import { Home, User, HelpCircle, Settings, Mail, BookOpen } from "lucide-react";
import type { NavItem } from "../types";

export const NAV_ITEMS: NavItem[] = [
  { path: "/", label: "HOME", icon: Home },
  { path: "/profile", label: "PROFILE", icon: User },
  { path: "/what-is-coaching", label: "WHAT'S COACHING", icon: HelpCircle },
  { path: "/services", label: "SERVICES", icon: Settings },
  { path: "/blog", label: "BLOG", icon: BookOpen },
  { path: "/contact", label: "CONTACT", icon: Mail },
];
