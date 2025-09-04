export const AWS_CONFIG = {
  accessKeyId:  import.meta.env.VITE_AWS_ACCESS_KEY_ID,     
  secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY, 
  region: import.meta.env.VITE_AWS_REGION
};

// Language codes for AWS Translate
export const AWS_LANGUAGE_CODES = {
  english: 'en',
  hindi: 'hi',
  marathi: 'mr'
};