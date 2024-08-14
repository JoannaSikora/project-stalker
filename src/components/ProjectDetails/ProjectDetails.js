import React, { useState } from 'react';
import ProgressUpdateCard from './ProgressUpdateCard/ProgressUpdateCard';
import Dropdown from '../shared/Dropdown/Dropdown';
import useModal from '../../customHooks/useModal';
import Modal from '../shared/Modal/Modal';
import ConfirmDelete from '../shared/ConfirmDelete/ConfirmDelete';
import UpdateProjectsName from './UpdateProjectsName/UpdateProjectsName';
import AddNewProgressUpdate from './AddNewProgressUpdate/AddNewProgressUpdate';
import './project-details.scss';
import { batch, useDispatch, useSelector } from 'react-redux';
import { deleteProject, selectProject } from '../../state/actions/projectsActions';
import { deleteProjectDeleteProgressUpdate } from '../../state/actions/progressUpdatesActions';
import { getStatusClassSuffix, getStatusValue } from '../../helpers/helperMethods';
import {
    CREATE_PROGRESS_UPDATE_OPTION,
    DELETE_PROJECT_OPTION,
    UPDATE_PROJECT_OPTION
} from '../../helpers/constants/modalOptionsConstants';

const ProjectsDetails = () => {
    const projects = useSelector(state => state.projects);
    const selectedProjectId = useSelector(state => state.selectedProjectId);
    const project = projects.find(project => project.id === selectedProjectId);

    const { open, openModal, closeModal } = useModal();
    const [currentModal, setCurrentModal] = useState(null);
    const progressUpdates = useSelector(state => state.progressUpdates
        .filter(progressUpdate => progressUpdate.projectId === project?.id));

    const dispatch = useDispatch();

    const renderProjectTitle = (name, progressUpdates) => {
        if (progressUpdates.length === 0) {
            return `${project.name} has not started yet.`
        }

        const latestStatus = progressUpdates[progressUpdates.length - 1].status;
        return (
            <React.Fragment>
                {name} is
                <span className={
                    `ProjectDetails_title_status
                            ProjectDetails_title_status${getStatusClassSuffix(latestStatus)}`
                }> {getStatusValue(latestStatus)}</span>.
            </React.Fragment>
        )
    };

    const renderHistoryProgressCards = () => {
        const historyProgressUpdates = progressUpdates.slice(0, progressUpdates.length - 1).reverse();

        if (historyProgressUpdates.length === 0) {
            return;
        }

        return (
            <div>
                <h2 className="ProjectDetails_cards--history_title">History</h2>
                {
                    historyProgressUpdates.map(progressUpdate => {
                        return (
                            <ProgressUpdateCard
                                key={progressUpdate.id}
                                progressUpdate={progressUpdate}
                            />
                        )
                    })
                }
            </div>
        )
    };

    const renderLatestProgressCard = () => {
        const latestProgressUpdate = progressUpdates[progressUpdates.length - 1];

        return (
            <div>
                <div className="ProjectDetails_cards--latest_title_wrapper">
                    <h2>Latest progress update</h2>
                    <button
                        onClick={() => onSelectedAction(CREATE_PROGRESS_UPDATE_OPTION)}
                        className="button">+ Add new update
                    </button>
                </div>
                <ProgressUpdateCard progressUpdate={latestProgressUpdate} />
            </div>
        );
    };

    const renderProgressUpdates = () => {

        if (progressUpdates.length === 0) {
            return (
                <div className="ProjectDetails_cards--noResults">
                    <button
                        onClick={() => onSelectedAction(CREATE_PROGRESS_UPDATE_OPTION)}
                        className="button">+ Add first update
                    </button>
                </div>
            )
        }

        return (
            <div>
                <div className="ProjectDetails_cards_wrapper">
                    {renderLatestProgressCard()}
                </div>

                <div
                    className="ProjectDetails_cards_wrapper">
                    {renderHistoryProgressCards()}
                </div>
            </div>
        )
    };

    const renderModals = () => {
        return (
            <React.Fragment>
                <Modal
                    isShowing={open && currentModal === UPDATE_PROJECT_OPTION}
                    close={closeModal}>
                    <UpdateProjectsName
                        project={project}
                        close={closeModal}
                    />
                </Modal>

                <Modal
                    isShowing={open && currentModal === DELETE_PROJECT_OPTION}
                    close={closeModal}>
                    <ConfirmDelete
                        handleConfirm={handleConfirmDelete}
                        close={closeModal}
                        name={project.name}
                    />
                </Modal>

                <Modal
                    isShowing={open && currentModal === CREATE_PROGRESS_UPDATE_OPTION}
                    close={closeModal}>
                    <AddNewProgressUpdate
                        projectId={project.id}
                        close={closeModal}
                    />
                </Modal>
            </React.Fragment>
        )
    };

    const handleConfirmDelete = () => {
        if (projects.length === 1) {
            batch(() => {
                dispatch(deleteProject(project.id));
                dispatch(selectProject(null));
            })
        } else if (projects[0].id === project.id) {
            batch(() => {
                dispatch(deleteProject(project.id));
                dispatch(selectProject(projects[1].id));
            })
        } else {
            batch(() => {
                dispatch(deleteProject(project.id));
                dispatch(selectProject(projects[0].id));
            });
        }

        dispatch(deleteProjectDeleteProgressUpdate(project.id));

        closeModal();
    };

    const onSelectedAction = (action) => {
        setCurrentModal(action);
        openModal();
    };

    const dropdownOptions = [
        { label: 'Delete', value: DELETE_PROJECT_OPTION },
        { label: 'Edit', value: UPDATE_PROJECT_OPTION }
    ];

    if (!project) {
        return <h1 className="ProjectDetails--noResults">No projects yet.</h1>
    }

    return (
        <div className="ProjectDetails_wrapper">
            <div className="ProjectDetails_title_wrapper">
                <h1 className="ProjectDetails_title">
                    {renderProjectTitle(project.name, progressUpdates)}
                </h1>
                <div className="ProjectDetails_title_dropdown">
                    <Dropdown
                        width="1.2rem"
                        options={dropdownOptions}
                        onSelectedChange={onSelectedAction} />
                </div>
            </div>

            {renderProgressUpdates()}

            {renderModals()}

        </div>
    );
};

export default ProjectsDetails;


