import './EditModal.css'

function EditModal({message, onConfirm, onCancel}){
    return (
        <div className="popup">
            <div className="question">{message}</div>
            <div className="buttons">
                <button type="button" id="yes" onClick={onConfirm}>Save</button>
                <button type="button" id="no" onClick={onCancel}>Cancel</button>
            </div>
        </div>
    );
}

export default EditModal;