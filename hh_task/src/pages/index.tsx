import { Input } from '@components/controls/Input';
import { Select } from '@components/controls/Select';
import Footer from '@components/Footer';
import Header from '@components/Header';
import FeedbackForm from '@views/FeedbackForm';
import Filters from '@views/Filters';
import Head from 'next/head';

export default function Home() {
    return (
        <>
            <Header />
            <Filters />
            <Footer />
        </>
    );
}
