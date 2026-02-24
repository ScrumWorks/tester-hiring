import type { HTMLAttributes, ReactNode } from "react";

export interface SettingsListCardProps extends HTMLAttributes<HTMLUListElement> {
  children: ReactNode;
  className?: string;
}

export const SettingsListCard = ({
  children,
  className = "",
  ...restProps
}: SettingsListCardProps) => {
  return (
    <ul
      className={`list-none overflow-hidden rounded-xl bg-white py-2 shadow-md ${className}`}
      {...restProps}
    >
      {children}
    </ul>
  );
};
