'use client';

import { useFacebookPixel } from '@/hooks/useFacebookPixel';

export default function PixelProvider() {
  useFacebookPixel();
  return null;
}