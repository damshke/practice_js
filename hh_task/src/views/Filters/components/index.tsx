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
                flexDirection: 'column',
                gap: scale(2),
                padding: `${scale(0)}px ${scale(15)}px ${scale(6)}px`,
                marginRight: scale(2),
                [MEDIA_QUERIES.md]: {
                    flexDirection: 'column',
                    maxWidth: '100%',
                },
            }}
        >
            <div
                css={{
                    display: 'flex',
                    flexDirection: 'row',
                    maxWidth: scale(86),
                    marginBottom: scale(5),
                    gap: scale(4),
                    [MEDIA_QUERIES.md]: {
                        flexDirection: 'column',
                        gap: scale(3),
                        width: '100%',
                        alignItems: 'flex-start',
                        padding: `${scale(4)}px ${scale(2)}px`,
                    },
                }}
            >
                <FormField name="employment" error={errors.employment?.message}>
                    <Select
                        name="employment"
                        label="Employment"
                        isOpen={isOpenSelectEmployment}
                        handleClick={handleOpenSelectEmployment}
                        optionsList={employmentOptions}
                    />
                </FormField>

                <FormField name="experience" error={errors.experience?.message}>
                    <Select
                        name="experience"
                        handleClick={handleOpenSelectExperience}
                        isOpen={isOpenSelectExperience}
                        label="Experience"
                        optionsList={experienceOptions}
                    />
                </FormField>

                <Button
                    variant="primary"
                    size="md"
                    css={{
                        margin: scale(2) + 2,
                        [MEDIA_QUERIES.md]: {
                            margin: '0',
                            width: '100%',
                        },
                    }}
                    type="submit"
                >
                    Search
                </Button>
            </div>
            <Button variant="link" Icon={CloseIcon} block hidden>
                Clear filters
            </Button>
        </div>
    );
};
