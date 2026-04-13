import PropTypes from 'prop-types';

export default function DateRangePicker({ startDate, endDate, onDateChange }) {
    return (
        <div className="date-range-picker">
            <label htmlFor="start-date">
                <span>De:</span>{' '}
                <input
                    id="start-date"
                    type="date"
                    value={startDate ?? ''}
                    onChange={(e) => onDateChange(e.target.value, endDate)}
                />
            </label>
            <label htmlFor="end-date">
                <span>Até:</span>{' '}
                <input
                    id="end-date"
                    type="date"
                    value={endDate ?? ''}
                    onChange={(e) => onDateChange(startDate, e.target.value)}
                />
            </label>
        </div>
    );
}

DateRangePicker.propTypes = {
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    onDateChange: PropTypes.func.isRequired,
};
