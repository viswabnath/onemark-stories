/**
 * MacBook.jsx — Shell only. IframeScreen fills the screen area.
 */
export default function MacBook({ children }) {
  return (
    <div className="macbook-wrap">
      <div className="macbook-lid">
        <div className="macbook-camera">
          <div className="macbook-camera-dot" />
        </div>
        {/* Screen: overflow:hidden container — IframeScreen fills it */}
        <div className="macbook-screen-shell">
          {children}
        </div>
      </div>
      <div className="macbook-base">
        <div className="macbook-notch" />
      </div>
    </div>
  );
}
