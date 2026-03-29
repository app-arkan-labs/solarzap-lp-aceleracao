# Plano de Acao V3 - Landing Page Aceleracao SolarZap

## 1. Diagnostico do erro atual
A landing atual esta mais bonita do que antes, mas continua convertendo mal em tese porque ainda sofre dos mesmos problemas estruturais:

- tenta explicar demais antes de vender a promessa central;
- apresenta metodo e sofisticação antes de deixar a dor absolutamente obvia;
- parece uma pagina de produto/mentoria premium, mas nao uma pagina de captura agressiva de reuniao;
- a prova social esta fraca e tardia para o nivel de ceticismo do publico;
- a oferta esta mais focada em arquitetura do que em desejo imediato;
- a narrativa nao segue o padrao da sua landing de referencia que ja converteu na pratica.

## 2. O que a landing da ARKAN que converte ensina
Referencia analisada: `https://funil.arkanlabs.com.br/`

Padroes encontrados:
- especificidade brutal de publico logo na primeira linha;
- promessa unica e concreta no hero;
- subtitulo explicando por que o mecanismo e diferente;
- CTA unico, repetido varias vezes;
- prova social logo no topo;
- secao de entrega estruturada como beneficios, nao como aula/metodo;
- secao de contraste explicando por que o jeito atual falha;
- fechamento binario com dois caminhos;
- FAQ simples e objetivo;
- nenhuma dispersao com precificacao no fluxo principal.

Conclusao:
A nova landing do SolarZap precisa herdar a logica de conversao da ARKAN, mas com identidade visual e tese comercial adaptadas para a mentoria/implantacao atual.

## 3. Nova direcao estrategica
A pagina principal nao deve vender “conteudo”, “sistema operacional” ou “sofisticacao”.
Ela deve vender esta ideia:

**Sua operacao solar nao precisa de mais explicacao. Precisa de um comercial que pare de perder venda entre WhatsApp, visita, proposta e follow-up.**

A mentoria sera enquadrada como:
- implantacao comercial para empresas de energia solar;
- com software + metodo + acompanhamento;
- para organizar base, processo e prospeccao;
- com objetivo de gerar mais reunioes, mais avancos e menos vazamento comercial.

## 4. Estrutura nova da landing principal `/`
### Hero
- linha de especificidade para integradoras/empresas de energia solar;
- headline extremamente direta e comercial;
- subtitulo curto explicando o mecanismo;
- CTA primario unico;
- prova social logo abaixo do hero com videos/print.

### Prova social acima da dobra estendida
- 2 videos de clientes/operacao solar em destaque;
- 1 print solar em destaque;
- se couber, mosaico secundario com outros resultados de outros setores, rotulado corretamente.

### Bloco de entrega
Formato inspirado na ARKAN:
- Base reativada com cadencia;
- Processo comercial padronizado;
- Prospeccao ativa implantada;
- SolarZap rodando como centro operacional.

### Bloco de contraste
- “Chega de conversas que somem, visitas que nao avancam e propostas esquecidas”;
- explicar de forma binaria por que a operacao trava hoje;
- reforcar que mais lead em cima do caos so acelera desperdicio.

### Bloco de mecanismo
- mostrar em 3 movimentos: ativar base, padronizar venda, implantar prospeccao;
- reduzir a explicacao tecnica ao minimo necessario;
- usar copy curta, decisiva e escaneavel.

### Bloco de CTA intermediario
- repeticao da chamada para agendar diagnostico/reuniao.

### FAQ
- poucas perguntas, respostas curtas, objeções reais.

### Fechamento
- secao “agora e com voce” em formato de dois caminhos;
- CTA final forte;
- sem tabela de preco na pagina de trafego pago.

## 5. Versao com precificacao `/oferta`
Sera criada uma segunda variante da pagina com a mesma base visual e narrativa, mas incluindo a secao de precificacao.

### Regras da versao `/oferta`
- mesma copy principal;
- mesmas provas sociais;
- mesma estrutura de conversao;
- incluir bloco de planos/formatos mais abaixo na pagina;
- manter a pagina principal `/` sem precificacao.

## 6. Uso dos novos ativos
### Provas sociais de energia solar
Usar com destaque:
- `WhatsApp Video 2025-11-19 at 15.14.34.mp4`
- `WhatsApp Video 2025-11-19 at 15.15.14.mp4`
- `WhatsApp Image 2025-11-19 at 15.14.12.jpeg`

### Outros prints
- avaliar uso secundario em mosaico discreto;
- rotular como resultados/prints de outras operacoes acompanhadas, sem sugerir que todos sao de energia solar.

## 7. Direcao visual
A pagina continua premium, mas menos “design manifesto” e mais “funnel premium”.

### Ajustes visuais principais
- mais branco/preto/contraste no storytelling, sem tanto ruído decorativo;
- menos componentes de dashboard concorrendo com a mensagem;
- hero mais limpo, mais copy, mais prova;
- sessoes mais curtas;
- CTA azul/laranja muito visivel;
- social proof real com tratamento de destaque e credibilidade.

## 8. Implementacao tecnica
### Arquivos principais
- `src/App.jsx`: reestruturar integralmente em torno da nova arquitetura;
- `src/index.css`: ajustar estilos para uma composicao mais funnel e menos cockpit;
- `public/` ou assets dedicados: mover/copiar videos e prints para uso no front;
- manter compatibilidade com a build atual em Vite.

### Logica de variantes
- detectar rota/path atual;
- `/` = sem preco;
- `/oferta` = com precificacao.

## 9. Checklist de execucao
1. Copiar e organizar os ativos de prova social para o front.
2. Reescrever a estrutura de copy com base no padrao da ARKAN.
3. Inserir provas sociais cedo na pagina.
4. Remover precificacao da versao principal.
5. Criar versao `/oferta` com precificacao.
6. Ajustar motion e layout para manter premium sem perder objetividade.
7. Validar build.
8. Validar preview local da home e da variante com preco.

## 10. Resultado esperado
Ao final, a landing precisa parecer:
- mais especifica;
- mais vendedora;
- mais confiavel;
- mais proxima da landing que ja convertia para voce;
- menos “pagina bonita sobre a mentoria”;
- mais “pagina que faz o dono da operacao pedir a reuniao agora”.
