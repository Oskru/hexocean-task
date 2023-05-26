import * as Yup from 'yup';

const preparation_time_regex =
  /^(?:[0-9]{1,2}|[0-8][0-9]):[0-5][0-9]:[0-5][0-9]$/;
// Matches HH:MM:SS format, while HH is between 00-99

export const dishSchema = Yup.object().shape({
  name: Yup.string().required('name of dish is required'),
  preparation_time: Yup.string()
    .matches(
      preparation_time_regex,
      'preparation_time has to be in valid hh:mm:ss format',
    )
    .required('preparation_time is required'),
  type: Yup.string()
    .oneOf(['pizza', 'soup', 'sandwich'], 'invalid type')
    .required('type is required'),
  no_of_slices: Yup.number().when('type', {
    is: 'pizza',
    then: () => Yup.number().required('no_of_slices is required'),
  }),
  diameter: Yup.number().when('type', {
    is: 'pizza',
    then: () => Yup.number().required('diameter is required'),
  }),
  spiciness_scale: Yup.number().when('type', {
    is: 'soup',
    then: () =>
      Yup.number()
        .min(1, 'spiciness_scale must be between 1 and 10')
        .max(10, 'spiciness_scale must be between 1 and 10')
        .required('spiciness_scale is required'),
  }),
  slices_of_bread: Yup.number().when('type', {
    is: 'sandwich',
    then: () => Yup.number().required('slices_of_bread is required'),
  }),
});
