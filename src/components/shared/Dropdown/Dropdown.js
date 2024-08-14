import React, { useState, useEffect } from 'react';
import { ReactComponent as MoreIcon } from '../../../assets/icons/more.svg';
import './dropdown.scss';

const Dropdown = ({ options, onSelectedChange, width }) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const bodyClickListener = () => {
            setOpen(false);
        };

        if (open) {
            document.body.addEventListener('click', bodyClickListener);
        }

        return () => {
            document.body.removeEventListener('click', bodyClickListener)
        }
    }, [open]);

    const onOptionSelect = (option) => {
        onSelectedChange(option);
    };

    const renderedOptions = options.map(option => {
        return (
            <li
                role="option"
                className="Dropdown_list_option"
                onClick={() => {
                    onOptionSelect(option.value);
                }}
                key={option.value}>
                {option.label}
            </li>
        )
    });

    const isDropdownOpen = open ? 'Dropdown_list--block' : null;

    return (
        <div className="Dropdown_wrapper">
            <div
                aria-expanded={open}
                aria-haspopup="listbox"
                role="button"
                className="Dropdown_icon_wrapper"
                onClick={() => {
                    setOpen(!open)
                }}>
                <MoreIcon style={{ width }} />
            </div>

            <ul
                role="listbox"
                className={`Dropdown_list ${isDropdownOpen}`}>
                {renderedOptions}
            </ul>
        </div>
    )
};

export default Dropdown;
