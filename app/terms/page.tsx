import type { Metadata } from 'next';
import { LegalPage } from '@/components/legal-page';
export const metadata: Metadata = { title: 'Terms of service' };
export default function Terms() {
  return <LegalPage kind="terms" />;
}
