import React from 'react';

// styles imports
import './dishForm.scss';

// icon imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

// form helpers imports
import { Formik, Form } from 'formik';
import { dishSchema } from '../../schemas/dish_schema';

// components imports
import FormField from '../FormField/FormField';
import FormSelect from '../FormSelect/FormSelect';
import MessageBox from '../MessageBox/MessageBox';

/**
 * This DishForm component renders a form for submitting data
 * about a dish, including its name, preparation time, type, and various other attributes depending on
 * the type of dish. The form uses Formik and Yup for form validation and submission. The
 * component also handles the submission of the form data to an API endpoint and displays a message box
 * indicating success or failure of the submission.
 * @returns The `DishForm` component.
 *
 */
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
        error: error,
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
          spellCheck="false"
          className="form"
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
            placeholder="hh:mm:ss"
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
            <div className="form__pizza-container">
              <FormField
                label="no_of_slices"
                name="no_of_slices"
                type="number"
                min="1"
                placeholder="no_of_slices"
                className="form__pizza-input"
              />

              <FormField
                label="diameter"
                name="diameter"
                type="number"
                min="1"
                placeholder="in cm"
                className="form__pizza-input"
              />
            </div>
          )}

          {values.type === 'soup' && (
            <>
              <FormField
                label="spiciness_scale"
                name="spiciness_scale"
                type="number"
                min="1"
                max="10"
                placeholder="1-10"
              />
            </>
          )}

          {values.type === 'sandwich' && (
            <>
              <FormField
                label="slices_of_bread"
                name="slices_of_bread"
                type="number"
                placeholder="slices_of_bread"
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
              isSubmitting ? 'submit-but submit-but--submitting' : 'submit-but'
            }
          >
            {isSubmitting && (
              <FontAwesomeIcon
                icon={faCircleNotch}
                spin
                className="submit-but__icon"
              />
            )}
            Submit
          </button>
          {fetchData.error && (
            <MessageBox fetchData={fetchData} setFetchData={setFetchData} />
          )}
          {fetchData.ok && (
            <MessageBox fetchData={fetchData} setFetchData={setFetchData} />
          )}
        </Form>
      )}
    </Formik>
  );
}

export default DishForm;
