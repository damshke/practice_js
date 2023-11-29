import Button from '@components/controls/Button';
import { Select } from '@components/controls/Select';
import { scale, MEDIA_QUERIES } from '@scripts/gds';
import { useCallback, useState } from 'react';
import { useFilters } from '@api/vacancies/filters';
import FormField from '@components/controls/Form/Field';
import ArrowDown from '../../../../icons/16/chevronDown.svg';

export const FilterFields = () => {
    const { data: filterData } = useFilters();

    const scheduleOptions = filterData?.schedule || [];
    const positionOptions = filterData?.employment || [];

    const [isOpenSelectSchedule, setOpenSelectSchedule] = useState(false);
    const [isOpenSelectPosition, setOpenSelectPosition] = useState(false);

    const handleOpenSelectSchedule = useCallback(() => {
        setOpenSelectSchedule(prevIsOpen => !prevIsOpen);
        setOpenSelectPosition(false);
    }, []);

    const handleOpenSelectPosition = useCallback(() => {
        setOpenSelectPosition(prevIsOpen => !prevIsOpen);
        setOpenSelectSchedule(false);
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
                    width: '100%',
                    gap: scale(2),
                    alignItems: 'flex-start',
                },
            }}
        >
            <FormField name="schedule">
                <Select
                    name="schedule"
                    label="Form"
                    isOpen={isOpenSelectSchedule}
                    handleClick={handleOpenSelectSchedule}
                    optionsList={scheduleOptions}
                    Icon={ArrowDown}
                />
            </FormField>

            <FormField name="employment">
                <Select
                    name="employment"
                    handleClick={handleOpenSelectPosition}
                    isOpen={isOpenSelectPosition}
                    label="Position"
                    optionsList={positionOptions}
                    Icon={ArrowDown}
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
