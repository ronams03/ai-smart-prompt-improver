
import React from 'react';

export const SparklesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 3L9.25 8.75L3.5 10.5L9.25 12.25L12 18L14.75 12.25L20.5 10.5L14.75 8.75L12 3Z" />
    <path d="M5 3L6 5" />
    <path d="M19 13L18 11" />
    <path d="M19 3L18 5" />
    <path d="M5 13L6 11" />
  </svg>
);
