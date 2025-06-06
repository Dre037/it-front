# it-front case

Este projeto foi desenvolvido utilizando o Angular 13

## Gerenciamento de Estado

Buscando atender demanda de escalabilidade e alta disponibilidade, adotei **recursos de gerenciamento de estado**. Essa abordagem permite um controle eficaz dos dados compartilhados entre os componentes e a gestão eficiente do fluxo de informações no sistema. 

Esses recursos ajudam a evitar problemas como inconsistências de dados, melhorando a performance e tornando o sistema mais resiliente a falhas, o que é crucial para projetos de grande escala.

## Garantia de Qualidade

Para garantir um funcionamento de qualidade e a confiabilidade do sistema, implementei **testes de integração e unitários** com o **Jest** como framework de testes. Essa abordagem permite:

- **Testes Unitários**: Validação de funções e componentes de forma isolada, garantindo que cada unidade de código se comporte conforme esperado.
  
- **Testes de Integração**: Verificação de que diferentes partes do sistema se comunicam corretamente entre si, garantindo a funcionalidade do fluxo completo.

A utilização de testes automatizados assegura que as mudanças no código não introduzam regressões e que o sistema continue funcionando de forma robusta mesmo com alterações e evoluções do projeto.

### Benefícios dos Testes com Jest

- **Velocidade**: Jest oferece uma execução rápida dos testes, o que facilita o ciclo de desenvolvimento.
- **Cobertura de Código**: Fácil integração com ferramentas de cobertura de código, ajudando a identificar áreas do sistema que não estão sendo testadas.
- **Facilidade de Uso**: Configuração simples e integração com o Angular CLI, permitindo testes eficazes com mínima complexidade.

### Como Rodar os Testes

Como estamos utilizando o **Jest**, basta rodar:
```bash
npx jest
```

Ou

```bash
npm run test
```

## Como Rodar o Projeto

Este projeto utiliza **Docker** para facilitar a configuração e execução em diferentes ambientes. Para rodar o projeto, basta executar o seguinte comando:

```bash 
docker-compose up
```

Após isso estará disponível na porta http://localhost:8080

Caso não queira utilizar o docker, é possível rodar esse projeto utilizando a CLI do Angular

```bash
npm install
npm run start
```

Após isso estará disponível na porta http://localhost:4200

## Informações Importantes

O projeto se comunica com uma API oferecida por esse repositório [**it-api-case**](https://github.com/adelbs/it-api-case) é necessário baixar este repositório e rodá-lo para conseguir usufruir da aplicação Front-end

```bash
node index.js
```

## Futuro

### Observalidade, Monitoramento e LOG

Para essas situações, traria soluções como o [***Sentry***](https://sentry.io) para monitoramento dos LOGs com registros de Warning e Exceção

### Segurança

Ao ter requisições que precisam de autenticação, adicionar etapas com Interceptors.

### Acessibilidade

Ajustar pontos de SEO do sistema, e realizar testes com leitor de tela para garantir as identificações

### Esteira CI/CD

Construir pipelines capazes de testar o código, e distribuir ele.
