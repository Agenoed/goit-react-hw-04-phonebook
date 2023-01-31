import { PropTypes } from 'prop-types';
import css from './ContactListItem.module.css';

export default function ContactListItem({ id, name, number, handleDelete }) {
  return (
    <li className={css.contactListItem}>
      {name}: {number}
      <button
        className={css.contactListDeleteBtn}
        type="button"
        onClick={() => handleDelete(id)}
      >
        Delete
      </button>
    </li>
  );
}

ContactListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired,
};
