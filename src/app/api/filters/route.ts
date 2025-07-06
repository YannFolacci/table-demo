import { filterConfig } from '@/lib/filterConfig';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const data: Record<string, any[]> = {};

  for (const [key, config] of Object.entries(filterConfig)) {
    const model = prisma[config.model as keyof typeof prisma];

    const result = await model.findMany({
      select: { [config.field]: true },
    });

    const values = result.map(result => result[config.field as keyof typeof result]);
    const uniqueValues = Array.from(new Set(values));

    data[key] = uniqueValues;
  }

  return NextResponse.json(data);
}
