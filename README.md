# Projeto Angular 13

Este projeto foi desenvolvido utilizando o Angular 13, uma das versões mais estáveis e robustas da plataforma Angular. O foco principal foi garantir a escalabilidade e alta disponibilidade do sistema, além de proporcionar uma excelente experiência para os usuários finais.

## Gerenciamento de Estado

Para garantir a escalabilidade e alta disponibilidade do projeto, adotamos **recursos de gerenciamento de estado**. Essa abordagem permite um controle eficaz dos dados compartilhados entre os componentes e a gestão eficiente do fluxo de informações no sistema. 

Esses recursos ajudam a evitar problemas como inconsistências de dados, melhorando a performance e tornando o sistema mais resiliente a falhas, o que é crucial para projetos de grande escala.

## Garantia de Qualidade

Para garantir um funcionamento de qualidade e a confiabilidade do sistema, implementamos **testes de integração e unitários** utilizando o **Jest** como framework de testes. Essa abordagem permite:

- **Testes Unitários**: Validação de funções e componentes de forma isolada, garantindo que cada unidade de código se comporte conforme esperado.
  
- **Testes de Integração**: Verificação de que diferentes partes do sistema se comunicam corretamente entre si, garantindo a funcionalidade do fluxo completo.

A utilização de testes automatizados assegura que as mudanças no código não introduzam regressões e que o sistema continue funcionando de forma robusta mesmo com alterações e evoluções do projeto.

### Benefícios dos Testes com Jest

- **Velocidade**: Jest oferece uma execução rápida dos testes, o que facilita o ciclo de desenvolvimento.
- **Cobertura de Código**: Fácil integração com ferramentas de cobertura de código, ajudando a identificar áreas do sistema que não estão sendo testadas.
- **Facilidade de Uso**: Configuração simples e integração com o Angular CLI, permitindo testes eficazes com mínima complexidade.
  
A combinação do gerenciamento de estado eficiente com uma robusta estratégia de testes permite que o projeto Angular 13 seja escalável, confiável e de alta performance.

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
## Informações Importantes

O projeto se comunica com uma API oferecida por esse repositório [**it-api-case**](https://github.com/adelbs/it-api-case) é necessário clonar ele em uma pastinha

Minha recomendação é seguir essa estrutura

```bash
-- it-case/
    --it-api-case/
    --it-front/
```

Pois o dockerfile é capaz de configurar ambos os ambientes e permitir seu funcionamento sem muito esforço.