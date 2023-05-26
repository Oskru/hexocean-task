import { useField } from 'formik';

/**
 * This is a component for rendering a form field with a label and error message.
 * Warning: only to be used inside a Formik component form.
 * @param {string} label - The label for the form field.
 * @param {string} props - The props for the form field.
 * @returns The `FormField` component.
 */
function FormField({ label, ...props }) {
  const [field, meta] = useField(props);

  return (
    <>
      <label htmlFor={label}>{label}</label>
      <input
        {...props}
        {...field}
        className={meta.touched && meta.error ? 'input-error' : null}
      />
      {meta.touched && meta.error ? (
        <div className="error-message">{meta.error}</div>
      ) : null}
    </>
  );
}

export default FormField;
