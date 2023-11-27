import Form from '@components/controls/Form';
import { MEDIA_QUERIES, scale } from '@scripts/gds';
import { Dispatch, SetStateAction } from 'react';
import * as yup from 'yup';
import CloseIcon from '../../icons/16/close.svg';
import { FilterFields } from './components';

type FilterData = {
    employment: string;
    experience: string;
};

const validationSchema = {
    employment: yup.string(),
    experience: yup.string(),
};

export default function Filters({
    onSubmit,
}: {
    onSubmit: Dispatch<SetStateAction<{ employment: string; experience: string }>>;
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
            initialValues={{ employment: '', experience: '' }}
            onSubmit={(data: FilterData) => onSubmit({ employment: data.employment, experience: data.experience })}
            validationSchema={yup.object().shape(validationSchema)}
            isFilters
            resetText="Clear filters"
            Icon={CloseIcon}
        >
            <FilterFields />
        </Form>
    );
}
