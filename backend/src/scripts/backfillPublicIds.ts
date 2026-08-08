import prisma from '../lib/prisma';
import { generatePublicId } from '../services/publicId.service';

async function backfillPublicIds() {
  console.log('--------------------------------------------------');
  console.log('Starting Modliq Public ID Backfill Process');
  console.log('--------------------------------------------------');

  try {
    // 1. Backfill Users
    const users = await prisma.user.findMany({ where: { publicId: null } });
    console.log(`Found ${users.length} users requiring publicId...`);
    for (const u of users) {
      const publicId = await generatePublicId('USER', u.updatedAt || new Date());
      await prisma.user.update({
        where: { id: u.id },
        data: { publicId },
      });
      console.log(`  ✓ Updated User ${u.email || u.id} -> ${publicId}`);
    }

    // 2. Backfill Projects
    const projects = await prisma.project.findMany({ where: { publicId: null } });
    console.log(`Found ${projects.length} projects requiring publicId...`);
    for (const p of projects) {
      const publicId = await generatePublicId('PROJECT', p.createdAt || new Date());
      await prisma.project.update({
        where: { id: p.id },
        data: { publicId },
      });
      console.log(`  ✓ Updated Project "${p.name}" (${p.id}) -> ${publicId}`);
    }

    // 3. Backfill Organizations
    const orgs = await prisma.organization.findMany({ where: { publicId: null } });
    console.log(`Found ${orgs.length} organizations requiring publicId...`);
    for (const o of orgs) {
      const publicId = await generatePublicId('ORG', o.createdAt || new Date());
      await prisma.organization.update({
        where: { id: o.id },
        data: { publicId },
      });
      console.log(`  ✓ Updated Organization "${o.name}" -> ${publicId}`);
    }

    // 4. Backfill Datasets
    const datasets = await prisma.dataset.findMany({ where: { publicId: null } });
    console.log(`Found ${datasets.length} datasets requiring publicId...`);
    for (const d of datasets) {
      const publicId = await generatePublicId('DATASET', d.createdAt || new Date());
      await prisma.dataset.update({
        where: { id: d.id },
        data: { publicId },
      });
      console.log(`  ✓ Updated Dataset "${d.filename}" -> ${publicId}`);
    }

    // 5. Backfill Quality Passports
    const passports = await prisma.qualityPassport.findMany({ where: { publicId: null } });
    console.log(`Found ${passports.length} quality passports requiring publicId...`);
    for (const qp of passports) {
      const publicId = await generatePublicId('PASSPORT', qp.createdAt || new Date());
      await prisma.qualityPassport.update({
        where: { id: qp.id },
        data: { publicId },
      });
      console.log(`  ✓ Updated QualityPassport "${qp.title}" -> ${publicId}`);
    }

    // 6. Backfill Support Tickets
    const tickets = await prisma.supportTicket.findMany({ where: { publicId: null } });
    console.log(`Found ${tickets.length} support tickets requiring publicId...`);
    for (const t of tickets) {
      const publicId = await generatePublicId('TICKET', t.createdAt || new Date());
      await prisma.supportTicket.update({
        where: { id: t.id },
        data: { publicId },
      });
      console.log(`  ✓ Updated SupportTicket "${t.subject}" -> ${publicId}`);
    }

    // 7. Backfill Optimization Jobs
    const jobs = await prisma.optimizationJob.findMany({ where: { publicId: null } });
    console.log(`Found ${jobs.length} optimization jobs requiring publicId...`);
    for (const j of jobs) {
      const publicId = await generatePublicId('JOB', j.createdAt || new Date());
      await prisma.optimizationJob.update({
        where: { id: j.id },
        data: { publicId },
      });
      console.log(`  ✓ Updated OptimizationJob (${j.id}) -> ${publicId}`);
    }

    console.log('--------------------------------------------------');
    console.log('Public ID Backfill Process Completed Successfully!');
    console.log('--------------------------------------------------');
  } catch (err: any) {
    console.error('Backfill failed:', err?.message || err);
  } finally {
    await prisma.$disconnect();
  }
}

backfillPublicIds();
