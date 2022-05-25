import sanityClient from '@sanity/client';
import ImageUrlBuilder from '@sanity/image-url';

const client = sanityClient({
  projectId: process.env.NEXT_PROJECT_ID,
  dataset: 'production',
  apiVersion: '2022-05-25',
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

const builder = ImageUrlBuilder(client);

const urlFor = (source) => builder.image(source);

export { client, urlFor };
