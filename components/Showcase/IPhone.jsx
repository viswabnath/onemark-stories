/**
 * IPhone.jsx — Shell only. Screen area is a plain div; sizing done by IframeScreen itself.
 */
export default function IPhone({ children }) {
  return (
    <div className="iphone-wrap">
      <div className="iphone-frame">
        <div className="iphone-island" />
        {/* Screen: just overflow:hidden rounded container — IframeScreen fills it */}
        <div className="iphone-screen-shell">
          {children}
        </div>
        <div className="iphone-home">
          <div className="iphone-home-bar" />
        </div>
      </div>
    </div>
  );
}
