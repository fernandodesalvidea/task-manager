import './ConfirmModal.css';


function ConfirmModal({message, onConfirm, onCancel}){
    return (
        <div className="popup">
            <div className="question">{message}</div>
            <div className="buttons">
                <button type="button" id="yes" onClick={onConfirm}>Yes</button>
                <button type="button" id="no" onClick={onCancel}>No</button>
            </div>

        </div>
    );
}

export default ConfirmModal;