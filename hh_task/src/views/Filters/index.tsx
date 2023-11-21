import Form from '@components/controls/Form';
import { scale } from '@scripts/gds';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { FilterFields } from './components';

const validationSchema = {
    form: yup.string(),
    experience: yup.string(),
};

export default function Filters({ handleClearFilters }: { handleClearFilters: () => void }) {
    const { control } = useForm();
    const handleSearch = values => {
        console.log('Performing search with values:', values);
    };
    return (
        <div
            css={{
                padding: `${scale(0)}px ${scale(15)}px ${scale(6)}px`,
            }}
        >
            <Form
                initialValues={{ form: '', experience: '' }}
                onSubmit={handleSearch}
                validationSchema={yup.object().shape(validationSchema)}
            >
                <FilterFields onClear={handleClearFilters} control={control} onSubmit={handleSearch} />
            </Form>
        </div>
    );
}
