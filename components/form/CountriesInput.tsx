import { Label } from '@/components/ui/label';
import { formattedCountries } from '@/utils/countries';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const name = 'country';

function CountriesInput({defaultValue}: {defaultValue?: string}) {
  return (
    <div className='mb-2'>
        <Label htmlFor={name} className='capitalize'>Country</Label>
        <Select id={name} name={name} required defaultValue={defaultValue || formattedCountries[0].code}>
            <SelectTrigger id={name}>
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                {formattedCountries.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                        <span className='flex items-center gap-2'>
                            {country.flag} {country.name}
                        </span>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    </div>
  )
}

export default CountriesInput