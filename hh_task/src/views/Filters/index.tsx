import Form from '@components/controls/Form';
import { scale } from '@scripts/gds';
import * as yup from 'yup';
import { FilterFields } from './components';

const validationSchema = {
    employment: yup.string(),
    experience: yup.string(),
};

export default function Filters({ handleClearFilters }: { handleClearFilters: () => void }) {
    const handleSearch = () => {
        console.log('ok');
    };

    return (
        <div
            css={{
                padding: `${scale(0)}px ${scale(15)}px ${scale(6)}px`,
            }}
        >
            <Form
                initialValues={{ employment: '', experience: '' }}
                onSubmit={handleSearch}
                validationSchema={yup.object().shape(validationSchema)}
            >
                <FilterFields onClear={handleClearFilters} onSubmit={handleSearch} />
            </Form>
        </div>
    );
}
