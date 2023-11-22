import Form from '@components/controls/Form';
import { MEDIA_QUERIES, scale } from '@scripts/gds';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { FilterFields } from './components';
import { FormInputs } from './types';

const validationSchema = {
    employment: yup.string(),
    experience: yup.string(),
};

export default function Filters({ handleClearFilters }: { handleClearFilters: () => void }) {
    // переести в контейнер
    const onSubmit = (data: FormInputs) => console.log(data);

    const {
        formState: { errors },
    } = useForm<FormInputs>();

    return (
        <Form
            initialValues={{ employment: '', experience: '' }}
            onSubmit={onSubmit}
            validationSchema={yup.object().shape(validationSchema)}
        >
            <FilterFields errors={errors} />
        </Form>
    );
}
