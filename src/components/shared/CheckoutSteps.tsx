import React from 'react';
import { cn } from '@/lib/utils/utils';
import {
  User,
  MapPin,
  CreditCard,
  CheckCircle,
} from 'lucide-react';

const steps = [
  { label: 'User Login', icon: User },
  { label: 'Shipping Address', icon: MapPin },
  { label: 'Payment Method', icon: CreditCard },
  { label: 'Place Order', icon: CheckCircle },
];

export default function CheckoutSteps({ current = 0 }) {

  return (
    <div className='flex-between flex-col md:flex-row space-x-2 space-y-2 mb-10'>
      {steps.map(
        (step, index) => (
          <React.Fragment key={step.label}>
            <div
              className={cn(
                'p-2 w-56 rounded-full text-center text-sm',
                index === current ? 'bg-secondary' : ''
              )}
            >
              {step.label}
            </div>
            {step.label !== 'Place Order' && (
              <hr className='w-16 border-t border-gray-300 mx-2' />
            )}
          </React.Fragment>
        )
      )}
    </div>
  );
}