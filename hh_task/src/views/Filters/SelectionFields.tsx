import Button from '@components/controls/Button';
import { Select } from '@components/controls/Select';
import { scale } from '@scripts/gds';
import useFilters from '@api/filters';

import { useCallback, useState } from 'react';
import { Option } from './types';
import CloseIcon from '../../icons/16/close.svg';
import ArrowDown from '../../icons/16/chevronDown.svg';

export const SelectionFields = () => {
    // исправить отображение списка
    const { data: filterData } = useFilters();

    const [selectedForm, setSelectedForm] = useState<Option | null>(null);
    const [selectedExperience, setSelectedExperience] = useState<Option | null>(null);

    const employmentOptions = filterData?.employment || [];
    const experienceOptions = filterData?.experience || [];

    const [isOpenSelect, setOpenSelect] = useState(false);

    const handleOpenSelect = useCallback(() => {
        setOpenSelect(() => !isOpenSelect);
    }, [isOpenSelect]);

    return (
        <div
            css={{
                display: 'flex',
                flexDirection: 'column',
                gap: scale(2),
            }}
        >
            <div
                css={{
                    display: 'flex',
                    maxWidth: '80%',
                    gap: scale(2),
                }}
            >
                <Select
                    Icon={ArrowDown}
                    label="Employment"
                    value={selectedForm?.id || ''}
                    onChange={e => setSelectedForm({ id: String(e.target.value) })}
                    optionsList={employmentOptions.map(item => item.name)}
                    handleClick={handleOpenSelect}
                    isOpen={isOpenSelect}
                />

                <Select
                    Icon={ArrowDown}
                    label="Experience"
                    value={selectedExperience?.id || ''}
                    onChange={e => setSelectedExperience({ id: String(e.target.value) })}
                    optionsList={experienceOptions.map(item => item.name)}
                    handleClick={isOpenSelect}
                    isOpen={isOpenSelect}
                />

                <Button
                    variant="primary"
                    size="md"
                    css={{
                        margin: 'auto 0',
                    }}
                >
                    Search
                </Button>
            </div>
            <Button variant="link" hidden Icon={CloseIcon} block>
                Clear filters
            </Button>
        </div>
    );
};
