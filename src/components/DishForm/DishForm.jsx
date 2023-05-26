// styles imports
import './dishForm.scss';

// form helpers imports
import { Formik, Form } from 'formik';
import { dishSchema } from '../../schemas/dish_schema';

// components imports
import FormField from '../FormField/FormField';
import FormSelect from '../FormSelect/FormSelect';

function DishForm() {
  console.log('Render: DishForm');

  const initialValues = {
    name: '',
    preparation_time: '',
    type: '',
    no_of_slices: '',
    diameter: '',
    spiciness_scale: '',
    slices_of_bread: '',
  };

  const handleSubmit = async (values, actions) => {
    await new Promise((r) => setTimeout(r, 1000));
    alert(JSON.stringify(values, null, 2));
    // actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={dishSchema}
      onSubmit={handleSubmit}
    >
      {({ values, isSubmitting }) => (
        <Form autoComplete="off">
          <FormField
            label="name"
            name="name"
            type="text"
            placeholder="enter name"
          />

          <FormField
            label="preparation_time"
            name="preparation_time"
            placeholder="00:00:00"
          />

          <FormSelect
            label="type"
            name="type"
            options={[
              { value: 'pizza', label: 'pizza' },
              { value: 'soup', label: 'soup' },
              { value: 'sandwich', label: 'sandwich' },
            ]}
          />

          {/* CONDITIONAL INPUTS */}
          {values.type === 'pizza' && (
            <>
              <FormField
                label="no_of_slices"
                name="no_of_slices"
                type="number"
                placeholder="enter no_of_slices"
              />

              <FormField
                label="diameter"
                name="diameter"
                type="number"
                placeholder="in cm"
              />
            </>
          )}

          {values.type === 'soup' && (
            <>
              <FormField
                label="spiciness_scale"
                name="spiciness_scale"
                type="number"
                placeholder="enter spiciness_scale"
              />
            </>
          )}

          {values.type === 'sandwich' && (
            <>
              <FormField
                label="slices_of_bread"
                name="slices_of_bread"
                type="number"
                placeholder="enter slices_of_bread"
              />
            </>
          )}

          <button
            type="submit"
            className={
              isSubmitting
                ? 'submit-button submit-button--submitting'
                : 'submit-button'
            }
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default DishForm;
