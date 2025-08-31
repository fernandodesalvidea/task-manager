import '../styles/EditModal.css'

function EditModal({message, onConfirm, onCancel}){
    return (
        <div className="popup" id='editpopup'>
            <div className="question">{message}</div>
            <div className="buttons">
                <button type="button" id="cancel" onClick={onCancel}>Cancel</button>
                <button type="button" id="save" onClick={onConfirm}>Save</button>
            </div>
        </div>
    );
}

export default EditModal;