import { Button } from '@/components/ui/button'
import { APP_ROUTE_NAME_HOME } from '@/lib/constants';

export const metadata = {
  title: APP_ROUTE_NAME_HOME
}

export default function Page() {
  return (
    <div>
      <Button>HOME</Button>
    </div>
  );
}
