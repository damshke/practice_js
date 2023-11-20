import Button from '@components/controls/Button';
import { Select } from '@components/controls/Select';
import { scale, MEDIA_QUERIES } from '@scripts/gds';
import useFilters from '@api/filters';
import { useCallback, useState } from 'react';

import { Option } from './types';
import CloseIcon from '../../icons/16/close.svg';
import ArrowDown from '../../icons/16/chevronDown.svg';
import { API_URL } from '@api/const';

export const Filters = () => {
    const { data: filterData } = useFilters();

    const [selectedForm, setSelectedForm] = useState<Option | null>(null);
    const [selectedExperience, setSelectedExperience] = useState<Option | null>(null);

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

    const handleClearFilters = () => {
        setSelectedExperience(null);
        setSelectedForm(null);
    };

    // const handleSearch = async () => {
    //     const data = await fetch(`${API_URL}?page=$0&per_page=$5&${selectedForm}&${selectedExperience}`);
    //     const response = await data.json();
    //     return response;
    // };

    return (
        <div
            css={{
                padding: `${scale(0)}px ${scale(15)}px ${scale(6)}px`,
            }}
        >
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
                    <Select
                        Icon={ArrowDown}
                        label="Employment"
                        optionsList={employmentOptions.map((item: { name: String }) => item.name)}
                        handleClick={handleOpenSelectEmployment}
                        isOpen={isOpenSelectEmployment}
                        meta={{ value: selectedForm }}
                        helpers={{ setValue: setSelectedForm }}
                    />

                    <Select
                        Icon={ArrowDown}
                        label="Experience"
                        value={selectedExperience?.id || ''}
                        onChange={e => setSelectedExperience({ id: String(e.target.value) })}
                        optionsList={experienceOptions.map((item: { name: String }) => item.name)}
                        handleClick={handleOpenSelectExperience}
                        isOpen={isOpenSelectExperience}
                        meta={{ value: selectedExperience }}
                        helpers={{ setValue: setSelectedExperience }}
                    />

                    <Button variant="primary" size="md" onClick={handleSearch}>
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
        </div>
    );
};
