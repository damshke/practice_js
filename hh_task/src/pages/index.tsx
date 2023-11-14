/* eslint-disable react/no-children-prop */
import { Select } from '@components/controls/Select';
import Head from 'next/head';
import ArrowDown from '../icons/16/chevronDown.svg';

export default function Home() {
    return (
        <>
            <Head children={undefined} />
            <main />
        </>
    );
}
