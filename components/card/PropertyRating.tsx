import { FaStar } from 'react-icons/fa';

function PropertyRating({
  propertyId,
  inPage,
}: {
  propertyId: string;
  inPage: boolean;
}) {
  const rating = 4.7;
  const count = 100;

  const className = `flex gap-1 items-center ${inPage ? 'text-md' : 'text-xs'}`;
  const countText = count > 1 ? 'reviews' : 'review';
  const countValue = `(${count}) ${inPage ? countText : ''}`;

  return (
    <>
      <input type='hidden' name='propertyId' value={propertyId} />
      <span className={className}>
        <FaStar className='w-3 h-3 text-yellow-400' />
        {rating} {countValue}
      </span>
    </>
  );
}

export default PropertyRating;
