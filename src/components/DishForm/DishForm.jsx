import React from 'react';

// styles imports
import './dishForm.scss';

// form helpers imports
import { Formik, Form } from 'formik';
import { dishSchema } from '../../schemas/dish_schema';

// components imports
import FormField from '../FormField/FormField';
import FormSelect from '../FormSelect/FormSelect';

function DishForm() {
  const [fetchData, setFetchData] = React.useState({
    ok: null,
    error: '',
  });

  const initialValues = {
    name: '',
    preparation_time: '',
    type: '',
    no_of_slices: '',
    diameter: '',
    spiciness_scale: '',
    slices_of_bread: '',
  };

  const resetFetchData = () => {
    setFetchData({
      ok: null,
      error: '',
    });
  };

  const handleSubmit = async (values, actions) => {
    switch (values.type) {
      case 'pizza':
        delete values.spiciness_scale;
        delete values.slices_of_bread;
        break;
      case 'soup':
        delete values.no_of_slices;
        delete values.diameter;
        delete values.slices_of_bread;
        break;
      case 'sandwich':
        delete values.no_of_slices;
        delete values.diameter;
        delete values.spiciness_scale;
        break;
    }

    try {
      resetFetchData();

      const response = await fetch(
        'https://umzzcc503l.execute-api.us-west-2.amazonaws.com/dishes',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        },
      );

      setFetchData(
        response.ok
          ? { ok: true, error: '' }
          : { ok: false, error: await response.json() },
      );
    } catch (error) {
      setFetchData({
        ok: false,
        error: error.message,
      });
    }
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={dishSchema}
      onSubmit={handleSubmit}
    >
      {({ values, isSubmitting, errors, touched }) => (
        <Form
          autoComplete="off"
          // line below ensures that there are no unneeded re-renders
          onChange={fetchData.error || fetchData.ok ? resetFetchData : null}
        >
          <FormField
            label="name"
            name="name"
            type="text"
            placeholder="enter name"
          />

          <FormField
            label="preparation_time"
            name="preparation_time"
            placeholder="in hh:mm:ss format"
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
            disabled={
              isSubmitting ||
              Object.keys(errors).length > 0 ||
              Object.keys(touched).length === 0
            }
            className={
              isSubmitting
                ? 'submit-button submit-button--submitting'
                : 'submit-button'
            }
          >
            Submit
          </button>
          {fetchData.error && (
            <div className="error-message">
              An error has occured: {fetchData.message}
            </div>
          )}

          {fetchData.ok && <div className="success-message">Dish added!</div>}
        </Form>
      )}
    </Formik>
  );
}

export default DishForm;
