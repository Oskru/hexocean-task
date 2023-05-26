import './dishForm.scss';

// form helpers imports
import { useFormik } from 'formik';
import { dishSchema } from '../../schemas/dish_schema';

function DishForm() {
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues: {
      name: '',
      preparation_time: '',
      type: '',
      no_of_slices: '',
      diameter: '',
      spiciness_scale: '',
      slices_of_bread: '',
    },
    validationSchema: dishSchema,
    onSubmit: async (values, actions) => {
      // alert(JSON.stringify(values, null, 2));
      await new Promise((r) => setTimeout(r, 1000));
      actions.resetForm();
    },
  });
  console.log('Render: DishForm');
  console.log('DishForm errors: ', errors);
  console.log('DishForm values: ', values);
  return (
    <>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <label htmlFor="name">name</label>
        <input
          name="name"
          type="text"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.name && touched.name ? 'input-error' : null}
        />
        {errors.name && touched.name && (
          <p className="error-message">name is required</p>
        )}

        <label htmlFor="preparation_time">preparation_time</label>
        <input
          name="preparation_time"
          type="text"
          value={values.preparation_time}
          onChange={handleChange}
          onBlur={handleBlur}
          className={
            errors.preparation_time && touched.preparation_time
              ? 'input-error'
              : null
          }
        />
        {errors.preparation_time && touched.preparation_time && (
          <p className="error-message">preparation time is required</p>
        )}

        <label htmlFor="type">type</label>
        {/* TODO: Fix: Warning: An unhandled error was caught during validation in <Formik validationSchema /> TypeError: branch is not a function */}
        <select
          name="type"
          value={values.type}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.type && touched.type ? 'input-error' : null}
        >
          <option value="">choose_type</option>
          <option value="pizza">pizza</option>
          <option value="soup">soup</option>
          <option value="sandwich">sandwich</option>
        </select>
        {errors.type && touched.type && (
          <p className="error-message">type is required</p>
        )}

        {/* CONDITIONAL INPUTS */}

        {/* type === 'pizza' */}
        {values.type === 'pizza' && (
          <>
            <label htmlFor="no_of_slices">no_of_slices</label>
            <input
              name="no_of_slices"
              type="number"
              value={values.no_of_slices || 1}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.no_of_slices && touched.no_of_slices
                  ? 'input-error'
                  : null
              }
            />
            {errors.no_of_slices && touched.no_of_slices && (
              <p className="error-message">number of slices is required</p>
            )}

            <label htmlFor="diameter">diameter</label>
            <input
              name="diameter"
              type="number"
              value={values.diameter}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.diameter && touched.diameter ? 'input-error' : null
              }
            />
            {errors.diameter && touched.diameter && (
              <p className="error-message">diameter is required</p>
            )}
          </>
        )}

        {/* type === 'soup' */}
        {values.type === 'soup' && (
          <>
            <label htmlFor="spiciness_scale">spiciness_scale</label>
            <input
              name="spiciness_scale"
              type="number"
              value={values.spiciness_scale}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.spiciness_scale && touched.spiciness_scale
                  ? 'input-error'
                  : null
              }
            />
            {errors.spiciness_scale && touched.spiciness_scale && (
              <p className="error-message">spiciness scale is required</p>
            )}
          </>
        )}

        {/* type === 'sandwich' */}
        {values.type === 'sandwich' && (
          <>
            <label htmlFor="slices_of_bread">slices_of_bread</label>
            <input
              name="slices_of_bread"
              type="number"
              value={values.slices_of_bread}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.slices_of_bread && touched.slices_of_bread
                  ? 'input-error'
                  : null
              }
            />
            {errors.slices_of_bread && touched.slices_of_bread && (
              <p className="error-message">slices of bread is required</p>
            )}
          </>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={
            isSubmitting
              ? 'submit-button submit-button--submitting'
              : 'submit-button'
          }
        >
          Submit
        </button>
      </form>
    </>
  );
}

export default DishForm;
