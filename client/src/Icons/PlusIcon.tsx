const PlusIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5" // changed from stroke-width
      stroke="currentColor"
      className="size-5"
    >
      <path
        strokeLinecap="round" // changed from stroke-linecap
        strokeLinejoin="round" // changed from stroke-linejoin
        d="M12 4.5v15m7.5-7.5h-15"
      />
    </svg>
  );
};

export default PlusIcon;
