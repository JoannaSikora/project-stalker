import { CREATE_PROJECT, DELETE_PROJECT, PATCH_PROJECTS_NAME, PROJECT_SELECTED } from '../actions/constants';

const initial_state_projects = [
    { name: 'My First Project', id: 1 },
    { name: 'My Cool Project', id: 2 },
    { name: 'Company\'s new React project', id: 3 }
];

export const projectsReducer = (projectsList = initial_state_projects, action) => {
    switch (action.type) {

        case CREATE_PROJECT:
            const newProject = { ...action.payload.project };
            return [...projectsList, newProject];

        case PATCH_PROJECTS_NAME:
            let updatedProject = projectsList.find(project => project.id === action.payload.id);
            updatedProject.name = action.payload.newName;

            return projectsList.map((project) => {
                if (project.id !== action.payload.id) {
                    return project
                }
                return {
                    ...project, ...updatedProject
                }
            });

        case DELETE_PROJECT:
            return projectsList.filter(project => project.id !== action.payload.id);

        default:
            return projectsList;
    }
};

export const selectedProjectReducer = (selectedProjectId = initial_state_projects[0].id, action) => {
    if (action.type === PROJECT_SELECTED) {
        return action.payload.id;
    }

    return selectedProjectId;
};

