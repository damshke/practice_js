import { colors, scale, typography } from '@scripts/gds';

export default function Footer() {
    return (
        <footer
            css={{
                display: 'flex',
                width: scale(180),
                backgroundColor: colors.grey900,
                color: colors.white,
            }}
        >
            <span
                css={{
                    color: colors.white,
                    ...typography('lMedium'),
                }}
            >
                +7 499 391-66-69
            </span>
        </footer>
    );
}
