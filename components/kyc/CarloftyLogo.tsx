export default function CarloftyLogo() {
  return (
    <div className="flex items-start px-3">
      {/* Carlofty logo - rocket + wordmark */}
      <svg width="115" height="32" viewBox="0 0 115 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Rocket icon */}
        <g>
          <path d="M12.5 2C12.5 2 7 7 7 14C7 17.5 8.5 20.5 10.5 22.5L13.5 19.5C12 18 11 16 11 14C11 9.5 14.5 5.5 14.5 5.5L12.5 2Z" fill="#E8263B"/>
          <path d="M17.5 2C17.5 2 23 7 23 14C23 17.5 21.5 20.5 19.5 22.5L16.5 19.5C18 18 19 16 19 14C19 9.5 15.5 5.5 15.5 5.5L17.5 2Z" fill="#E8263B"/>
          <ellipse cx="15" cy="14" rx="3" ry="3" fill="#1a1a1a"/>
          <path d="M10 23L7 26L10 25L12 27L13 24L10 23Z" fill="#E8263B"/>
          <path d="M20 23L23 26L20 25L18 27L17 24L20 23Z" fill="#E8263B"/>
        </g>
        {/* Wordmark */}
        <text x="30" y="22" fontFamily="Inter Display, Inter, sans-serif" fontSize="18" fontWeight="600" fill="#1a1a1a">carlofty</text>
      </svg>
    </div>
  );
}
