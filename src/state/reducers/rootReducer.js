import { combineReducers } from 'redux';
import { projectsReducer, selectedProjectReducer } from './projectsReducer';
import { progressUpdatesReducer } from './progressUpdatesReducer';

export const rootReducer = combineReducers({
    projects: projectsReducer,
    selectedProjectId: selectedProjectReducer,
    progressUpdates: progressUpdatesReducer
});
