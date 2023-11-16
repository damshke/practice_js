import React, { FC } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Input } from '@components/controls/Input';

import { FieldProps } from './types';

const FormField: FC<FieldProps> = ({ name, children, ...props }) => {
    const { control } = useForm();

    return (
        <div css={{ width: '100%' }}>
            {children ? (
                <>
                    {React.Children.map(children, child => {
                        if (React.isValidElement(child)) {
                            return (
                                <Controller
                                    key={name}
                                    name={name}
                                    control={control}
                                    render={({ field }) => {
                                        const formProps: FieldProps = {
                                            id: name,
                                            ...field,
                                            ...child.props,
                                        };
                                        return React.cloneElement(child, { ...formProps });
                                    }}
                                />
                            );
                        }
                    })}
                </>
            ) : (
                <Controller
                    name={name}
                    control={control}
                    render={({ field }) => {
                        const inputProps = {
                            type: 'text',
                            ...props,
                            ...field,
                        };
                        return <Input {...inputProps} />;
                    }}
                />
            )}
        </div>
    );
};

export default FormField;
