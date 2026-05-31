export default function Footer() {
  return (
    <footer
      className="text-center py-3 text-sm"
      style={{
        background: "#e8ecf4",
        borderTop: "2px solid #d0d8ed",
        color: "#6b7280",
        fontFamily: "'Nunito', sans-serif",
      }}
    >
      © {new Date().getFullYear()} Pokémon Battle Arena. All rights reserved.
    </footer>
  );
}
