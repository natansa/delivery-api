import PedidoService from '../services/PedidosService.js';

async function createPedido(req, res) {
    try {
        const pedido = await PedidoService.createPedido(req.body);
        res.status(201).send(pedido);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

async function updatePedido(req, res) {
    try {
        const { id } = req.params;
        const updatedPedido = await PedidoService.updatePedido(id, req.body);
        res.status(200).send(updatedPedido);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

async function updateEntregaStatus(req, res) {
    try {
        const { id } = req.params;
        const { entregue } = req.body;
        const pedido = await PedidoService.updateEntregaStatus(id, entregue);
        res.status(200).send(pedido);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

async function deletePedido(req, res) {
    try {
        const { id } = req.params;
        await PedidoService.deletePedido(id);
        res.status(204).send();
    } catch (error) {
        res.status(400).send(error.message);
    }
}

async function getPedidoById(req, res) {
    try {
        const { id } = req.params;
        const pedido = await PedidoService.getPedidoById(id);
        res.status(200).send(pedido);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

async function getTotalPorCliente(req, res) {
    try {
        const { cliente } = req.params;
        const total = await PedidoService.getTotalPorCliente(cliente);
        res.status(200).send({ total });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

async function getTotalPorProduto(req, res) {
    try {
        const { produto } = req.params;
        const total = await PedidoService.getTotalPorProduto(produto);
        res.status(200).send({ total });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

async function getProdutosMaisVendidos(req, res) {
    try {
        const produtos = await PedidoService.getProdutosMaisVendidos();
        res.status(200).send(produtos);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export default {
    createPedido,
    updatePedido,
    updateEntregaStatus,
    deletePedido,
    getPedidoById,
    getTotalPorCliente,
    getTotalPorProduto,
    getProdutosMaisVendidos
}