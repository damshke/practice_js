import { colors, Container, Layout, MEDIA_QUERIES, scale, typography } from '@scripts/gds';
import Button from '@components/controls/Button';
import { Item } from '../types';

export default function Card({ vacancy }: { vacancy: Item }) {
    return (
        <Container>
            <Layout
                cols={1}
                css={{ borderRadius: scale(2), padding: `${scale(5)}px ${scale(5)}px ${scale(6)}px ${scale(5)}px` }}
                gap={scale(4)}
            >
                <Layout.Item
                    cols={2}
                    type="flex"
                    css={{
                        flexDirection: 'column',
                        gap: scale(3),
                        justifyContent: 'space-between',
                    }}
                >
                    <h4
                        css={{
                            ...typography('h4'),
                            [MEDIA_QUERIES.sm]: {
                                maxWidth: '100%',
                            },
                        }}
                    >
                        {vacancy.name}
                    </h4>
                    {/* <img></img> */}
                    <Button size="md" variant="secondary">
                        Respond
                    </Button>
                </Layout.Item>
                <Layout.Item
                    cols={5}
                    type="flex"
                    css={{
                        gap: scale(6),
                    }}
                >
                    <p css={{ color: colors.grey700, ...typography('m') }}>
                        Form
                        <span css={{ color: colors.black, ...typography('mMedium') }}>{vacancy.employment.name}</span>
                    </p>
                    <p css={{ color: colors.grey700, ...typography('m') }}>
                        Company
                        <span css={{ color: colors.black, ...typography('mMedium') }}>{vacancy.employer.name}</span>
                    </p>
                    <p css={{ color: colors.grey700, ...typography('m') }}>
                        Experience
                        <span css={{ color: colors.black, ...typography('mMedium') }}>{vacancy.experience.name}</span>
                    </p>
                    <p css={{ color: colors.grey700, ...typography('m') }}>
                        Address
                        <span css={{ color: colors.black, ...typography('mMedium') }}>address</span>
                    </p>
                    <p css={{ color: colors.grey700, ...typography('m') }}>
                        Salary
                        <span css={{ color: colors.black, ...typography('mMedium') }}>salary</span>
                    </p>
                </Layout.Item>
                <Layout.Item type="flex" css={{ ...typography('m') }}>
                    description
                </Layout.Item>
                <Layout.Item>
                    {/* поменять размер кнопки */}
                    <Button variant="link" size="md">
                        More details
                    </Button>
                </Layout.Item>
            </Layout>
        </Container>
    );
}
