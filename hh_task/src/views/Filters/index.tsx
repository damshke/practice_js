import { getVacancies } from '@api/vacancies';
import Form from '@components/controls/Form';
import { MEDIA_QUERIES, scale } from '@scripts/gds';
import * as yup from 'yup';
import CloseIcon from '../../icons/16/close.svg';
import { FilterFields } from './components';
import { FormInputs } from './types';

const validationSchema = {
    employment: yup.string(),
    experience: yup.string(),
};

export default function Filters({ onSubmit }) {
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
                    maxWidth: '100%',
                },
            }}
            initialValues={{ employment: '', experience: '' }}
            onSubmit={onSubmit}
            validationSchema={yup.object().shape(validationSchema)}
            isFilters
            resetText="Clear filters"
            Icon={CloseIcon}
        >
            <FilterFields />
        </Form>
    );
}
