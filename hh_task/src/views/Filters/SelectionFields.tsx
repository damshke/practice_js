import Button from '@components/controls/Button';
import { Select } from '@components/controls/Select';
import { scale } from '@scripts/gds';
import CloseIcon from '../../icons/16/close.svg';
import ArrowDown from '../../icons/16/chevronDown.svg';

export const SelectionFields = () => (
    <div
        css={{
            display: 'flex',
            flexDirection: 'column',
            gap: scale(2),
        }}
    >
        <div
            css={{
                display: 'flex',
                maxWidth: '80%',
                gap: scale(2),
            }}
        >
            <Select Icon={ArrowDown} label="Experience" />

            <Select Icon={ArrowDown} label="Тест" />

            <Button variant="primary" size="sm">
                Search
            </Button>
        </div>
        <Button variant="link" hidden Icon={CloseIcon} block>
            Clear filters
        </Button>
    </div>
);
