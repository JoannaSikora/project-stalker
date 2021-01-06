import React from 'react';
import { useDispatch } from "react-redux";
import { patchProjectsName } from "../../../state/actions/projectsActions";
import ProjectForm from "../../shared/ProjectForm/ProjectForm";

const UpdateProjectsName = ({ project, close }) => {
    const dispatch = useDispatch();

    const onSubmit = ({ values }) => {
        dispatch(patchProjectsName(project.id, values.name));
        close();
    };

    const initialValues = {
        name: project.name
    };

    return (
        <div>
            <h2>Update Projects name</h2>
            <ProjectForm
                initialValues={initialValues}
                onSubmit={onSubmit} />
        </div>
    )
};

export default UpdateProjectsName;
