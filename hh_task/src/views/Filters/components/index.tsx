import Button from '@components/controls/Button';
import { Select } from '@components/controls/Select';
import { scale, MEDIA_QUERIES } from '@scripts/gds';
import { useCallback, useState } from 'react';
import useFilters from '@api/filters';
import FormField from '@components/controls/Form/Field';

export const FilterFields = () => {
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
                maxWidth: scale(86),
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
            <FormField name="employment">
                <Select
                    name="employment"
                    label="Employment"
                    isOpen={isOpenSelectEmployment}
                    handleClick={handleOpenSelectEmployment}
                    optionsList={employmentOptions}
                />
            </FormField>

            <FormField name="experience">
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
    );
};
