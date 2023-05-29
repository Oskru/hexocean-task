import * as Yup from 'yup';

const preparation_time_regex = /^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/;
// matches HH:MM:SS format

export const dishSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'name must be at least 3 characters')
    .required('name of dish is required'),
  preparation_time: Yup.string()
    .matches(
      preparation_time_regex,
      'preparation_time has to be in valid hh:mm:ss format (max 23:59:59)',
    )
    .required('preparation_time is required'),
  type: Yup.string()
    .oneOf(['pizza', 'soup', 'sandwich'], 'invalid type')
    .required('type is required'),
  no_of_slices: Yup.number().when('type', {
    is: 'pizza',
    then: () =>
      Yup.number()
        .min(1, 'no_of_slices must be min. 1')
        .integer('no_of_slices must be an integer')
        .required('no_of_slices is required'),
  }),
  diameter: Yup.number().when('type', {
    is: 'pizza',
    then: () =>
      Yup.number()
        .min(1, 'diameter must be min. 1 cm')
        .required('diameter is required'),
  }),
  spiciness_scale: Yup.number().when('type', {
    is: 'soup',
    then: () =>
      Yup.number()
        .min(1, 'spiciness_scale must be between 1 and 10')
        .max(10, 'spiciness_scale must be between 1 and 10')
        .integer('spiciness_scale must be an integer')
        .required('spiciness_scale is required'),
  }),
  slices_of_bread: Yup.number().when('type', {
    is: 'sandwich',
    then: () =>
      Yup.number()
        .min(1, 'slices_of_bread must be min. 1')
        .integer('slices_of_bread must be an integer')
        .required('slices_of_bread is required'),
  }),
});
