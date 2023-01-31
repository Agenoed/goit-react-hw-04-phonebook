import { PropTypes } from 'prop-types';
import css from './Filter.module.css';

export default function Filter({ data, handleChange }) {
  return (
    <label className={css.filterLabel} htmlFor="filter">
      Find contacts by name
      <input
        className={css.filterName}
        type="text"
        name="filter"
        value={data}
        onChange={handleChange}
        placeholder="Write name for search"
      />
    </label>
  );
}

Filter.propTypes = {
  data: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};
