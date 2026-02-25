/**
 * components/Showcase/ViewToggle.jsx
 * Zero inline styles — classes from globals.css
 */
export default function ViewToggle({ isMobile, onToggle }) {
  return (
    <div className="view-toggle">
      <span className="view-toggle__label">Preview mode</span>
      <div className="view-toggle__track" onClick={onToggle} data-hover>
        <div className={`view-toggle__thumb ${isMobile ? "view-toggle__thumb--mobile" : "view-toggle__thumb--desktop"}`} />
        <span className={`view-toggle__option ${!isMobile ? "view-toggle__option--active" : "view-toggle__option--inactive"}`}>Desktop</span>
        <span className={`view-toggle__option ${isMobile ? "view-toggle__option--active" : "view-toggle__option--inactive"}`}>Mobile</span>
      </div>
    </div>
  );
}
