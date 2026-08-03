import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyJwt } from '@/lib/auth';
import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient | null = null;
try {
  prisma = new PrismaClient();
} catch (e) {
  console.warn('Prisma client init failed in frontend workspace route:', e);
}

const DEFAULT_WORKSPACE = {
  activeDatasetId: null,
  activeDatasetFilename: null,
  datasetAnalytics: null,
  datasetPreview: null,
  parsedIntent: null,
  activeOptimizationJobId: null,
  latestOptimizationResult: null,
  healthReport: null,
};

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('modliq_token')?.value;
    if (!token) {
      return NextResponse.json(DEFAULT_WORKSPACE);
    }
    const payload = verifyJwt(token);
    if (!payload || !prisma) {
      return NextResponse.json(DEFAULT_WORKSPACE);
    }

    const userId = payload.userId;
    let user = await prisma.user.findUnique({
      where: { id: userId },
    }).catch(() => null);

    if (!user && payload.email) {
      user = await prisma.user.findUnique({
        where: { email: payload.email },
      }).catch(() => null);
    }

    if (!user) {
      return NextResponse.json(DEFAULT_WORKSPACE);
    }

    return NextResponse.json({
      activeDatasetId: user.activeDatasetId,
      activeDatasetFilename: user.activeDatasetFilename,
      datasetAnalytics: user.datasetAnalytics ? JSON.parse(user.datasetAnalytics) : null,
      datasetPreview: user.datasetPreview ? JSON.parse(user.datasetPreview) : null,
      parsedIntent: user.parsedIntent ? JSON.parse(user.parsedIntent) : null,
      activeOptimizationJobId: user.activeOptimizationJobId,
      latestOptimizationResult: user.latestOptimizationResult ? JSON.parse(user.latestOptimizationResult) : null,
      healthReport: (user as any).healthReport ? JSON.parse((user as any).healthReport) : null,
    });
  } catch (error) {
    console.error('Error fetching workspace:', error);
    return NextResponse.json(DEFAULT_WORKSPACE);
  }
}

export async function PATCH(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('modliq_token')?.value;
    if (!token) {
      return NextResponse.json({ success: true });
    }
    const payload = verifyJwt(token);
    if (!payload || !prisma) {
      return NextResponse.json({ success: true });
    }

    const userId = payload.userId;
    const body = await request.json();

    const updateData: any = {};
    const allowedFields = [
      'activeDatasetId',
      'activeDatasetFilename',
      'datasetAnalytics',
      'datasetPreview',
      'parsedIntent',
      'activeOptimizationJobId',
      'latestOptimizationResult',
      'healthReport',
    ];

    const jsonFields = ['datasetAnalytics', 'datasetPreview', 'parsedIntent', 'latestOptimizationResult', 'healthReport'];

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        if (jsonFields.includes(field)) {
          updateData[field] = JSON.stringify(body[field]);
        } else {
          updateData[field] = body[field];
        }
      }
    }

    let user = await prisma.user.findUnique({ where: { id: userId } }).catch(() => null);
    if (!user && payload.email) {
      user = await prisma.user.findUnique({ where: { email: payload.email } }).catch(() => null);
    }

    if (user) {
      await prisma.user.update({
        where: { id: user.id },
        data: updateData,
      }).catch(() => null);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating workspace:', error);
    return NextResponse.json({ success: true });
  }
}
