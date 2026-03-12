import React from 'react';

interface TestIconSVGProps extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
}

export const TestIconSVG = ({
  width = 24,
  height = 24,
  fill = 'currentColor',
  ...props
}: TestIconSVGProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      fill={fill}
      {...props}
    >
      <path d="M12 2L2 7l10 5 10-5-10-5zm0 9L2 7v10l10 5 10-5V7l-10 4z" />
    </svg>
  );
};
