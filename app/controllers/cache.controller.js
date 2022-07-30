
import { Router } from 'express';
import { CacheService } from '../services/index.js';
import {CacheCreateSchema, CacheUpdateSchema, CacheParamSchema} from '../dto/index.js'
import {joiValidator} from '../helpers/index.js';

const router = Router();
const cacheService = new CacheService()

router.get('/', async (req, res) => {
  try{
    const data = await cacheService.getAll();
    res.json(data);
  } catch (e) {
    return res.status(e.status || 500).json({
      message: e.message,
      ...(e.status && { status: e.status }),
      ...(e.details && { details: e.details }),
    });
  }
});

router.get('/:key', async (req, res) => {
  try{
    joiValidator(req.params, CacheParamSchema);
    const data = await cacheService.getByKey({key: req.params.key});
    res.json(data);
  } catch (e) {
    return res.status(e.status || 500).json({
      message: e.message,
      ...(e.status && { status: e.status }),
      ...(e.details && { details: e.details }),
    });
  }
});

router.post('/', async (req, res) => {
  try{
    joiValidator(req.body, CacheCreateSchema);
    const data =  await cacheService.create({key: req.body?.key, value: req.body?.value});
    res.json(data);
  } catch (e) {
    return res.status(e.status || 500).json({
      message: e.message,
      ...(e.status && { status: e.status }),
      ...(e.details && { details: e.details }),
    });
  }
});

router.patch('/', async (req, res) => {
  try{
    joiValidator(req.body, CacheUpdateSchema);
    const data = await cacheService.update({value: req.body.value, key: req.body.key });
    res.json(data);
  } catch (e) {
    return res.status(e.status || 500).json({
      message: e.message,
      ...(e.status && { status: e.status }),
      ...(e.details && { details: e.details }),
    });
  }
});

router.delete('/', async (req, res) => {
  try{
    const data = await cacheService.deleteAll();
    res.json(data);
  } catch (e) {
    return res.status(e.status || 500).json({
      message: e.message,
      ...(e.status && { status: e.status }),
      ...(e.details && { details: e.details }),
    });
  }
});

router.delete('/:key', async (req, res) => {
  try{
    joiValidator(req.params, CacheParamSchema);
    const data = await cacheService.deleteOne({key: req.params.key});
    res.json(data);
  } catch (e) {
    return res.status(e.status || 500).json({
      message: e.message,
      ...(e.status && { status: e.status }),
      ...(e.details && { details: e.details }),
    });
  }
});

export const CacheController = router;
