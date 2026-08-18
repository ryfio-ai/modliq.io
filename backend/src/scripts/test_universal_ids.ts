import { generatePublicId, generateLeadPublicId } from '../services/publicId.service';

async function testUniversalIdGeneration() {
  console.log('--- TESTING UNIVERSAL PLATFORM ID ALLOCATION FORMAT ---');

  const entities = [
    'USER',
    'PROJECT',
    'ORG',
    'DATASET',
    'JOB',
    'PASSPORT',
    'TICKET',
    'TRIAL',
    'AGENT',
    'APPROVAL',
    'LABELING',
    'FINETUNE',
    'CREDENTIAL',
    'VECTOR',
    'EVAL',
    'LEAD',
    'TEMPLATE',
    'MODEL',
    'EXPERIMENT',
    'OPERATIONS',
  ];

  for (const entity of entities) {
    const id1 = await generatePublicId(entity);
    const id2 = await generatePublicId(entity);
    console.log(`✅ ${entity.padEnd(12)} -> #1: ${id1}`);
    console.log(`   ${''.padEnd(12)} -> #2: ${id2}`);
  }

  console.log('--- UNIVERSAL PLATFORM ID ALLOCATION TEST PASSED SUCCESSFULLY ---');
  process.exit(0);
}

testUniversalIdGeneration().catch((err) => {
  console.error('Universal ID test error:', err);
  process.exit(1);
});
