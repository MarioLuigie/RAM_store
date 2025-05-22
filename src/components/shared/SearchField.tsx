// components
import { Input } from '@/components/ui/input';

export default function SearchField() {

  return (
    <div className='px-10 w-full'>
      <Input type='search' placeholder='Search...' className='w-full'/>
    </div>
  )
}