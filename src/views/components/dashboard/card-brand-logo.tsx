import React from "react";

type CardBrandLogoProps = {
  brand: "visa" | "mastercard";
  className?: string;
};

export function CardBrandLogo({ brand, className = "h-8 w-12" }: CardBrandLogoProps) {
  if (brand === "visa") {
    return (
      <svg viewBox="0 0 48 32" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="32" rx="4" fill="currentColor" opacity="0" />
        <text x="24" y="20" fontSize="14" fontWeight="bold" textAnchor="middle" fill="white" fontFamily="Arial, sans-serif">
          VISA
        </text>
      </svg>
    );
  }

  if (brand === "mastercard") {
    return (
      <svg viewBox="0 0 48 32" className={className} xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="10" fill="currentColor" opacity="0.8" />
        <circle cx="32" cy="16" r="10" fill="currentColor" opacity="0.9" />
      </svg>
    );
  }

  return null;
}
