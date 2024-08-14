import React from 'react';
import useCustomForm from '../../../customHooks/useCustomForm';

const ProjectForm = ({ initialValues, onSubmit }) => {
    const nameMaxLength = 30;

    const validate = (values) => {
        let errors = {};
        if (!values.name) {
            errors.name = 'required';
        } else if (values.name.length > nameMaxLength) {
            errors.name = 'maxLength';
        }
        return errors;
    };


    const {
        values,
        errors,
        touched,
        canSubmit,
        handleChange,
        handleBlur,
        handleSubmit
    } = useCustomForm({ initialValues, validate, onSubmit });


    return (
        <form onSubmit={handleSubmit}>
            <div className="form_wrapper">
                <label htmlFor="name" className="form_label">Enter name</label>
                <input
                    id="name"
                    className="form_control"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name}
                    required
                    maxLength={nameMaxLength}
                    aria-invalid={errors.name}
                    name="name"
                    autoComplete="off" />
                {touched.name && errors.name && errors.name === 'required'
                    && <div className="form_error">Name is required</div>}
                {touched.name && errors.name && errors.name === 'maxLength'
                    && <div className="form_error">Name cannot exceed {nameMaxLength} characters</div>}
            </div>
            <button
                disabled={!canSubmit}
                type="submit"
                className="button">
                Create
            </button>
        </form>
    )
};

export default ProjectForm;
