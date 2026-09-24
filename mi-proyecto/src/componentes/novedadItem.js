export default function NovedadItem({ title, subtitle, body }) {
  return (
    <div style={{ borderBottom: '1px solid #ccc', margin: '15px 0', paddingBottom: '10px' }}>
      <h2>{title}</h2>
      <h4>{subtitle}</h4>
      <p>{body}</p>
    </div>
  );
}