import React from "react";
import useCustomForm from "../../../customHooks/useCustomForm";
import { AT_RISK, OFF_TRACK, ON_HOLD, ON_TRACK } from "../../../helpers/constants/statusConstants";

const ProgressUpdateForm = ({ initialValues, onSubmit }) => {
    const descriptionMaxLength = 500;

    const validate = (values) =>  {
        let errors = {};
        if (!values.status) {
            errors.status = 'required';
        }

        if (!values.description) {
            errors.description = 'required';
        } else if (values.description.length > descriptionMaxLength) {
            errors.description = 'maxLength';
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
                <label htmlFor="status" className="form_label">Status</label>
                <select
                    id="status"
                    className="form_control"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.status}
                    required
                    name="status">
                    <option value={ON_TRACK}>On Track</option>
                    <option value={OFF_TRACK}>Off Track</option>
                    <option value={ON_HOLD}>On Hold</option>
                    <option value={AT_RISK}>At Risk</option>
                </select>
                {touched.status && errors.status && errors.status === 'required'
                && <div className="form_error">Status is required</div>}
            </div>
            <div className="form_wrapper form_wrapper--textarea">
                <label htmlFor="description" className="form_label">Description</label>
                <textarea
                    id="description"
                    className="form_control"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.description}
                    required
                    maxLength={descriptionMaxLength}
                    aria-invalid={errors.description}
                    name="description"
                    autoComplete="off"/>
                {touched.description && errors.description && errors.description === 'required'
                && <div className="form_error">Description is required</div>}
                {touched.description && errors.description && errors.description === 'maxLength'
                && <div className="form_error">Description cannot exceed {descriptionMaxLength} characters</div>}
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

export default ProgressUpdateForm;
