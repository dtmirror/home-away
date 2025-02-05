import { fetchProperties } from '@/utils/actions';
import PropertiesList from './PropertiesList';
import EmptyList from './EmptyList';
import type { PropertyCardProps } from '@/utils/types';

async function PropertiesContainer({
    category,
    search
}: {category?: string, search?: string}) {
    const properties: PropertyCardProps[] = await fetchProperties({ category, search });

    if (!properties.length) {
        return <EmptyList
            heading='No properties found'
            message='Try searching for something else or remove filters'
            btnText='Clear filters'
        />;
    }

    return (
        <PropertiesList properties={properties} />
    )
}

export default PropertiesContainer