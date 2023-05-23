const readline = require('readline-sync');

const TOTAL_ASSENTOS = 24;
const mapaAssentos = {};
let assentosOcupados = 0;

// menu

function exibirMenu() {
  console.log("- - - - - - - - - - - - - - - - - - -");
  console.log('\n*-*- MENU -*-*');
  console.log('1 - Comprar Passagem');
  console.log('2 - Consultar Voos');
  console.log('3 - Exibir Mapa de Assentos');
  console.log('4 - Emitir Ticket');
  console.log('0 - Encerrar Programa');
  console.log("- - - - - - - - - - - - - - - - - - -");
}

// comprar passagens

function comprarPassagem() {
  console.log('\n*-*- Comprar Passagem -*-*');

  const nome = readline.question('Nome: ');
  const sobrenome = readline.question('Sobrenome: ');
  const idade = parseInt(readline.question('Idade: '));
  const assento = readline.question('Assento (ex: A1): ').toUpperCase();
  const origem = readline.question('Origem: ').toUpperCase();
  const destino = readline.question('Destino: ').toUpperCase();

  // assentos

  if (!mapaAssentos[assento] && assento.match(/^[AB][1-9]|1[0-2]$/)) {
    mapaAssentos[assento] = { nome, sobrenome, idade, origem, destino };
    assentosOcupados++;

    // valores

    let valor;
    if (idade < 18) {
      valor = 50;
    } else if (idade >= 60) {
      valor = 100;
    } else {
      valor = 75;
    }

    // processo

    console.log('\n*-*- Resumo da Compra -*-*');
    console.log(`Nome: ${nome} ${sobrenome}`);
    console.log(`Idade: ${idade}`);
    console.log(`Assento: ${assento}`);
    console.log(`Origem: ${origem}`);
    console.log(`Destino: ${destino}`);
    console.log(`Valor: R$ ${valor.toFixed(2)}`);
  } else {
    console.log('\n*Assento inválido ou ocupado!*');
  }
}

// consultar voos

function consultarVoos() {
  console.log('\n*-*- Consultar Voos -*-*');
  console.log('Voos disponíveis:');
  console.log('1. Sao Paulo (GRU) -> Rio de Janeiro (GIG) - 13:30');
  console.log('2. Curitiba (BSB) -> India (PEK) - 19:20');
  console.log('3. São Paulo (GRU) -> Belo Horizonte (BOM) - 10:00');
  console.log('4. Rio de Janeiro (CNF) -> Florianopolis (SYD) - 15:00');
}

// assentos 

function exibirMapaAssentos() {
  console.log('\n*-*- Mapa de Assentos -*-*');

  for (let i = 1; i <= 12; i++) {
    let linhaA = `A${i}: ${mapaAssentos['A' + i] ? 'X' : '-'}`;
    let linhaB = `B${i}: ${mapaAssentos['B' + i] ? 'X' : '-'}`;
    console.log(`${linhaA}\t\t${linhaB}`);
  }

  console.log(`\nAssentos Disponíveis: ${TOTAL_ASSENTOS - assentosOcupados}`);
  console.log(`Assentos Ocupados: ${assentosOcupados}`);
}

// ticket

function emitirTicket() {
  console.log('\n*-*- Emitir Ticket -*-*');

  if (assentosOcupados === 0) {
    console.log('*Nenhuma passagem vendida!*');
    return;
  }

  const assento = readline.question('*Assento (ex: A1): *').toUpperCase();

  if (!mapaAssentos[assento]) {
    console.log('*Assento inválido ou não vendido!*');
    return;
  }

  const { nome, sobrenome, idade, origem, destino } = mapaAssentos[assento];
  let valor;
  if (idade < 18) {
    valor = 50;
  } else if (idade >= 60) {
    valor = 100;
  } else {
    valor = 75;
  }

  console.log('-------------------------------');
  console.log('      Companhia Aérea          ');
  console.log('-------------------------------');
  console.log(`Nome: ${nome} ${sobrenome}`);
  console.log(`Idade: ${idade}`);
  console.log(`Assento: ${assento}`);
  console.log(`Origem: ${origem}`);
  console.log(`Destino: ${destino}`);
  console.log(`Valor: R$ ${valor.toFixed(2)}`);
  console.log('-------------------------------');
}

// opcoes

let opcao;
do {
  exibirMenu();
  opcao = parseInt(readline.question('Opcao: '));
  switch (opcao) {
    case 1:
      comprarPassagem();
      break;
    case 2:
      consultarVoos();
      break;
    case 3:
      exibirMapaAssentos();
      break;
    case 4:
      emitirTicket();
      break;
    case 0:
      console.log('\n*Programa encerrado!*');
      break;
    default:
      console.log('\n*Opcao inválida!*');
  }
} while (opcao !== 0);  