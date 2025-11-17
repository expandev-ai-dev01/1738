import { Router } from 'express';
import * as productController from '@/api/v1/internal/product/controller';
import * as productDetailController from '@/api/v1/internal/product/detail/controller';

const router = Router();

router.get('/product', productController.getHandler);
router.post('/product', productController.postHandler);
router.get('/product/:id', productDetailController.getHandler);
router.put('/product/:id', productDetailController.putHandler);
router.delete('/product/:id', productDetailController.deleteHandler);

export default router;
