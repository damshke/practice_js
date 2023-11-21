import React, { cloneElement, FC, isValidElement } from 'react';
import { Input } from '@components/controls/Input';

import { FieldProps } from './types';

const FormField: FC<FieldProps> = ({ name, children, ...props }) => (
    <div css={{ width: '100%' }}>
        {children ? (
            <>
                {React.Children.map(children, child => {
                    if (isValidElement<any>(child)) {
                        const formProps: FieldProps = {
                            id: name,
                            ...child.props,
                        };
                        return cloneElement(child, { ...formProps });
                    }
                })}
            </>
        ) : (
            <Input {...props} />
        )}
    </div>
);

export default FormField;
