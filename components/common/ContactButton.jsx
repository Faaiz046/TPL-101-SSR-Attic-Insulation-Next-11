import { PhoneIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

export default function ContactButton({
  data,
  className,
  textClass,
  phoneIconClass,
  phoneClass,
  callClass,
  icon1,
  icon1Class,
  icon2,
  iconClass2,
  icon3,
  iconClass3
}) {
  return (
    <Link title="Click to call us" href={`tel:${data}`}>
      <div
        className={`btnPrimary flex w-fit items-center gap-3 rounded-full py-3 px-5 text-center lg:px-7 cursor-pointer ${className}`}
      >
        <span className={`${phoneClass}`}>
          <span className={`${iconClass3}`}>{icon3}</span>
          <span className={`${icon1Class}`}>{icon1}</span>
          <PhoneIcon className={`h-7 lg:h-9 ${phoneIconClass}`} />
          <span className={`${iconClass2}`}>{icon2}</span>
          
        </span>
        <span>
          <p className={`font-semibold uppercase ${callClass}`}>CLICK TO CALL</p>
          <p className={`-mt-1 text-3xl font-bold ${textClass}`}>{data}</p>
        </span>
      </div>
    </Link>
  );
}
