import { Children, cloneElement, isValidElement } from 'react';
import { useField } from 'formik';
import { Input } from '@components/controls/Input';
import { FieldProps } from './types';

const Field = ({ name, children, ...props }: FieldProps) => {
    const [field, meta, helpers] = useField(name);
    const inputProps = {
        type: 'text',
        name,
        field,
        meta,
        helpers,
        ...props,
    };

    return (
        <div css={{ width: '100%' }}>
            {children ? (
                <div css={{ width: '100%' }}>
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
                </div>
            ) : (
                cloneElement(<Input {...inputProps} />)
            )}
        </div>
    );
};

export default Field;
