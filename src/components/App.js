import React from 'react';
import ProjectsMenu from './ProjectsMenu/ProjectsMenu';
import ProjectsDetails from './ProjectDetails/ProjectDetails';
import './app.scss';

const App = () => {
    return (
        <div className="App_wrapper">
            <ProjectsMenu />
            <ProjectsDetails />
        </div>
    );
};

export default App;
