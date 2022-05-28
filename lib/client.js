import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const client = sanityClient({
  projectId: 'tle3blj4',
  dataset: 'production',
  apiVersion: '2022-05-25',
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

const builder = imageUrlBuilder(client);

const urlFor = (source) => builder.image(source);

export { client, urlFor };
