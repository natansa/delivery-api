import DataManager from '../utils/DataManager.js';
const pedidosPath = './data/pedidos.json';

async function createPedido(pedidoData) {
    const pedidos = await DataManager.readJSONFile(pedidosPath);
    const newId = pedidos.nextId++;
    const newPedido = { id: newId, entregue: false, ...pedidoData, timestamp: new Date().toISOString() };
    pedidos.pedidos.push(newPedido);
    await DataManager.writeJSONFile(pedidosPath, pedidos);
    return newPedido;
};

async function updatePedido(id, pedidoData) {
    const pedidos = await DataManager.readJSONFile(pedidosPath);
    const index = pedidos.pedidos.findIndex(p => p.id === parseInt(id));
    if (index === -1) throw new Error('Pedido não encontrado');
    
    pedidos.pedidos[index] = {
        ...pedidos.pedidos[index],
        ...pedidoData,
        id: parseInt(id),
        timestamp: pedidos.pedidos[index].timestamp
    };

    await DataManager.writeJSONFile(pedidosPath, pedidos);
    return pedidos.pedidos[index];
}

async function updateEntregaStatus(id, entregue) {
    const pedidos = await DataManager.readJSONFile(pedidosPath);
    const pedido = pedidos.pedidos.find(p => p.id === parseInt(id));
    if (!pedido) throw new Error('Pedido não encontrado');
    pedido.entregue = entregue;
    await DataManager.writeJSONFile(pedidosPath, pedidos);
    return pedido;
}

async function deletePedido(id) {
    const pedidos = await DataManager.readJSONFile(pedidosPath);
    const index = pedidos.pedidos.findIndex(p => p.id === parseInt(id));
    if (index === -1) throw new Error('Pedido não encontrado');
    pedidos.pedidos.splice(index, 1);
    await DataManager.writeJSONFile(pedidosPath, pedidos);
}

async function getPedidoById(id) {
    const pedidos = await DataManager.readJSONFile(pedidosPath);
    const pedido = pedidos.pedidos.find(p => p.id === parseInt(id));
    if (!pedido) throw new Error('Pedido não encontrado');
    return pedido;
}

async function getTotalPorCliente(cliente) {
    const pedidos = await DataManager.readJSONFile(pedidosPath);
    const total = pedidos.pedidos.filter(p => p.cliente === cliente && p.entregue)
                                .reduce((acc, p) => acc + p.valor, 0);
    return total;
}

async function getTotalPorProduto(produto) {
    const pedidos = await DataManager.readJSONFile(pedidosPath);
    const total = pedidos.pedidos.filter(p => p.produto === produto && p.entregue)
                                .reduce((acc, p) => acc + p.valor, 0);
    return total;
}

async function getProdutosMaisVendidos() {
    const pedidos = await DataManager.readJSONFile(pedidosPath);
    const entregues = pedidos.pedidos.filter(p => p.entregue);
    const produtosCount = entregues.reduce((acc, p) => {
        acc[p.produto] = (acc[p.produto] || 0) + 1;
        return acc;
    }, {});
    const sortedProducts = Object.entries(produtosCount)
                                 .sort((a, b) => b[1] - a[1])
                                 .map(([produto, qty]) => `${produto} - ${qty}`);
    return sortedProducts;
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
