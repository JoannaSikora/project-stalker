import {
    CREATE_PROGRESS_UPDATE,
    DELETE_PROGRESS_UPDATE,
    DELETE_PROJECT_DELETE_PROGRESS_UPDATES,
    UPDATE_PROGRESS_UPDATE
} from './constants';

export const deleteProgressUpdate = id => {
    return {
        type: DELETE_PROGRESS_UPDATE,
        payload: { id }
    }
};

export const createProgressUpdate = progressUpdate => {
    return {
        type: CREATE_PROGRESS_UPDATE,
        payload: { progressUpdate }
    }
};

export const updateProgressUpdate = (id, progressUpdate) => {
    return {
        type: UPDATE_PROGRESS_UPDATE,
        payload: { id, progressUpdate }
    }
};


export const deleteProjectDeleteProgressUpdate = id => {
    return {
        type:
        DELETE_PROJECT_DELETE_PROGRESS_UPDATES,
        payload: { id }
    }
};

