import React, { useEffect, useRef, useState } from 'react';
import ProjectButton from "./ProjectButton/ProjectButton";
import AddNewProject from "./AddNewProject/AddNewProject";
import Modal from "../shared/Modal/Modal";
import useModal from "../../customHooks/useModal";
import './projects-menu.scss';
import { ReactComponent as MenuIcon } from "../../assets/icons/menu.svg";
import { useDispatch, useSelector } from "react-redux";
import { selectProject } from "../../state/actions/projectsActions";

const ProjectsMenu = () => {
    const projects = useSelector(state => state.projects);
    const selectedProjectId = useSelector(state => state.selectedProjectId);
    const selectedProject = projects.find(project => project.id === selectedProjectId);

    const { open, openModal, closeModal } = useModal();
    const [ isShowing, toggleIsShowing ] = useState(true);

    const markerRef = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (markerRef.current && selectedProject && selectedProject.id === projects[0].id) {
            markerRef.current.style.transform = `translateY(0px)`;
            markerRef.current.style.display = 'block';
        } else if (markerRef.current && !selectedProject) {
            markerRef.current.style.display = 'none';
        } else {
            markerRef.current.style.display = 'block';
        }

    }, [ projects,  selectedProject ]);

    const onProjectSelect = (project, ref) => {
        moveSelectedProjectMarker(project, ref);
        dispatch(selectProject(project.id))
    };

    const renderProjects = () => {
        return projects.map(project => {
            return (
                <ProjectButton
                    selectedProject={selectedProject}
                    onProjectSelect={onProjectSelect}
                    key={project.id}
                    project={project}
                />
            )
        })
    };

    const moveSelectedProjectMarker = (project, btnRef) => {

        const getItemOffset = (item) => {
            const { offsetTop } = item.current;
            return offsetTop;
        };

        const moveMarker = (offset) => {
            const { offsetTop } = markerRef.current;
            markerRef.current.style.transform = `translateY(${offset - offsetTop}px)`;
        };

        const offset = getItemOffset(btnRef);
        moveMarker(offset);
    };

    const hideMenu = () => {
        return isShowing ? null : "ProjectsMenu--hide";
    };

    const hideMenuMoveButton = () => {
        return isShowing ? null : "ProjectsMenu_button--hiddenMenu";
    };

    const toggleMenu = () => {
        toggleIsShowing(!isShowing);
    };

    return (
        <div className={`ProjectsMenu_wrapper ${hideMenu()} `}>
            <div className="ProjectsMenu_title_wrapper">
                <h2>Your Projects</h2>
                <MenuIcon
                    className={`${hideMenuMoveButton()} ProjectsMenu_button `}
                    onClick={toggleMenu}
                />
            </div>
            <div className="ProjectsMenu_list_wrapper">
                <div
                    ref={markerRef}
                    className="ProjectsMenu_list_activeMarker"
                />
                <div className="ProjectsMenu_list_projects_wrapper">
                    {renderProjects()}
                </div>
            </div>
            <div className="ProjectsMenu_button_wrapper">
                <button
                    onClick={() => openModal()}
                    className="button">
                    + Add new project
                </button>
            </div>

            <Modal isShowing={open} close={closeModal}>
                <AddNewProject close={closeModal} />
            </Modal>

        </div>
    );
};

export default ProjectsMenu;
