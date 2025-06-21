export default function ActionButton({ label, icon, onClick, color }: { label: string; icon: React.ReactNode; onClick: () => void; color: string }) {
    return (
      <button
        onClick={onClick}
        style={{
          background: color, color: "#fff", border: "none", borderRadius: 8,
          padding: "16px 20px", margin: "0 10px 10px 0", fontWeight: "bold",
          fontSize: 16, display: "inline-flex", alignItems: "center",
          boxShadow: "0 2px 6px rgba(0,0,0,0.05)", cursor: "pointer"
        }}
      >
        <span style={{ marginRight: 8 }}>{icon}</span> {label}
      </button>
    );
  }
  