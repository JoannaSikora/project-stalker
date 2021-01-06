import {
    PATCH_PROJECTS_NAME,
    DELETE_PROJECT,
    PROJECT_SELECTED,
    CREATE_PROJECT,
} from "./constants";

export const selectProject = id => {
    return {
        type: PROJECT_SELECTED,
        payload: { id },
    }
};

export const patchProjectsName = (id, newName) => {
    return {
        type: PATCH_PROJECTS_NAME,
        payload: { id, newName }
    }
};

export const deleteProject = id => {
    return {
        type: DELETE_PROJECT,
        payload: { id }
    }
};


export const createProject = project => {
    return {
        type: CREATE_PROJECT,
        payload: { project }
    }
};
