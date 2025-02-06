import { redirect } from 'next/navigation';
import { fetchPropertyDetails } from '../../../utils/actions';

async function PropertyDetailsPage({ params }: { params: { id: string } }) {
  const property = await fetchPropertyDetails({ id: params.id });
  if (!property) redirect('/');

  const { baths, bedrooms, beds, guests } = property;
  const details = { baths, bedrooms, beds, guests };

  return <div>page</div>;
}

export default PropertyDetailsPage;
