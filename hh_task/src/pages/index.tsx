/* eslint-disable react/no-children-prop */
import Head from 'next/head';
import Footer from '@components/Footer';
import Header from '@components/Header';

export default function Home() {
    return (
        <>
            <Head children={undefined} />
            <Header></Header>
            <Footer></Footer>
            <main />
        </>
    );
}
