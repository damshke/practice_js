import { MEDIA_QUERIES, colors, scale } from '@scripts/gds';
import Footer from '@components/Footer';

export default function FooterContainer() {
    return (
        <footer
            css={{
                backgroundColor: colors.grey900,
                color: colors.white,
                padding: `${scale(5)}px ${scale(15)}px`,
                [MEDIA_QUERIES.sm]: {
                    padding: `${scale(4)}px ${scale(2)}px`,
                },
            }}
        >
            <Footer />
        </footer>
    );
}
