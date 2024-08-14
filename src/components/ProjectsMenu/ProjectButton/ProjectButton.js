import React, { useRef } from 'react';
import './project-button.scss';

function ProjectButton({ project, onProjectSelect, selectedProject }) {
    const active = project.id === selectedProject.id ? 'ProjectButton--active' : null;
    const btnRef = useRef(null);

    return (
        <div
            ref={btnRef}
            onClick={() => onProjectSelect(project, btnRef)}
            className={`ProjectButton_wrapper ${active}`}>
            {project.name}
        </div>
    );
}

export default ProjectButton;
