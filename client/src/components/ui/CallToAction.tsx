import { Link } from 'wouter';

interface CallToActionProps {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

const variants = {
  primary: 'bg-primary-600 text-white hover:bg-primary-700',
  secondary: 'bg-secondary-600 text-white hover:bg-secondary-700',
  outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50'
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg'
};

export function CallToAction({ label, href, variant = 'primary', size = 'md' }: CallToActionProps) {
  return (
    <Link href={href}>
      <a className={`inline-block rounded-lg font-medium transition-colors ${variants[variant]} ${sizes[size]}`}>
        {label}
      </a>
    </Link>
  );
}
