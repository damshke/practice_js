import { colors, Layout, MEDIA_QUERIES, scale, shadows, typography } from '@scripts/gds';
import Button from '@components/controls/Button';
import { Item } from '../types';
import ArrowDown from '../../../icons/16/chevronDown.svg';

export default function Card({ vacancy }: { vacancy: Item }) {
    return (
        <Layout
            cols={1}
            css={{
                borderRadius: scale(2),
                padding: `${scale(5)}px ${scale(5)}px ${scale(6)}px ${scale(5)}px`,
                boxShadow: shadows.boxLight,
            }}
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
                <dl>
                    <dt css={{ color: colors.grey700, ...typography('m') }}>Form </dt>
                    <dd css={{ color: colors.black, ...typography('mMedium') }}>{vacancy.employment.name}</dd>
                    <dt css={{ color: colors.grey700, ...typography('m') }}>Company</dt>
                    <dd css={{ color: colors.black, ...typography('mMedium') }}>{vacancy.employer.name}</dd>
                    <dt css={{ color: colors.grey700, ...typography('m') }}>Experience </dt>
                    <dd css={{ color: colors.black, ...typography('mMedium') }}>{vacancy.experience.name}</dd>
                    <dt css={{ color: colors.grey700, ...typography('m') }}>Address</dt>
                    <dd css={{ color: colors.black, ...typography('mMedium') }}>address</dd>
                    <dt css={{ color: colors.grey700, ...typography('m') }}>Salary </dt>
                    <dd css={{ color: colors.black, ...typography('mMedium') }}>salary</dd>
                </dl>
            </Layout.Item>
            <Layout.Item type="flex" css={{ ...typography('m') }}>
                description
            </Layout.Item>
            <Layout.Item>
                {/* поменять размер кнопки */}
                <Button variant="link" size="md" Icon={ArrowDown}>
                    More details
                </Button>
            </Layout.Item>
        </Layout>
    );
}
