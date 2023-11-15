import Header from '@components/Header';
import Footer from '@components/Footer';
import FeedbackForm from '@views/FeedbackForm';
z;

export default function Home() {
    return (
        <>
            <main>
                <Header />
                <FeedbackForm />
                <Footer />
            </main>
        </>
    );
}
