import Button from '@components/controls/Button';
import { Select } from '@components/controls/Select';
import { useForm, FieldValues, Control } from 'react-hook-form';
import { scale, MEDIA_QUERIES } from '@scripts/gds';
import { FC, useCallback, useState } from 'react';
import useFilters from '@api/filters';
import FormField from '@components/controls/Form/Field';
import ArrowDown from '../../../icons/16/chevronDown.svg';
import CloseIcon from '../../../icons/16/close.svg';

interface FiltersFormProps {
    onSubmit: (values: FieldValues) => void;
    onClear: () => void;
    control: Control<FieldValues, any>;
}

export const FilterFields: FC<FiltersFormProps> = ({ onClear, onSubmit, control }) => {
    const { setValue, watch } = useForm({
        defaultValues: {
            employment: null,
            experience: null,
        },
    });

    const selectedForm = watch('employment');
    const selectedExperience = watch('experience');

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

    const handleSearch = () => {
        onSubmit({ employment: selectedForm, experience: selectedExperience });
    };

    const handleClearFilters = () => {
        setValue('employment', null);
        setValue('experience', null);
        onClear();
    };

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
                <FormField name="employment" control={control}>
                    <Select
                        label="Employment"
                        Icon={ArrowDown}
                        optionsList={employmentOptions.map((item: { name: String }) => item.name)}
                        isOpen={isOpenSelectEmployment}
                        handleClick={handleOpenSelectEmployment}
                    />
                </FormField>

                <FormField name="experience" control={control}>
                    <Select
                        handleClick={handleOpenSelectExperience}
                        isOpen={isOpenSelectExperience}
                        label="Experience"
                        Icon={ArrowDown}
                        optionsList={experienceOptions.map((item: { name: String }) => item.name)}
                    />
                </FormField>

                <Button
                    variant="primary"
                    size="md"
                    css={{ margin: scale(5, true) }}
                    type="submit"
                    onClick={handleSearch}
                >
                    Search
                </Button>
            </div>
            <Button
                variant="link"
                Icon={CloseIcon}
                block
                hidden={!selectedForm || !selectedExperience}
                onClick={handleClearFilters}
            >
                Clear filters
            </Button>
        </div>
    );
};
