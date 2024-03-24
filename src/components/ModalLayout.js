
import '../stylesheets/Modal.css'

const Modal = (props) => {
  if (!props.isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={props.onClose}><i class="ri-close-line"></i></button>
        <div className="modal-content">
          {props.children}
        </div>
        <div className="modal-footer">
          {(props.modalType === "open") ? null : (props.modalType === "edit") ? <div className="modal-button" onClick={props.onUpdate} >Update</div> : <div className="modal-button"  onClick={props.onEdit}>Edit</div> }
          
        </div>
      </div>
    </div>
  );
};

export default Modal;
