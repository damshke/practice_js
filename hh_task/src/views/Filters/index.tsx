import Form from '@components/controls/Form';
import { scale } from '@scripts/gds';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { FilterFields } from './components';
import { FormInputs } from './types';

const validationSchema = {
    employment: yup.string(),
    experience: yup.string(),
};

export default function Filters({ handleClearFilters }: { handleClearFilters: () => void }) {
    const handleSearch = () => {
        console.log('ok');
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormInputs>();

    return (
        <div
            css={{
                padding: `${scale(0)}px ${scale(15)}px ${scale(6)}px`,
            }}
        >
            <Form
                initialValues={{ employment: '', experience: '' }}
                onSubmit={handleSearch}
                handleSubmit={handleSubmit}
                register={register}
                validationSchema={yup.object().shape(validationSchema)}
            >
                <FilterFields onClear={handleClearFilters} onSubmit={handleSearch} errors={errors} />
            </Form>
        </div>
    );
}
