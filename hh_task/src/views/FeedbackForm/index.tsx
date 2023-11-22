import Button from '@components/controls/Button';
import Form from '@components/controls/Form';
import { typography, scale, colors } from '@scripts/gds';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';
import { PHONE_REGEX } from '../../helpers/regex';

type FormData = {
    initials: string;
    phone: string;
    email: string;
    comment: string;
};

const validationSchema = Yup.object().shape({
    initials: Yup.string().required('Введите имя!').min(3, 'Min length is 3').max(30, 'Max length is 30'),
    email: Yup.string().required('Введите email!').email('Invalid email!'),
    phone: Yup.string()
        .required('Без телефона работодатель не сможет позвонить :(')
        .matches(PHONE_REGEX, 'Invalid phone!'),
    comment: Yup.string(),
});

export default function FeedbackForm() {
    const {
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit: SubmitHandler<FormData> = (data: FormData) => {
        console.log(data);
    };

    return (
        <div css={{ padding: `${scale(8)}px ${scale(15)}px ${scale(11)}px` }}>
            <h2 css={{ ...typography('h2'), textAlign: 'center' }}>Leave a request</h2>
            <p css={{ ...typography('l'), textAlign: 'center', marginBottom: scale(5) }}>
                We will advise you and help you start a new project
            </p>
            <Form
                initialValues={{ initials: '', phone: '', email: '', comment: '' }}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                <div
                    css={{
                        rowGap: scale(4),
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        maxWidth: scale(75),
                        margin: 'auto auto',
                        alignItems: 'center',
                    }}
                >
                    <Form.Field name="initials" label="Your name" placeholder="Please introduce yourself" />
                    <Form.Field name="email" label="Email" placeholder="ivanov@gmail.com" />
                    <Form.Field name="phone" label="Phone number" placeholder="+7 (999) 000 00 00" />
                    <Form.Field name="comment" label="Comment" placeholder="Message text" textArea />
                    <Button
                        block
                        variant="primary"
                        type="submit"
                        size="md"
                        css={{ width: `${scale(48) + 2}px`, marginBottom: scale(2) }}
                    >
                        Send
                    </Button>
                </div>
                <div
                    css={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        ...typography('m'),
                    }}
                >
                    <span>By clicking "Send" you confirm your consent to the</span>
                    <span>
                        <a href="#" css={{ color: colors.blue }}>
                            processing of personal data
                        </a>
                    </span>
                </div>
            </Form>
        </div>
    );
}
