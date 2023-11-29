import Form from '@components/controls/Form';
import { MEDIA_QUERIES, scale } from '@scripts/gds';
import { Dispatch, SetStateAction } from 'react';
import * as yup from 'yup';
import CloseIcon from '../../../icons/16/close.svg';
import { FilterFields } from './components';
import { FiltersData } from './types';

const validationSchema = {
    schedule: yup.string(),
    employment: yup.string(),
};

export default function Filters({
    onSubmit,
}: {
    onSubmit: Dispatch<SetStateAction<{ schedule: string; employment: string }>>;
}) {
    return (
        <Form
            css={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: scale(2),
                padding: `${scale(0)}px ${scale(15)}px ${scale(6)}px`,
                marginRight: scale(2),
                marginBottom: scale(5),
                [MEDIA_QUERIES.md]: {
                    flexDirection: 'column',
                    padding: `${scale(4)}px ${scale(2)}px`,
                    margin: '0',
                },
            }}
            initialValues={{ schedule: '', employment: '' }}
            onSubmit={(data: FiltersData) => onSubmit({ schedule: data.schedule, employment: data.employment })}
            validationSchema={yup.object().shape(validationSchema)}
            isFilters
            resetText="Clear filters"
            Icon={CloseIcon}
        >
            <FilterFields />
        </Form>
    );
}
