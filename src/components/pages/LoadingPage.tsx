// components
import Loader from '@/components/shared/Loader'

export default function LoadingPage() {
  return (
    <div className='flex-center w-screen h-screen'>
      <Loader width={100} height={100}/>
    </div>
  )
}