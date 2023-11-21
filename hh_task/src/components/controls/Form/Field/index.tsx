import type {
    FieldHelperProps as FormikFieldHelperProps,
    FieldMetaProps as FormikFieldMetaProps,
    FieldInputProps as FormikFieldProps,
} from 'formik';
import { ChangeEvent, Children, cloneElement, forwardRef, isValidElement, useCallback, useMemo } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { Input } from '@components/controls/Input';

import type { FieldProps } from './types';
import useForm from '../useForm';

export interface FormikCompatibleFieldProps {
    helpers?: FormikFieldHelperProps<any>;
    field?: FormikFieldProps<any>;
    meta?: FormikFieldMetaProps<any>;
}

export const useFormikCompatibleFieldProps = ({
    field,
    error,
    isTouched,
    name,
    onChangeHandler,
    setError,
    setValue,
    trigger,
}: {
    field: FormikFieldProps<any>;
    error: any;
    isTouched: boolean;
    name: string;
    onChangeHandler: (e?: ChangeEvent<any>, val?: any) => void;
    setError: (...args: any[]) => void;
    setValue: (...args: any[]) => void;
    trigger: (...args: any[]) => void;
}) =>
    useMemo<FormikCompatibleFieldProps>(
        () => ({
            field: {
                name: field.name,
                onBlur: field.onBlur,
                onChange: onChangeHandler,
                value: field.value,
            },
            helpers: {
                setError(val) {
                    setError(name, { message: val });
                },
                setTouched() {
                    throw new Error('Unsupported function');
                },
                setValue(value, shouldValidate) {
                    onChangeHandler(undefined, value);

                    setValue(name, value);

                    field.onBlur(undefined as any);

                    if (shouldValidate) {
                        trigger(name);
                    }
                },
            },
            meta: {
                initialTouched: false,
                touched: isTouched,
                value: field.value,
                error,
            },
        }),
        [field, error, isTouched, name, onChangeHandler, setError, setValue, trigger]
    );

export const FormField = forwardRef<HTMLInputElement, FieldProps>(({ name, children, size = 'md', ...props }, ref) => {
    const { onChange } = useForm()!;
    const { control, setValue, trigger, setError, formState } = useFormContext();
    const { field, fieldState: fieldStateForm } = useController({
        name,
        control,
    });

    const fieldState = useMemo(
        () => ({
            ...fieldStateForm,
            error: Array.isArray(fieldStateForm.error) ? fieldStateForm.error[0] : fieldStateForm.error,
        }),
        [fieldStateForm]
    );

    const onChangeHandler = useCallback(
        (e?: any, val?: any) => {
            field.onChange(e);
            const value = e !== undefined ? e.target.value : val;
            onChange(name, value);
        },
        [field, name, onChange]
    );

    const inputProps = {
        name,
        size,
        error: fieldState.error?.message,
        ref,
        label: props.label,
        ...props,
    };

    const fieldProps = useFormikCompatibleFieldProps({
        error: inputProps.error,
        field,
        isTouched: fieldState.isTouched || formState.isSubmitted,
        name,
        onChangeHandler,
        setError,
        setValue,
        trigger,
    });

    return (
        <div css={{ width: '100%' }}>
            {children ? (
                <>
                    {Children.map(children, child => {
                        if (isValidElement<any>(child)) {
                            const formProps: FieldProps = {
                                ...fieldProps,
                                ...inputProps,
                                ...child.props,
                            };
                            return cloneElement(child, { ...formProps });
                        }
                    })}
                </>
            ) : (
                <Input
                    onInput={e => {
                        field.onChange(e);
                        onChangeHandler(e);
                    }}
                    onClear={() => {
                        setValue(name, '');
                        onChangeHandler(undefined, '');
                    }}
                    {...inputProps}
                />
            )}
        </div>
    );
});

FormField.displayName = 'FormField';

export default FormField;
