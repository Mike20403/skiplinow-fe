import * as Yup from 'yup';

export const captionGeneratorValidationSchema = Yup.object().shape({
  topic: Yup.string()
    .required('Topic is required'),
  tone: Yup.string()
    .required('Tone is required'),
  idea: Yup.string()
    .required('Idea is required'),
});

export const topicAndToneGeneratorValidationSchema = Yup.object().shape({
  topic: Yup.string()
    .required('Topic is required'),
  tone: Yup.string()
    .required('Tone is required'),
});

export const topicGeneratorValidationSchema = Yup.object().shape({
  topic: Yup.string()
    .required('Idea is required'),
});