import React, { useState } from 'react';
import Dropdown from "../../shared/Dropdown/Dropdown";
import useModal from "../../../customHooks/useModal";
import Modal from "../../shared/Modal/Modal";
import UpdateProgressUpdate from "./UpdateProgressUpdate/UpdateProgressUpdate";
import './progress-update-card.scss';
import { deleteProgressUpdate } from "../../../state/actions/progressUpdatesActions";
import { useDispatch } from "react-redux";
import ConfirmDelete from "../../shared/ConfirmDelete/ConfirmDelete";
import { formatDate, getStatusClassSuffix, getStatusValue } from "../../../helpers/helperMethods";
import { DELETE_PROGRESS_UPDATE_OPTION, UPDATE_PROGRESS_UPDATE_OPTION } from "../../../helpers/constants/modalOptionsConstants";

const ProgressUpdateCard = ({ progressUpdate }) => {
    const [ currentModal, setCurrentModal ] = useState(null);
    const { open, openModal, closeModal } = useModal();
    const dispatch = useDispatch();

    const handleConfirmDelete = () => {
        dispatch(deleteProgressUpdate( progressUpdate.id ));

        closeModal();
    };

   const onSelectedOption = (option) => {
       setCurrentModal(option);
       openModal();
    };

   const renderModals = () => {
       return (
           <React.Fragment>
               <Modal
                   isShowing={open && currentModal === UPDATE_PROGRESS_UPDATE_OPTION}
                   close={closeModal}>
                   <UpdateProgressUpdate
                       progressUpdate={progressUpdate}
                       close={closeModal}/>
               </Modal>

               <Modal
                   isShowing={open && currentModal === DELETE_PROGRESS_UPDATE_OPTION}
                   close={closeModal}>
                   <ConfirmDelete
                       handleConfirm={handleConfirmDelete}
                       close={closeModal}
                       name={` progress update from date ${formatDate(progressUpdate.createdAt)}`} />
               </Modal>
           </React.Fragment>
       )
   };

   const dropdownOptions = [
           {label: 'Delete', value: DELETE_PROGRESS_UPDATE_OPTION},
           {label: 'Edit', value: UPDATE_PROGRESS_UPDATE_OPTION}
       ];

    return (
        <div
            className={`ProgressUpdateCard_wrapper ProgressUpdateCard${getStatusClassSuffix(progressUpdate.status)}`}>
                <div className="ProgressUpdateCard_dropdown_wrapper">
                    <Dropdown
                        width="1.5rem"
                        options={dropdownOptions}
                        onSelectedChange={onSelectedOption}/>
                </div>

            <div>
                <span className="ProgressUpdateCard_property_label">Status: </span>
                {getStatusValue(progressUpdate.status)}
            </div>
            <div className="ProgressUpdateCard_property--extraPadding">
                <span className="ProgressUpdateCard_property_label">Created at: </span>
                {formatDate(progressUpdate.createdAt)}
            </div>

            {
                progressUpdate.updatedAt &&
            <div className="ProgressUpdateCard_property--extraPadding">
                <span className="ProgressUpdateCard_property_label">Updated at: </span>
                {formatDate(progressUpdate.updatedAt)}
            </div>
            }

            <br/>
            <br/>
            <br/>

            <div className="ProgressUpdateCard_property--description">
                <div className="ProgressUpdateCard_property_label ProgressUpdateCard_property_label--extraPadding">Description:</div>
                {progressUpdate.description}
            </div>

            {renderModals()}

        </div>
    );
};


export default ProgressUpdateCard;
