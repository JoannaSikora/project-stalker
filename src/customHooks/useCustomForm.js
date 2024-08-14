import { useEffect, useState } from 'react';

const useCustomForm = ({ initialValues, validate, onSubmit }) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [canSubmit, setCanSubmit] = useState(true);

    useEffect(() => {
        const errors = validate(values);
        setErrors(errors);
        setCanSubmit(Object.keys(errors).length === 0);
    }, [values]);

    const handleChange = (event) => {
        const { target } = event;
        const { name, value } = target;
        event.persist();
        setValues({ ...values, [name]: value });
    };

    const handleBlur = (event) => {
        const { target } = event;
        const { name } = target;
        setTouched({ ...touched, [name]: true });
    };

    const handleSubmit = (event) => {
        if (event) event.preventDefault();
        onSubmit({ values, errors });
    };

    return {
        values,
        errors,
        touched,
        canSubmit,
        handleChange,
        handleBlur,
        handleSubmit
    };
};

export default useCustomForm;
