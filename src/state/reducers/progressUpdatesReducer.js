import {
    CREATE_PROGRESS_UPDATE,
    DELETE_PROGRESS_UPDATE,
    DELETE_PROJECT_DELETE_PROGRESS_UPDATES,
    UPDATE_PROGRESS_UPDATE
} from '../actions/constants';
import { AT_RISK, OFF_TRACK, ON_HOLD, ON_TRACK } from '../../helpers/constants/statusConstants';

const initial_state = [
    {
        projectId: 1,
        id: 1,
        status: ON_TRACK,
        description: 'Completed all tasks scheduled for this week. Also, the documentation for the next step has been provided by the client in advance.',
        createdAt: '2020-10-07T09:09:27.278Z',
        updatedAt: null
    },
    {
        projectId: 2,
        id: 2,
        status: ON_TRACK,
        description: 'Our survey results are in and being reviewed.',
        createdAt: '2019-12-07T09:10:27.278Z',
        updatedAt: null
    },
    {
        projectId: 2,
        id: 3,
        status: ON_TRACK,
        description: 'Survey results came back:\n' +
            '\n' +
            '1. 70% of employees took the satisfaction survey\n' +
            '2. Our overall satisfaction rating is 80%\n' +
            '3. Results are being reviewed by the executive team before the engagement committee meets again',
        createdAt: '2020-01-01T09:10:27.278Z',
        updatedAt: null
    },
    {
        projectId: 2,
        id: 4,
        status: ON_HOLD,
        description: 'Had to take care of another project, because of an unexpected bug',
        createdAt: '2020-01-02T12:10:27.278Z',
        updatedAt: '2020-12-07T09:11:27.278Z'
    },
    {
        projectId: 2,
        id: 5,
        status: AT_RISK,
        description: 'Keep working on another project, because of an unexpected bug. This may delay project timeline.',
        createdAt: '2020-06-08T19:10:27.278Z',
        updatedAt: '2020-12-09T09:10:27.278Z'
    },
    {
        projectId: 2,
        id: 6,
        status: OFF_TRACK,
        description: 'The long hold will delay our overall project timeline. Projects deadline must be reevaluated.',
        createdAt: '2020-06-09T09:10:27.278Z',
        updatedAt: '2020-12-12T09:10:27.278Z'
    },
    {
        projectId: 3,
        id: 7,
        status: ON_TRACK,
        description: 'The management team prepared projects specification and other documentation. Everything is available at companies Google drive.',
        createdAt: '2020-12-07T09:10:27.278Z',
        updatedAt: null
    }
];


export const progressUpdatesReducer = (progressUpdates = initial_state, action) => {
    switch (action.type) {

        case DELETE_PROGRESS_UPDATE:
            return progressUpdates.filter(progressUpdate => progressUpdate.id !== action.payload.id);

        case UPDATE_PROGRESS_UPDATE:
            return progressUpdates.map((progress) => {
                if (progress.id !== action.payload.id) {
                    return progress
                }
                return {
                    ...progress, ...action.payload.progressUpdate
                }
            });

        case CREATE_PROGRESS_UPDATE:
            const newProgressUpdate = { ...action.payload.progressUpdate };
            return [...progressUpdates, newProgressUpdate];

        case DELETE_PROJECT_DELETE_PROGRESS_UPDATES:
            return progressUpdates.filter(progressUpdate => progressUpdate.projectId !== action.payload.id);

        default:
            return progressUpdates;
    }
};
