const CloseIcon = () => {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5" // changed from stroke-width
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round" // changed from stroke-linecap
          strokeLinejoin="round" // changed from stroke-linejoin
          d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    </div>
  );
};

export default CloseIcon;
