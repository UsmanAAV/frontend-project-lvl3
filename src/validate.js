import * as yup from 'yup';

const validate = (data) => {
  yup.setLocale({
    string: {
      required: 'Please fill in this field',
      url: 'Please enter a valid url',
    },
  });

  const schema = yup.object().shape({
    input: yup.string().required().url(),
  });

  return schema.validate(data);
};

export { validate };
