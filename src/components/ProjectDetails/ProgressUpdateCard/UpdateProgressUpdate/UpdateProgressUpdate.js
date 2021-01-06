import React from 'react';
import { useDispatch } from "react-redux";
import { updateProgressUpdate } from "../../../../state/actions/progressUpdatesActions";
import ProgressUpdateForm from "../../../shared/ProgressUpdateForm/ProgressUpdateForm";
import moment from "moment";

const UpdateProgressUpdate = ({ progressUpdate, close }) => {
    const dispatch = useDispatch();

    const onSubmit = ({ values }) => {
        dispatch(updateProgressUpdate(progressUpdate.id, {
            ...progressUpdate,
            ...values,
            updatedAt: moment().toISOString()
        }));

        close();
    };

    const initialValues = {
        status: progressUpdate.status,
        description: progressUpdate.description
    };


    return (
        <div>
            <h2>Update progress update</h2>
            <ProgressUpdateForm initialValues={initialValues} onSubmit={onSubmit} />
        </div>
    )
};

export default UpdateProgressUpdate;
