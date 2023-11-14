import { Container, Layout, MEDIA_QUERIES, colors, scale, typography } from '@scripts/gds';

export default function Footer() {
    return (
        <footer
            css={{
                minwWidth: '100%',
                backgroundColor: colors.grey900,
                color: colors.white,
                padding: `${scale(5)}px ${scale(15)}px`,
                [MEDIA_QUERIES.sm]: {
                    padding: `${scale(4)}px ${scale(2)}px`,
                },
            }}
        >
            <Container>
                <Layout type="flex" justify="space-between">
                    <Layout.Item css={typography('lMedium')}>
                        <p>+7 499 391-66-69</p>
                        <p>mail@greensight.ru</p>
                    </Layout.Item>
                    <Layout.Item css={typography('m')}>
                        <p>322A, 2nd Floor, Zelenograd, Moscow, Russia</p>
                        <p>Directions</p>
                    </Layout.Item>
                </Layout>
            </Container>
        </footer>
    );
}
