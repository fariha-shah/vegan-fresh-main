export default function Loader({ size = 48 }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
      <div
        style={{
          width: size,
          height: size,
          border: '4px solid #E8F5E9',
          borderTopColor: '#2E7D32',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }}
      />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
