interface WishlistButtonProps {
  active: boolean;
  onToggle: () => void;
  loading?: boolean;
}

export function WishlistButton({
  active,
  onToggle,
  loading,
}: WishlistButtonProps) {
  return (
    <button
      onClick={onToggle}
      disabled={loading}
      aria-label="Toggle wishlist"
      className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg active:scale-95 group disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={active ? "#800000" : "none"}
        stroke={active ? "#800000" : "#000000"}
        strokeWidth={active ? "0" : "1.5"}
        className="w-4 h-4 transition-all duration-300 group-hover:scale-110"
      >
        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
      </svg>
    </button>
  );
}