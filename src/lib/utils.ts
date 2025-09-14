// Utility functions for the project can be added here.
// This file is intentionally left blank to resolve import errors.

// Utility to join class names (like clsx or classnames)
export function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(" ");
}