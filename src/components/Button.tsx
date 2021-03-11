import React from 'react';

type ButtonProps = {
    text: string;
    type?: 'button' | 'submit' | 'reset';
    borderColor: string;
    backgroundColor: string;
    bgHoverColor: string;
    onClick?(): unknown;
    disabled?: boolean;
};

const Button = ({
    text,
    type,
    borderColor,
    backgroundColor,
    bgHoverColor,
    onClick,
    disabled,
}: ButtonProps): JSX.Element => {
    return (
        <button
            onClick={onClick}
            // eslint-disable-next-line react/button-has-type
            type={type}
            className={`
                w-full border ${borderColor} ${backgroundColor} text-white rounded-md px-4 py-2 select-none
                focus:outline-none focus:shadow-outline
                ${disabled ? 'opacity-50 cursor-default' : bgHoverColor}
                transition duration-500 ease
            `}
            disabled={disabled}
        >
            {text}
        </button>
    );
};

Button.defaultProps = {
    type: 'submit',
    onClick: () => {},
    disabled: false,
};

export default Button;
