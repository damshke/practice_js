import { Input } from '@components/controls/Input';
import { useField } from '@tanstack/react-form';
import { Children, isValidElement, cloneElement } from 'react';
import { useForm } from 'react-hook-form';

import { FieldProps } from './types';

const Field = ({ name, children, ...props }: FieldProps) => {
    // const [field, meta, helpers] = useField(name);
    const inputProps = {
        type: 'text',
        name,
        ...props,
    };

    return (
        <div css={{ width: '100%' }}>
            {children ? (
                <>
                    {Children.map(children, child => {
                        if (isValidElement(child)) {
                            const formikProps: FieldProps = {
                                id: name,
                                ...inputProps,
                                ...child.props,
                            };

                            return cloneElement(child, { ...formikProps });
                        }
                    })}
                </>
            ) : (
                cloneElement(<Input {...inputProps} />)
            )}
        </div>
    );
};

export default Field;
