import Button from '@components/controls/Button';
import Form from '@components/controls/Form';
import * as Yup from 'yup';
import { PHONE_REGEX } from '../../helpers/regex';

export default function FeedbackForm() {
    const validationSchema = Yup.object({
        initials: Yup.string().required('Введите имя!').min(3, 'Min lenght is 3').max(30, 'Max lenght is 30'),
        email: Yup.string().required('Введите email!').email('Invalid email!'),
        phone: Yup.string()
            .required('Без телефона работодатель не сможет позвонить :(')
            .matches(PHONE_REGEX, 'Invalid phone!'),
        comment: Yup.string(),
    });

    return (
        <Form
            initialValues={{ initials: '', phone: '', email: '', comment: '' }}
            onSubmit={values => {
                // eslint-disable-next-line no-alert
                alert(
                    `Name: ${values.initials} \nPhone: ${values.phone} \nEmail: ${values.email} \nComment: ${values.comment}`
                );
            }}
            validationSchema={validationSchema}
        >
            <Form.Field name="initials" label="Your name" placeholder="Please introduce yourself" />
            <Form.Field name="email" label="Your name" placeholder="Please introduce yourself" />
            <Form.Field name="phone" label="Your name" placeholder="Please introduce yourself" />
            <Form.Field name="comment" label="Your name" placeholder="Please introduce yourself" textArea />
            <Button variant="primary" size="md">
                Send
            </Button>
        </Form>
    );
}
