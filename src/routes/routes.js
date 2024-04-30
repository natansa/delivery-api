import express from 'express';
import PedidosController from '../controllers/PedidosController.js';

const router = express.Router();

router.post('/pedidos', PedidosController.createPedido);
router.put('/pedidos/:id', PedidosController.updatePedido);
router.patch('/pedidos/:id/entregue', PedidosController.updateEntregaStatus);
router.delete('/pedidos/:id', PedidosController.deletePedido);
router.get('/pedidos/:id', PedidosController.getPedidoById);
router.get('/pedidos/total/cliente/:cliente', PedidosController.getTotalPorCliente);
router.get('/pedidos/total/produto/:produto', PedidosController.getTotalPorProduto);
router.get('/populares', PedidosController.getProdutosMaisVendidos);

export default router;
