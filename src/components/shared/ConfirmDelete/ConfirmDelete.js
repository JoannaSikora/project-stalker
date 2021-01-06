import React from 'react';

const ConfirmDelete = ({ handleConfirm, name, close }) => {

    return (
        <div>
            <h2>Action Confirmation</h2>
            <p>Are you sure you want to delete <strong>{ name }</strong>?</p>
            <div className="button_wrapper">
                <button
                    onClick={handleConfirm}
                    className="button">
                    Confirm
                </button>
                <button
                    onClick={close}
                    className="button button--cancel">
                    Cancel
                </button>
            </div>
        </div>
    )
};

export default ConfirmDelete;
