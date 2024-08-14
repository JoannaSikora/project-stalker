import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProject, selectProject } from '../../../state/actions/projectsActions';
import ProjectForm from '../../shared/ProjectForm/ProjectForm';
import { getNextId } from '../../../helpers/helperMethods';

const AddNewProject = ({ close }) => {
    const projects = useSelector(state => state.projects);
    const dispatch = useDispatch();

    const onSubmit = ({ values }) => {
        const nextId = getNextId(projects);
        dispatch(createProject({ name: values.name, id: nextId }));

        if (projects.length === 0) {
            dispatch(selectProject(nextId));
        }

        close();
    };

    const initialValues = { name: '' };

    return (
        <div>
            <h2>Add new project</h2>
            <ProjectForm initialValues={initialValues} onSubmit={onSubmit} />
        </div>
    )
};

export default AddNewProject;
