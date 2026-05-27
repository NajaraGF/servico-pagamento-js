const assert = require('assert');
const ServicoDePagamento = require('../src/ServicoDePagamento');

describe('ServicoDePagamento', function () {
  it('deve realizar um pagamento com categoria cara quando o valor for maior que 100', function () {
    const servicoDePagamento = new ServicoDePagamento();

    servicoDePagamento.pagar('0987-7656-3475', 'Samar', 156.87);

    const ultimoPagamento = servicoDePagamento.consultarUltimoPagamento();

    assert.strictEqual(ultimoPagamento.codigoBarras, '0987-7656-3475');
    assert.strictEqual(ultimoPagamento.empresa, 'Samar');
    assert.strictEqual(ultimoPagamento.valor, 156.87);
    assert.strictEqual(ultimoPagamento.categoria, 'cara');
  });

  it('deve realizar um pagamento com categoria padrão quando o valor for menor ou igual a 100', function () {
    const servicoDePagamento = new ServicoDePagamento();

    servicoDePagamento.pagar('1234-5678-9000', 'Empresa Teste', 80.50);

    const ultimoPagamento = servicoDePagamento.consultarUltimoPagamento();

    assert.strictEqual(ultimoPagamento.categoria, 'padrão');
  });

  it('deve consultar apenas o último pagamento realizado', function () {
    const servicoDePagamento = new ServicoDePagamento();

    servicoDePagamento.pagar('1111', 'Empresa A', 50);
    servicoDePagamento.pagar('2222', 'Empresa B', 200);

    const ultimoPagamento = servicoDePagamento.consultarUltimoPagamento();

    assert.strictEqual(ultimoPagamento.codigoBarras, '2222');
    assert.strictEqual(ultimoPagamento.empresa, 'Empresa B');
    assert.strictEqual(ultimoPagamento.valor, 200);
    assert.strictEqual(ultimoPagamento.categoria, 'cara');
  });
});