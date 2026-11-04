import 'dotenv/config';
import cors from 'cors';
import express, { type NextFunction, type Request, type Response } from 'express';
import { Quill } from '@quillsql/node';

declare global {
  namespace Express {
    interface Request {
      user?: { organizationId: string };
    }
  }
}

const app = express();
app.use(cors());
app.use(express.json({ limit: '5mb' }));

const quill = new Quill({
  privateKey: process.env.QUILL_PRIVATE_KEY!,
  databaseType: 'postgresql',
  databaseConnectionString: process.env.DATABASE_URL,
  ...(process.env.QUILL_METADATA_SERVER_URL
    ? { metadataServerURL: process.env.QUILL_METADATA_SERVER_URL }
    : {}),
});

// Sample auth middleware: in a real app, resolve the tenant from the session/JWT.
function authenticate(req: Request, _res: Response, next: NextFunction) {
  req.user = { organizationId: 'org_acme' };
  next();
}

// Quill SDK query endpoint. Tenant scoping happens here, server-side only.
app.post('/quill', authenticate, async (req: Request, res: Response) => {
  try {
    const result = await quill.query({
      tenants: [{ tenantField: 'organization_id', tenantIds: [req.user!.organizationId] }],
      metadata: req.body.metadata,
    });
    res.send(result);
  } catch (err) {
    console.error('Quill query error:', err);
    res.status(500).json({
      status: 'error',
      error: err instanceof Error ? err.message : 'Quill query failed',
    });
  }
});

const port = Number(process.env.PORT || 3456);
app.listen(port, () => {
  console.log(`Quill sample server listening on http://localhost:${port}`);
});
