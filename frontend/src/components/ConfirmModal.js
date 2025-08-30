import './styles/ConfirmModal.css';


function ConfirmModal({message, onConfirm, onCancel}){
    return (
        <div className="popup" id='confirmpopup'>
            <div className="question">{message}</div>
            <div className="buttons">
                <button type="button" id="no" onClick={onCancel}>No</button>
                <button type="button" id="yes" onClick={onConfirm}>Yes</button>
            </div>

        </div>
    );
}

export default ConfirmModal;