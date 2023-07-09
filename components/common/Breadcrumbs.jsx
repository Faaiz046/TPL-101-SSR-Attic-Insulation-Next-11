import Link from 'next/link';
import { Container, FullContainer } from '../common';
import { ChevronDoubleRightIcon } from '@heroicons/react/24/outline';

export default function Breadcrumbs({ items = [] }) {
  return (
    <FullContainer>
      <div className="flex w-full items-center justify-center space-x-5 bg-secondary/10 py-3">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between">
            {index !== items.length - 1 ? (
              <Link href={item.href}>
                <div className="flex items-center border-b-2 border-transparent text-secondary transition-all hover:border-primary hover:text-primary cursor-pointer">
                  {item.name}
                  <ChevronDoubleRightIcon className="w-3" />
                </div>
              </Link>
            ) : (
              <div className="flex cursor-not-allowed items-center border-b-2 border-transparent font-bold text-primary">
                {item.name}
              </div>
            )}
          </div>
        ))}
      </div>
    </FullContainer>
  );
}
