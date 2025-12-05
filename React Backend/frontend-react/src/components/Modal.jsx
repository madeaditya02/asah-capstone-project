export default function Modal({ children, onClose }) {
  return (
    <div className="modal-backdrop">
      <div className="modal-box">
        {children}

        <button className="modal-close" onClick={onClose}>
          ✕
        </button>
      </div>
    </div>
  );
}
