import Google from '@theowenyoung/google'

const google = new Google({
  order: ['com', 'cn'],
  // search all at the same time
  concurrent: true,
  // googleapi as fallback
  apiAsFallback: true
})

google.translate('Hello world', 'en', 'fr').then(console.log)