import PropTypes from 'prop-types';
import { Label } from './ui/label';
import { Input } from './ui/input';

export default function DateRangePicker({ startDate, endDate, onDateChange }) {
    return (
        <div className="flex flex-wrap gap-4">
            <div className="flex flex-col gap-1.5">
                <Label htmlFor="start-date">De</Label>
                <Input
                    id="start-date"
                    type="date"
                    value={startDate ?? ''}
                    onChange={(e) => onDateChange(e.target.value, endDate)}
                    className="w-auto"
                />
            </div>
            <div className="flex flex-col gap-1.5">
                <Label htmlFor="end-date">Até</Label>
                <Input
                    id="end-date"
                    type="date"
                    value={endDate ?? ''}
                    onChange={(e) => onDateChange(startDate, e.target.value)}
                    className="w-auto"
                />
            </div>
        </div>
    );
}

DateRangePicker.propTypes = {
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    onDateChange: PropTypes.func.isRequired,
}
