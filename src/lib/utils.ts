import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const EMAIL = "shubhwade3@gmail.com";
export const RESUME = "assets/shubh-resume.pdf";
export const LINKEDIN = "https://www.linkedin.com/in/shubh-wade-79b4322ba";
export const GITHUB = "https://github.com/shubhwade";
