import { scale } from '@scripts/gds';
import { SelectionFields } from './SelectionFields';

const Filters = () => (
    <div
        css={{
            padding: `${scale(0)}px ${scale(15)}px ${scale(6)}px`,
        }}
    >
        <SelectionFields />
    </div>
);

export default Filters;
