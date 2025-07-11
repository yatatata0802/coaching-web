import { LucideIcon } from "lucide-react";

export interface NavItem {
  path: string;
  label: string;
  icon: LucideIcon;
}

export interface FormData {
  name: string;
  email: string;
  message: string;
}

export interface ServiceFeature {
  title: string;
  description: string;
  features: string[];
}

export interface StorySection {
  title: string;
  content: string[];
  isHighlighted?: boolean;
}

export interface ContactInfo {
  icon: LucideIcon;
  text: string;
}
