import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { requireAuth } from '../middleware/auth';

const router = Router();

const DEFAULT_TEMPLATES = [
  {
    id: 'tpl_chem_yield',
    type: 'goal',
    industry: 'Specialty Chemicals',
    title: 'Maximize Chemical Reaction Yield & Purity',
    description: 'Optimize reactor temperature and agitator speed to achieve >96% batch yield while maintaining impurity level < 0.5%.',
    payloadJson: JSON.stringify({
      target: 'Yield',
      goalDirection: 'maximize',
      threshold: 96.0,
      features: ['Reactor_Temp', 'Agitator_Speed', 'Pressure', 'Catalyst_Ratio'],
      constraints: {
        Reactor_Temp: { min: 70, max: 95 },
        Pressure: { max: 4.5 },
      },
    }),
  },
  {
    id: 'tpl_food_moisture',
    type: 'goal',
    industry: 'Food Processing',
    title: 'Optimize Baking Line Moisture & Energy Efficiency',
    description: 'Maintain product moisture within 4.0% - 4.8% specification range while minimizing oven gas consumption.',
    payloadJson: JSON.stringify({
      target: 'Moisture_Pct',
      goalDirection: 'maximize',
      threshold: 4.5,
      features: ['Oven_Zone1_Temp', 'Oven_Zone2_Temp', 'Conveyor_Speed', 'Baking_Humidity'],
      constraints: {
        Moisture_Pct: { min: 4.0, max: 4.8 },
        Conveyor_Speed: { min: 12, max: 20 },
      },
    }),
  },
  {
    id: 'tpl_pharma_content',
    type: 'goal',
    industry: 'Pharma / Nutraceuticals',
    title: 'Tablet Uniformity & Dissolution Rate Optimization',
    description: 'Maximize 30-minute tablet dissolution rate above 85% while meeting strict compression hardness limits.',
    payloadJson: JSON.stringify({
      target: 'Dissolution_Rate_30min',
      goalDirection: 'maximize',
      threshold: 85.0,
      features: ['Main_Compress_Force', 'Pre_Compress_Force', 'Feeder_Speed', 'Granule_Moisture'],
      constraints: {
        Main_Compress_Force: { min: 10, max: 18 },
      },
    }),
  },
  {
    id: 'tpl_auto_stamping',
    type: 'goal',
    industry: 'Automotive Components',
    title: 'Sheet Metal Stamping Springback & Burr Reduction',
    description: 'Minimize stamping burr height below 0.05mm and eliminate edge cracking across high-strength steel lots.',
    payloadJson: JSON.stringify({
      target: 'Burr_Height_mm',
      goalDirection: 'minimize',
      threshold: 0.05,
      features: ['Press_Tonnage', 'Die_Clearance', 'Lubricant_Flow_Rate', 'Blank_Holder_Force'],
      constraints: {
        Press_Tonnage: { min: 400, max: 600 },
      },
    }),
  },
];

// GET /api/v1/templates — List manufacturing templates
router.get('/', async (req: Request, res: Response) => {
  try {
    const { type, industry } = req.query;
    let templates = await prisma.template.findMany({
      where: {
        active: true,
        ...(type ? { type: type as string } : {}),
        ...(industry ? { industry: industry as string } : {}),
      },
    });

    if (templates.length === 0) {
      // Seed default templates dynamically
      templates = DEFAULT_TEMPLATES as any;
    }

    res.json({ success: true, data: templates });
  } catch (error: any) {
    res.json({ success: true, data: DEFAULT_TEMPLATES });
  }
});

// GET /api/v1/templates/:id — Get specific template
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const template = await prisma.template.findUnique({
      where: { id },
    });

    if (!template) {
      const match = DEFAULT_TEMPLATES.find((t) => t.id === id);
      if (match) return res.json({ success: true, data: match });
      return res.status(404).json({ success: false, error: 'Template not found' });
    }

    res.json({ success: true, data: template });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
