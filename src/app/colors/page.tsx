export default function Page() {
  const colors = [
    { name: "Muted Lavender", hex: "#D7B9D5" },
    { name: "Soft Lilac", hex: "#E6CCE6" },
    { name: "Dusty Rose", hex: "#D8A7B1" },
    { name: "Slate Blue", hex: "#A8B5D2" },
    { name: "Pale Sage", hex: "#C2D4C7" },
    { name: "Creamy Beige", hex: "#F2E8E4" },
  ];

  // Helper: decide if text should be black or white based on brightness
  const getTextColor = (hex: string) => {
    const c = hex.substring(1); // remove #
    const rgb = parseInt(c, 16); // convert to number
    const r = (rgb >> 16) & 255;
    const g = (rgb >> 8) & 255;
    const b = rgb & 255;
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 150 ? "#000" : "#fff";
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridTemplateRows: "repeat(2, 1fr)",
        width: "100vw",
        height: "100vh",
        margin: 0,
        padding: 0,
      }}
    >
      {colors.map((c) => (
        <div
          key={c.hex}
          style={{
            backgroundColor: c.hex,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.2rem",
            fontFamily: "sans-serif",
            color: getTextColor(c.hex),
          }}
        >
          {c.name} ({c.hex})
        </div>
      ))}
    </div>
  );
}
