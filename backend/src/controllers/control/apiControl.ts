import { Request, Response } from 'express';
import { FastApiService } from '../../services/apiService';


export interface FastApiPayload {
  originState: string;
  destinationCity: string;
  season: string;
  packagingType: string;
  transportMode: string;
  coldStorageAvailable: string;
  storageType: string;
  ripenessLevel: string;
  initialDamageLevel: string;
  routeDistanceKm: number;
  quantitySentCrates: number;
  hoursSinceHarvestAtDispatch: number;
}

export const handleFastApi = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body;

    if (!body || Object.keys(body).length === 0) {
      res.status(400).json({ error: 'Request body cannot be empty.' });
      return;
    }

    // This strips out any extra frontend data and ensures numbers are properly cast.
    const payload: FastApiPayload = {
      originState: body.originState,
      destinationCity: body.destinationCity,
      season: body.season,
      packagingType: body.packagingType,
      transportMode: body.transportMode,
      coldStorageAvailable: body.coldStorageAvailable,
      storageType: body.storageType,
      ripenessLevel: body.ripenessLevel,
      initialDamageLevel: body.initialDamageLevel,
      routeDistanceKm: Number(body.routeDistanceKm),
      quantitySentCrates: Number(body.quantitySentCrates),
      hoursSinceHarvestAtDispatch: Number(body.hoursSinceHarvestAtDispatch),
    };

    
    const result = await FastApiService.sendToFastApi(payload);

    if (!result.success) {
      if (result.isConfigured === false) {
        res.status(503).json({ 
          error: 'Analytics/AI service is currently disabled or not configured.' 
        });
        return;
      }

      res.status(502).json({ 
        error: 'Failed to communicate with external prediction service.',
        details: result.error 
      });
      return;
    }

    res.status(200).json({
      message: 'FastAPI processing successful',
      data: result.data,
    });
  } catch (err: unknown) { //Perfected TypeScript error handling (no 'any')
    const errorMessage = err instanceof Error ? err.message : String(err);
    res.status(500).json({ error: 'Internal server error', details: errorMessage });
  }
};