import { colors, Layout, MEDIA_QUERIES, scale, shadows, typography } from '@scripts/gds';
import Button from '@components/controls/Button';
import { useState } from 'react';
import { useDescription } from '@api/vacancies';
import { Item } from '../../../scripts/types';
import ArrowDown from '../../icons/16/chevronDown.svg';
import ArrowUp from '../../icons/16/chevronUp.svg';

function Description({ vacancy, expandedDescription }: { vacancy: Item; expandedDescription: boolean }) {
    const { isLoading, isError, error, data } = useDescription(vacancy.id);

    if (isLoading) {
        return <span>Loading...</span>;
    }

    if (isError) {
        return <span>Error: {error.message}</span>;
    }

    return (
        <div>
            <div
                css={{
                    height: expandedDescription ? 'fit-content' : '200px',
                    overflow: expandedDescription ? 'visible' : 'hidden',
                    ...typography('m'),
                }}
                dangerouslySetInnerHTML={{ __html: data.description }}
            />
        </div>
    );
}

export default function Card({ vacancy }: { vacancy: Item }) {
    const [expandedDescription, setExpandedDescription] = useState(false);

    const address = (vacancy: Item) => (vacancy.address ? vacancy.address.raw : vacancy.area ? vacancy.area.name : '');

    const salary = (vacancy: Item) => {
        const { salary } = vacancy;

        if (!salary) return '';

        const { from, to, currency } = salary;
        const parts: string[] = [];

        if (from) parts.push(`from ${from}`);

        if (to) parts.push(`to ${to}`);

        if (currency) parts.push(currency);

        return parts.join(' ');
    };

    const logo = (vacancy: Item) => {
        if (vacancy.employer && vacancy.employer.logo_urls) {
            return vacancy.employer.logo_urls.original;
        }
        return '';
    };

    return (
        <Layout
            cols={1}
            css={{
                borderRadius: scale(2),
                padding: `${scale(5)}px ${scale(5)}px ${scale(6)}px ${scale(5)}px`,
                boxShadow: shadows.boxLight,
                [MEDIA_QUERIES.md]: {
                    padding: `${scale(5, true)}px`,
                },
            }}
        >
            <Layout.Item
                cols={2}
                css={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: scale(3),
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    [MEDIA_QUERIES.md]: {
                        flexDirection: 'column',
                    },
                }}
            >
                <div
                    css={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: scale(3, true),
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        [MEDIA_QUERIES.md]: {
                            flexDirection: 'column',
                        },
                    }}
                >
                    <h4
                        css={{
                            ...typography('h4'),
                            [MEDIA_QUERIES.md]: {
                                maxWidth: '100%',
                            },
                        }}
                    >
                        {vacancy.name}
                    </h4>
                    {logo(vacancy) !== '' && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            css={{
                                height: '100%',
                                maxWidth: scale(20),
                                [MEDIA_QUERIES.md]: {
                                    marginLeft: '0',
                                    marginRight: '0',
                                    order: -1,
                                },
                                [MEDIA_QUERIES.xs]: {
                                    height: scale(5),
                                    width: 'auto',
                                },
                            }}
                            src={logo(vacancy)}
                            alt={vacancy.name}
                        />
                    )}
                </div>
                <Button
                    size="md"
                    variant="secondary"
                    css={{
                        [MEDIA_QUERIES.md]: {
                            width: '100%',
                        },
                    }}
                >
                    <a href={vacancy.alternate_url}>Respond</a>
                </Button>
            </Layout.Item>
            <Layout.Item
                cols={5}
                css={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: scale(6),
                    flexWrap: 'wrap',
                    [MEDIA_QUERIES.sm]: {
                        width: '100%',
                        gap: scale(1),
                    },
                }}
            >
                <dl
                    css={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: scale(1),
                    }}
                >
                    <dt css={{ color: colors.grey700, ...typography('m') }}>Form </dt>
                    <dd css={{ color: colors.black, ...typography('mMedium') }}>{vacancy.employment.name}</dd>
                </dl>
                <dl
                    css={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: scale(1),
                    }}
                >
                    <dt css={{ color: colors.grey700, ...typography('m') }}>Company</dt>
                    <dd css={{ color: colors.black, ...typography('mMedium') }}>{vacancy.employer.name}</dd>
                </dl>
                <dl
                    css={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: scale(1),
                    }}
                >
                    <dt css={{ color: colors.grey700, ...typography('m') }}>Experience </dt>
                    <dd css={{ color: colors.black, ...typography('mMedium') }}>{vacancy.experience.name}</dd>
                </dl>
                <dl
                    css={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: scale(1),
                    }}
                >
                    <dt css={{ color: colors.grey700, ...typography('m') }}>Address</dt>
                    <dd css={{ color: colors.black, ...typography('mMedium') }}>{address(vacancy)}</dd>
                </dl>
                <dl
                    css={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: scale(1),
                    }}
                >
                    <dt css={{ color: colors.grey700, ...typography('m') }}>Salary </dt>
                    <dd css={{ color: colors.black, ...typography('mMedium') }}>{salary(vacancy)}</dd>
                </dl>
            </Layout.Item>
            <Layout.Item css={{ position: 'relative' }}>
                <div
                    css={{
                        ':after': {
                            content: '""',
                            display: expandedDescription ? 'none' : 'block',
                            position: 'absolute',
                            backgroundImage:
                                'linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.8), rgb(255, 255, 255))',
                            bottom: '0',
                            height: '100px',
                            width: '100%',
                        },
                    }}
                >
                    <Description vacancy={vacancy} expandedDescription={expandedDescription} />
                </div>
            </Layout.Item>
            <Layout.Item>
                <Button
                    variant="link"
                    size="md"
                    Icon={expandedDescription ? ArrowUp : ArrowDown}
                    onClick={() => setExpandedDescription(prevState => !prevState)}
                >
                    {expandedDescription ? 'Less details' : 'More details'}
                </Button>
            </Layout.Item>
        </Layout>
    );
}
