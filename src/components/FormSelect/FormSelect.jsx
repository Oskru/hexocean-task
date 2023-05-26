import { useField } from 'formik';

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
    <>
      <label htmlFor={label}>{label}</label>
      <select
        {...props}
        {...field}
        className={meta.touched && meta.error ? 'input-error' : null}
      >
        <option value="" disabled hidden></option>
        {options.map((option) => (
          <option key={option.label} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {meta.touched && meta.error ? (
        <div className="error-message">{meta.error}</div>
      ) : null}
    </>
  );
}

export default FormSelect;
