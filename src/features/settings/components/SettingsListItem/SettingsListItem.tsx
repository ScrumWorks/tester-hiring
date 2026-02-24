"use client";

import Link from "next/link";
import type { ReactNode } from "react";

export interface SettingsListItemProps {
  label: string;
  valuePreview?: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export const SettingsListItem = ({
  label,
  valuePreview,
  href,
  onClick,
  className = "",
}: SettingsListItemProps) => {
  const content = (
    <>
        <span className="font-medium text-gray-900">{label}</span>
        <span className="flex min-w-0 items-center gap-2">
          <span className="truncate text-gray-500">
            {valuePreview ?? "Not set"}
          </span>
          <svg
            className="h-5 w-5 shrink-0 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </span>
    </>
  );

  const baseClassName = `flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors hover:bg-gray-50 ${className}`;

  if (href) {
    return (
      <li>
        <Link href={href} className={baseClassName}>
          {content}
        </Link>
      </li>
    );
  }

  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        className={baseClassName}
      >
        {content}
      </button>
    </li>
  );
};
