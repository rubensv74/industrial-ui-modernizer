export function BadCard() {
  return (
    <div onClick={() => console.log("clicked")} style={{ color: "#000000" }}>
      <img src="/equipment.png" />
      Open equipment
    </div>
  );
}
