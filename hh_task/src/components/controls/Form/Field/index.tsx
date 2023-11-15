import { Input } from '@components/controls/Input';
import { Field, useForm } from '@tanstack/react-form';
import { Children, isValidElement, cloneElement } from 'react';

import { FieldProps } from './types';

const FormField = ({ name, children, ...props }: FieldProps) => {
    const { field } = useForm(name as keyof Field);

    const inputProps = {
        type: 'text',
        name,
        ...props,
        ...field,
    };

    return (
        <div css={{ width: '100%' }}>
            {children ? (
                <>
                    {Children.map(children, child => {
                        if (isValidElement(child)) {
                            const formProps: FieldProps = {
                                id: name,
                                ...inputProps,
                                ...child.props,
                            };

                            return cloneElement(child, { ...formProps });
                        }
                    })}
                </>
            ) : (
                cloneElement(<Input {...inputProps} />)
            )}
        </div>
    );
};

export default FormField;
