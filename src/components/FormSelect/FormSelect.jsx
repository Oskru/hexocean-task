// form helpers imports
import { useField } from 'formik';

// styles imports
import './formSelect.scss';

/**
 * This is a component for rendering a select input field with label and options.
 * Warning: only to be used inside a Formik component form.
 * @param {string} label - The label for the select input field.
 * @param {array} options - An array of objects with `value` and `label` properties.
 * @param {string} props - The props for the select input field.
 * @returns The `FormField` component.
 */
function FormSelect({ label, options, ...props }) {
  const [field, meta] = useField(props);

  return (
    <div className="formselect">
      <label htmlFor={label} className="label formselect__label">
        {label}
      </label>
      <select
        {...props}
        {...field}
        id={label}
        className={
          meta.touched && meta.error
            ? 'formselect__select formselect__select--error'
            : 'formselect__select'
        }
      >
        <option value="" disabled hidden></option>
        {options.map((option) => (
          <option
            key={option.label}
            value={option.value}
            className="formselect__option"
          >
            {option.label}
          </option>
        ))}
      </select>
      {meta.touched && meta.error ? (
        <div className="formselect__error-message">{meta.error}</div>
      ) : null}
    </div>
  );
}

export default FormSelect;
