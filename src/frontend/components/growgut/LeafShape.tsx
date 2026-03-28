import React from "react";

export function LeafShape({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 160 160"
      className={`pointer-events-none absolute text-[rgba(58,107,58,0.06)] ${className}`}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M87.987 15.334c28.772 12.314 47.713 42.957 42.49 74.182-4.675 27.963-27.848 48.751-52.488 56.984-16.174 5.406-33.823 3.666-47.396-6.953-16.406-12.832-22.346-35.465-19.19-56.076 4.22-27.546 23.889-53.214 49.432-64.984 8.414-3.879 18.082-6.539 27.152-3.153Z"
        fill="currentColor"
      />
      <path
        d="M55.42 119.842c21.314-24.799 41.533-51.685 49.927-84.387M58.928 93.62c14.731-5.463 30.88-7.024 46.366-4.481"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  );
}
