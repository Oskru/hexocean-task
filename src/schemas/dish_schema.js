import * as Yup from 'yup';

export const dishSchema = Yup.object().shape({
  name: Yup.string().required('name of dish is required'),
  preparation_time: Yup.string().required('preparation_time is required'),
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
