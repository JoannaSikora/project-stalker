import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { createProgressUpdate } from "../../../state/actions/progressUpdatesActions";
import ProgressUpdateForm from "../../shared/ProgressUpdateForm/ProgressUpdateForm";
import { getNextId } from "../../../helpers/helperMethods";
import moment from "moment";
import { ON_TRACK } from "../../../helpers/constants/statusConstants";

const AddNewProgressUpdate = ({ projectId, close }) => {
    const progressUpdates = useSelector(state => state.progressUpdates);
    const dispatch = useDispatch();

    const onSubmit = ({ values }) => {
        const nextId =  getNextId(progressUpdates);
        dispatch(createProgressUpdate({
            ...values,
            id: nextId,
            projectId: projectId,
            createdAt: moment().toISOString()
        }));

        close();
    };

    const initialValues = {
        status: ON_TRACK,
        description: ""
    };

    return (
        <div>
            <h2>Add new progress update</h2>
            <ProgressUpdateForm
                initialValues={initialValues}
                onSubmit={onSubmit} />
        </div>
    )
};

export default AddNewProgressUpdate;
