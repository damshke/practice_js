import Button from '@components/controls/Button';
import { Select } from '@components/controls/Select';
import { useForm, FieldValues } from 'react-hook-form';
import { scale, MEDIA_QUERIES } from '@scripts/gds';
import { FC, useCallback, useState } from 'react';
import useFilters from '@api/filters';
import FormField from '@components/controls/Form/Field';
import ArrowDown from '../../../icons/16/chevronDown.svg';
import CloseIcon from '../../../icons/16/close.svg';

interface FiltersFormProps {
    onSubmit: (values: FieldValues) => void;
    onClear: () => void;
    errors?: any;
}

export const FilterFields: FC<FiltersFormProps> = ({ errors }) => {
    const { data: filterData } = useFilters();

    const employmentOptions = filterData?.employment || [];
    const experienceOptions = filterData?.experience || [];

    const [isOpenSelectEmployment, setOpenSelectEmployment] = useState(false);
    const [isOpenSelectExperience, setOpenSelectExperience] = useState(false);

    const handleOpenSelectEmployment = useCallback(() => {
        setOpenSelectEmployment(prevIsOpen => !prevIsOpen);
        setOpenSelectExperience(false);
    }, []);

    const handleOpenSelectExperience = useCallback(() => {
        setOpenSelectExperience(prevIsOpen => !prevIsOpen);
        setOpenSelectEmployment(false);
    }, []);

    return (
        <div
            css={{
                display: 'flex',
                flexDirection: 'row',
                padding: 0,
                position: 'relative',
                maxWidth: scale(86),
                marginBottom: scale(5),
                gap: scale(4),
                [MEDIA_QUERIES.sm]: {
                    flexDirection: 'column',
                    gap: scale(3),
                    width: '100%',
                },
            }}
        >
            <div
                css={{
                    width: '80%',
                    display: 'flex',
                    gap: scale(2),
                    [MEDIA_QUERIES.sm]: {
                        flexDirection: 'column',
                        width: '100%',
                        gap: scale(2),
                    },
                }}
            >
                <FormField name="employment" error={errors.employment?.message}>
                    <Select
                        label="Employment"
                        isOpen={isOpenSelectEmployment}
                        handleClick={handleOpenSelectEmployment}
                        optionsList={employmentOptions}
                    />
                </FormField>

                <FormField name="experience">
                    <Select
                        handleClick={handleOpenSelectExperience}
                        isOpen={isOpenSelectExperience}
                        label="Experience"
                        optionsList={experienceOptions}
                    />
                </FormField>

                <Button variant="primary" size="md" css={{ margin: scale(5, true) }} type="submit">
                    Search
                </Button>
            </div>
            <Button variant="link" Icon={CloseIcon} block hidden>
                Clear filters
            </Button>
        </div>
    );
};
