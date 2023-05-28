// form helpers imports
import { useField } from 'formik';

// styles imports
import './formField.scss';

/**
 * This is a component for rendering a form field with a label and error message.
 * Warning: only to be used inside a Formik component form.
 * @param {string} label - The label for the form field.
 * @param {string} props - The props for the form field.
 * @returns The `FormField` component.
 */
function FormField({ label, className, ...props }) {
  const [field, meta] = useField(props);

  return (
    <div className={className ? 'formfield form__pizza-input' : 'formfield'}>
      <label htmlFor={label} className="label formfield__label">
        {label}
      </label>
      <input
        {...props}
        {...field}
        id={label}
        className={
          meta.touched && meta.error
            ? 'formfield__input--error formfield__input'
            : 'formfield__input'
        }
      />
      {meta.touched && meta.error ? (
        <div className="formfield__error-message">{meta.error}</div>
      ) : null}
    </div>
  );
}

export default FormField;
