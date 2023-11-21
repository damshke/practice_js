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
                <Layout type="flex" justify="space-between" align="center">
                    <Layout.Item
                        css={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: scale(1),
                            ...typography('lMedium'),
                        }}
                    >
                        <a href="tel:+7 499 391-66-69" css={{ color: colors.white, textDecoration: 'none' }}>
                            +7 499 391-66-69
                        </a>
                        <a href="mailto:mail@greensight.ru" css={{ color: colors.white, textDecoration: 'none' }}>
                            mail@greensight.ru
                        </a>
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
