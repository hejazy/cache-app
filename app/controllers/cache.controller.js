
import { Router } from 'express';
import { CacheService } from '../services/index.js';

const router = Router();
const cacheService = new CacheService()

router.get('/', async (req, res) => {
  try{
    const data = await cacheService.getAll();
    res.json(data);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
});

router.get('/:key', async (req, res) => {
  try{
    const data = await cacheService.getByKey({key: req.params.id});
    res.json(data);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
});

router.post('/', async (req, res) => {
  try{
    const data =  await cacheService.create({key: req.params.key, value: req.body.value});
    res.json(data);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
});

router.patch('/', async (req, res) => {
  try{
    const data = await cacheService.update({value: req.body.value, key: req.body.key });
    res.json(data);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
});

router.delete('/', async (req, res) => {
  try{
    const data = await cacheService.deleteAll();
    res.json(data);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
});

router.delete('/:key', async (req, res) => {
  try{
    const data = await cacheService.deleteOne({key: req.params.key});
    res.json(data);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
});

export const CacheController = router;
