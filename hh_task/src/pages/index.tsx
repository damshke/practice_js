/* eslint-disable react/no-children-prop */
import Head from 'next/head';
import Button from '@components/controls/Button';

export default function Home() {
    return (
        <>
            <Head children={undefined} />
            <Button variant="primary" size="xs">
                Я новая кнопка
            </Button>
            <main />
        </>
    );
}
