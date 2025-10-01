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

export interface Testimonial {
  name: string;
  role: string;
  image: string;
  before: string;
  after: string;
  quote: string;
}

export interface ProfileStoryItem {
  type: "heading" | "paragraph" | "question" | "image";
  content: string;
  src?: string;
  alt?: string;
  caption?: string;
  level?: number;
}

export interface ServiceItem {
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  color: string;
  features: string[];
  benefits: string[];
  testimonial: {
    text: string;
    author: string;
  };
}

export interface PricingPlan {
  name: string;
  originalPrice: string;
  salePrice: string;
  discount: string;
  duration: string;
  features: string[];
  popular: boolean;
  description: string;
}

export interface ServicePageTestimonial {
  name: string;
  age: string;
  job: string;
  before: string;
  after: string;
  improvement: string;
  duration: string;
  category: string;
  testimonial: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  date: string;
  readTime: string;
  views: number;
  image: string;
  content: string; // 独自ブログ用のコンテンツ
  noteUrl?: string; // noteへの誘導URL（オプション）
  author: string; // 著者名を追加
  punchline?: string; // パンチライン追加
}

export interface WhatIsCoachingSection {
  title: string;
  icon: LucideIcon;
  content: string[];
}
