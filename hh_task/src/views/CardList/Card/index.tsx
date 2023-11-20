import { colors, Layout, MEDIA_QUERIES, scale, shadows, typography } from '@scripts/gds';
import Button from '@components/controls/Button';
import { useEffect, useState } from 'react';
import { Item } from '../types';
import ArrowDown from '../../../icons/16/chevronDown.svg';
import ArrowUp from '../../../icons/16/chevronUp.svg';

export default function Card({ vacancy }: { vacancy: Item }) {
    const [description, setDescription] = useState('');
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
        if (vacancy.employer && vacancy.employer.logo_urls) vacancy.employer.logo_urls.original;
        return '';
    };

    useEffect(() => {
        fetch(vacancy.url)
            .then(res => res.json())
            .then(data => setDescription(data.description));
    }, [vacancy.url]);

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
                css={{
                    display: 'flex',
                    flexDirection: 'rows',
                    gap: scale(3),
                    justifyContent: 'space-between',
                    alignItems: 'center',
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
                {logo(vacancy) !== '' && (
                    <img
                        css={{
                            marginRight: '50%',
                            height: '100%',
                            maxWidth: scale(20),
                            [MEDIA_QUERIES.sm]: {
                                height: scale(7),
                                marginTop: scale(3),
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
                <Button size="md" variant="secondary">
                    Respond
                </Button>
            </Layout.Item>
            <Layout.Item
                cols={5}
                css={{
                    display: 'flex',
                    flexDirection: 'rows',
                    gap: scale(6),
                }}
            >
                <dl
                    css={{
                        display: 'flex',
                        flexDirection: 'rows',
                        gap: scale(1),
                    }}
                >
                    <dt css={{ color: colors.grey700, ...typography('m') }}>Form </dt>
                    <dd css={{ color: colors.black, ...typography('mMedium') }}>{vacancy.employment.name}</dd>
                </dl>
                <dl
                    css={{
                        display: 'flex',
                        flexDirection: 'rows',
                        gap: scale(1),
                    }}
                >
                    <dt css={{ color: colors.grey700, ...typography('m') }}>Company</dt>
                    <dd css={{ color: colors.black, ...typography('mMedium') }}>{vacancy.employer.name}</dd>
                </dl>
                <dl
                    css={{
                        display: 'flex',
                        flexDirection: 'rows',
                        gap: scale(1),
                    }}
                >
                    <dt css={{ color: colors.grey700, ...typography('m') }}>Experience </dt>
                    <dd css={{ color: colors.black, ...typography('mMedium') }}>{vacancy.experience.name}</dd>
                </dl>
                <dl
                    css={{
                        display: 'flex',
                        flexDirection: 'rows',
                        gap: scale(1),
                    }}
                >
                    <dt css={{ color: colors.grey700, ...typography('m') }}>Address</dt>
                    <dd css={{ color: colors.black, ...typography('mMedium') }}>{address(vacancy)}</dd>
                </dl>
                <dl
                    css={{
                        display: 'flex',
                        flexDirection: 'rows',
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
                    <div
                        css={{
                            height: expandedDescription ? 'fit-content' : '200px',
                            overflow: expandedDescription ? 'visible' : 'hidden',
                        }}
                        dangerouslySetInnerHTML={{ __html: description }}
                    />
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
