interface ExampleSVGProps extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
}

export const ExampleSVG = ({
  width = 24,
  height = 24,
  fill = 'currentColor',
  ...props
}: ExampleSVGProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0Z"
        fill={fill}
      />
    </svg>
  );
};
