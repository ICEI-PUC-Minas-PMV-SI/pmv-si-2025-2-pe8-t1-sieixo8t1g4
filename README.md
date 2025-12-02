# Projeto de Estudo de Caso e Implementação de Sistema de Informação  
### Empresa: Re.Nascer Soluções em Resíduos Plásticos Ltda.  
### Curso: Sistemas de Informação — 8º Período  
### Disciplina: Projeto — Trabalho de Conclusão de Curso  

---

# **1. Apresentação da Empresa, Mercado, Processos e Sistemas**

## **1.1 Apresentação da Empresa**

### **1.1.1 Descrição da Empresa**

A **Re.Nascer Soluções em Resíduos Plásticos Ltda.**, fundada em junho de 2021 e localizada em Itaúna–MG, é uma microempresa dedicada ao **gerenciamento, reciclagem e beneficiamento de resíduos plásticos**. Atuando sob a **Política Nacional de Resíduos Sólidos (Lei 12.305/2010)**, a empresa adota práticas sustentáveis como parte da cadeia de **Logística Reversa**, com foco na redução de impactos ambientais.

A empresa conta com cinco colaboradores e mantém parcerias com cooperativas, catadores, empresas privadas e indústrias que necessitam de matéria-prima reciclada. O processo produtivo inclui:

- Recebimento dos resíduos (fardos ou bags)  
- Segregação por tipo de plástico  
- Moagem, lavagem e secagem  
- Acondicionamento em bags  
- Comercialização como matéria-prima reciclada  

Além de seu impacto ambiental positivo, a empresa também contribui socialmente ao gerar renda para cooperativas e catadores.

---

### **1.1.2 Justificativa da Escolha**

A Re.Nascer foi escolhida para este estudo de caso devido:

- À **relevância socioambiental** da operação.  
- Ao uso predominante de **controles manuais**, como anotações em papel, registros informais e planilhas isoladas.  
- À oportunidade acadêmica de demonstrar o impacto dos **Sistemas de Informação** na automação, controle e otimização de processos reais.  
- Ao grande potencial de melhoria através da integração tecnológica.  

A empresa representa um caso real e ideal para aplicação dos conceitos aprendidos no curso, viabilizando uma transformação digital acessível e escalável.

---

## **1.2 Análise de Mercado**

### **1.2.1 Segmento de Atuação**

A Re.Nascer atua no setor de **gestão de resíduos e serviços ambientais**, com foco na cadeia de **Logística Reversa de Resíduos Plásticos**. As atividades incluem:

- Coleta de resíduos pós-consumo e pós-industrial  
- Triagem e segregação  
- Beneficiamento (moagem, lavagem e secagem)  
- Venda de matéria-prima reciclada  

O mercado de reciclagem no Brasil é **fragmentado**, mas em crescimento, impulsionado por:

- Exigências legais (PNRS)  
- Demandas ESG  
- Indústrias buscando reduzir uso de plástico virgem  
- Incentivos ambientais  

---

### **1.2.2 Concorrência e Práticas do Setor**

O setor apresenta três eixos concorrenciais:

#### **Concorrentes Diretos**
Empresas de reciclagem que atuam na mesma região, oferecendo serviços de coleta, beneficiamento e venda de recicláveis.

#### **Concorrentes Indiretos**
- Indústrias que preferem plástico virgem (preço instável mas competitivo)  
- Empresas que importam matéria-prima  
- Aterros e incineradoras, que desviam resíduos da cadeia de reciclagem  

#### **Práticas do Setor**
- Uso intensivo de planilhas e anotações manuais  
- Baixa automação  
- Falta de rastreabilidade  
- Processos operacionais pouco padronizados  
- Dificuldades em integrar coleta, produção e vendas  

Essas práticas tornam o setor sensível a perdas de dados, retrabalho e inconsistência operacional.

---

## **1.2.3 Matriz SWOT**

A matriz SWOT integra informações do documento original e da análise expandida.

| **Forças (S)** | **Fraquezas (W)** |
|----------------|-------------------|
| S1 – Potencial de automação dos processos internos | W1 – Ausência de um sistema integrado |
| S2 – Rigor no processo de beneficiamento | W2 – Elevado retrabalho em processos manuais |
| S3 – Equipe especializada e enxuta | W3 – Dificuldade na geração de relatórios estratégicos |
| S4 – Operação alinhada à legislação ambiental | W4 – Baixa visibilidade do estoque e da movimentação |

| **Oportunidades (O)** | **Ameaças (T)** |
|-----------------------|-----------------|
| O1 – Alta demanda por insumos reciclados | T1 – Flutuação do preço do plástico virgem |
| O2 – Expansão para novos resíduos | T2 – Competidores mais tecnológicos |
| O3 – Tendências ESG | T3 – Novas exigências legais de rastreabilidade |
| O4 – Clientes que exigem relatórios ambientais | T4 – Falhas na cadeia de fornecimento |
| O5 – Parcerias diretas com fornecedores | — |

---

## **1.3 Análise de Processos e Sistemas**

A seguir, um mapeamento detalhado dos processos atuais ("As-Is") e seus problemas.

---

### **1.3.1 Mapeamento dos Processos (As-Is)**

A Re.Nascer opera com **fluxos manuais**, onde a informação é registrada em papel e posteriormente migrada (parcialmente) para planilhas. O processo produtivo inclui:

### **1. Recebimento**
- Materiais chegam em fardos ou bags.  
- Pesos registrados em papel.  
- Digitados somente no fim da semana.  

**Ponto de dor:** alta chance de erros e perda de dados; estoque não atualizado.

---

### **2. Triagem**
- Separação manual por tipo e cor.  
- Sem registro digital da quantidade segregada.  

**Ponto de dor:** ausência de métricas por tipo de material.

---

### **3. Esteira**
- Material segue para o moinho.  
- Sem monitoramento de entrada/saída.  

**Ponto de dor:** sem controle de produtividade.

---

### **4. Trituração**
- Material é moído.  
- Sem registro automático de volume processado.  

**Ponto de dor:** sem indicador de rendimento por lote.

---

### **5. Lavagem e Secagem**
- Processo manual, sem medição digital.  

---

### **6. Embalagem e Armazenagem**
- Bags de 500 kg.  
- Estoque mantido em planilhas manuais.  

**Ponto de dor:** inventário impreciso.

---

### **7. Expedição**
- Venda sem integração com estoque.  
- Pesagem e valor anotados em papel.  

**Ponto de dor:** retrabalho e inconsistências fiscais.

---

## **1.3.2 BPMN – Business Process Model and Notation (Descrição Textual)**

Apesar de não inserir diagramas gráficos no README, a descrição segue o padrão BPMN:

### **Fluxo: Agendamento → Recebimento → Beneficiamento → Estoque → Venda**

#### **Atores**
- Fornecedor  
- Funcionário do Recebimento  
- Administrador  
- Equipe de Produção  
- Vendas  

#### **Etapas BPMN**
1. **Fornecedor solicita agendamento**  
   - Evento inicial  
   - Dados preenchidos em papel atualmente  

2. **Empresa confirma agendamento**  
   - Gateway exclusivo  
   - Em caso de conflito: reagenda  

3. **Recebimento no pátio**  
   - Evento de chegada do caminhão  
   - Registro manual do peso e horário  

4. **Triagem e beneficiamento**  
   - Subprocesso  
   - Etapas de segregação → esteira → moagem → lavagem → secagem  

5. **Atualização de estoque**  
   - Tarefa manual atual  
   - No sistema futuro: atualização automática  

6. **Processo de venda**  
   - Cliente faz pedido  
   - Produto é separado e pesado  
   - Geração manual de comprovante  

7. **Encerramento do processo**  
   - Evento final com documentação em papel ou planilha  

---

## **1.3.3 Sistema Atual: Falhas e Oportunidades de Melhoria**

### **Falhas Identificadas**
- Falta de integração entre setores  
- Dados dispersos e inconsistentes  
- Perda de informações  
- Retrabalho elevado  
- Ausência de relatórios gerenciais  
- Falta de rastreabilidade  

### **Oportunidades**
- Digitalização completa do agendamento  
- Registro em tempo real da coleta e do recebimento  
- Dashboards com indicadores de produtividade e estoque  
- Otimização logística  
- Redução de custos operacionais  
- Maior capacidade de tomada de decisão baseada em dados


# **2. Plano de Inteligência Competitiva (IC)**

O Plano de Inteligência Competitiva (IC) tem como objetivo transformar dados operacionais dispersos em **informações estratégicas**, capazes de orientar decisões de negócio e reduzir incertezas.  
Para a Re.Nascer Soluções em Resíduos Plásticos Ltda., o IC é essencial devido à ausência de registros digitalizados e à necessidade de otimização logística e operacional.

A seguir, são mapeadas as decisões críticas, o KIT, as KIQs, requisitos informacionais e a avaliação das fontes de dados existentes.

---

# **2.1 Identificação das Necessidades de IC**

O levantamento das necessidades de IC considera:

- Gargalos operacionais identificados no Capítulo 1  
- Objetivos estratégicos da empresa  
- KIQs relacionadas à tomada de decisão  
- Falhas de registro e inconsistências  
- Limitações das fontes de dados atuais  

---

## **2.1.1 Mapeamento das Decisões Críticas**

A análise gerou cinco decisões críticas classificadas como essenciais para a sobrevivência e expansão da empresa:

### 🔹 **1. Expansão da Capacidade de Processamento**
A empresa precisa decidir quando investir em novas máquinas (moinhos, secadoras e tanques de lavagem), conforme:
- Volume de material recebido  
- Produtividade por turno  
- Demanda dos clientes  

### 🔹 **2. Seleção de Fornecedores Estratégicos**
Importante para:
- Evitar falta de matéria-prima  
- Garantir níveis mínimos de abastecimento  
- Melhorar rentabilidade por tipo de material  

### 🔹 **3. Precificação dos Materiais**
A empresa deve monitorar:
- Preço do plástico virgem  
- Custos internos de beneficiamento  
- Perdas operacionais  
- Margem por tipo de plástico  

### 🔹 **4. Otimização da Logística de Coleta** *(Decisão-chave escolhida)*
Devido ao alto impacto em:
- Custos com combustível  
- Tempo de deslocamento  
- Tempo de espera no pátio  
- Produtividade diária de coleta  

### 🔹 **5. Inovação em Produtos**
Explorar:
- Novos tipos de plásticos (ABS, PEAD, PET colorido, etc.)  
- Beneficiamento misto  
- Lavagem industrial de maior capacidade  

---

## **2.1.2 Escolha da Decisão-Chave**

### 🎯 **Decisão-Chave:** Otimização da Logística de Coleta

Ela foi escolhida pois:

- Impacta diretamente na produtividade diária  
- Influencia custos de transporte  
- Afeta o tempo de espera dos caminhões  
- Reduz perdas de dados (quando a coleta é manual)  
- Está ligada a duas KIQs essenciais (tempo de espera e volume por rota)  
- É o processo mais crítico no momento e com maior potencial de melhoria imediata  

---

## **2.1.3 Definição do KIT (Key Intelligence Topic)**

O KIT do projeto é:

### 🧭 **“Avaliar a viabilidade da otimização das rotas de coleta e do processo de agendamento para reduzir custos operacionais e aumentar a eficiência do recebimento.”**

Este KIT orienta todo o desenvolvimento do Sistema de Informação proposto.

---

## **2.1.4 Formulação das KIQs (Key Intelligence Questions)**

Com base na decisão-chave (logística), foram definidas as seguintes KIQs:

1. **Qual é o tempo médio de espera para descarregamento?**  
2. **Qual a frequência de coleta por fornecedor?**  
3. **Qual o volume de coleta por rota e por período (dia/semana/mês)?**  
4. **Há gargalos no agendamento que impactam o tempo de espera?**  
5. **Quais os custos e perdas de dados associados ao processo manual?**  
6. **Qual é o peso real coletado comparado ao peso estimado?**  
7. **Há fornecedores que geram maior retorno financeiro que outros?**

Essas perguntas definem como o sistema deve ser construído.

---

# **2.2 Especificação de Requisitos Informacionais**

A seguir, são apresentados os requisitos que o Sistema de Informação deve atender para responder às KIQs e suportar decisões logísticas e operacionais.

---

## **2.2.1 Requisito 1 — Módulo de Cadastros (CRUD)**

### Funcionalidades:
- Cadastro e edição de fornecedores, clientes, produtos e pontos de coleta.  
- Registro de campos obrigatórios (ex.: tipo de material, localização).  

### Dados necessários:
- Nome, CNPJ/CPF, endereço, telefone  
- Tipo de fornecedor (catador, cooperativa, empresa)  
- Tipo de material fornecido  

### KIQs atendidas:
- KIQ 2  
- KIQ 7  

---

## **2.2.2 Requisito 2 — Módulo de Agendamento de Coleta**

### Funcionalidades:
- Agendar coletas com data/hora.  
- Atualizar status (Agendado → Confirmado → Coletado).  
- Registrar peso estimado.  

### Dados necessários:
- Data/hora da coleta  
- Ponto de coleta  
- Status  
- Peso estimado  
- Tipo de material  

### KIQs atendidas:
- KIQ 2  
- KIQ 3  
- KIQ 4  

---

## **2.2.3 Requisito 3 — Módulo de Registro de Recebimento**

### Funcionalidades:
- Registrar peso real coletado  
- Registrar timestamps automáticos (chegada / início / fim da descarga)  
- Registrar valor negociado por kg  

### Dados necessários:
- Peso real  
- Tempo de espera  
- Valor por kg  
- Material recebido  

### KIQs atendidas:
- KIQ 1  
- KIQ 3  
- KIQ 5  
- KIQ 6  

---

## **2.2.4 Requisito 4 — Módulo de Vendas**

### Funcionalidades:
- Registrar saída de produtos  
- Atualizar estoque automaticamente  
- Registrar valor unitário e total  

### KIQs atendidas:
- KIQ 7  

---

## **2.2.5 Requisito 5 — Módulo de Relatórios e BI**

### Funcionalidades:
- Dashboards com indicadores logísticos  
- Relatórios exportáveis (PDF/Excel)  
- Filtros por data, tipo de material, fornecedor  

### Indicadores necessários:
- Tempo médio de espera  
- Volume por rota  
- Peso estimado vs. peso real  
- Ranking de fornecedores  
- Evolução mensal de entradas e vendas  

### KIQs atendidas:
**Todas (1 a 7)**

---

# **2.3 Levantamento das Fontes de Dados Existentes (As-Is)**

A seguir, uma tabela consolidada com base no documento original + adições.

| Fonte de Dados | Formato | Conteúdo | Responsável | Frequência | Problemas |
|----------------|---------|----------|-------------|------------|-----------|
| Cadernos de Agendamento | Papel | Data, fornecedor, estimativa | Escritório | Diário | Perda de dados |
| Planilha de Recebimento | Excel | Peso real, data, fornecedor | Escritório | Semanal | Erros de transcrição |
| Cadernos de Coleta | Papel | Local, peso, tipo material | Coleta | Diário | Falhas e inconsistências |
| Planilha de Vendas | Excel | Cliente, produto, peso, valor | Gerência | Mensal | Sem integração com estoque |
| Agenda de Contatos | Papel / celular | Telefones e endereços | Escritório | Esporádico | Informal e incompleto |
| Controle de Ponto | Manual | Horários | Administrativo | Diário | Não integrado a rotinas |

---

# **2.3.2 Avaliação da Qualidade e Acessibilidade dos Dados**

### **Confiabilidade: Baixa**
Dados inconsistentes, duplicados ou perdidos.

### **Atualização: Lenta**
Informações só migradas semanalmente.

### **Centralização: Inexistente**
Dados espalhados em papéis e planilhas.

### **Formato: Irregular**
Campos não padronizados; ausência de timestamps.

### **Acessibilidade: Restrita**
Somente funcionários específicos têm acesso às planilhas.

---

# **2.3.3 Avaliação do Sistema Atual: Limitações e Potenciais**

### **Principais lacunas:**

| Lacuna Atual | Dado Necessário | Como o Sistema Soluciona | KIQ Relacionada |
|--------------|-----------------|---------------------------|------------------|
| Sem registro de tempo de espera | Timestamps | Botões "Iniciar" e "Finalizar descarga" | KIQ 1 |
| Localização informal | Geolocalização | Campos latitude/longitude | KIQ 3 e 4 |
| Sem status claro | Status formal | Dropdown obrigatório | KIQ 2, 3, 4 |
| Peso estimado sem validação | Peso real | Registro no recebimento | KIQ 6 |
| Falta de integração | Histórico estruturado | Banco de dados centralizado | Todas |

---

# **2.4 Compliance de TI e Segurança da Informação**

## **2.4.1 Normas e Regulamentações Aplicáveis**

- **LGPD**  
- **ISO/IEC 27001**  
- **Marco Civil da Internet**  
- **Normas Contábeis (estoque e vendas)**  

---

## **2.4.2 Políticas de Segurança**

- Criptografia em repouso e em trânsito  
- Backups frequentes  
- Exclusão segura conforme LGPD  
- RBAC (controle de permissões)  
- Autenticação com senha forte  

---

## **2.4.3 Monitoramento Contínuo**

- Monitorar logs de acesso  
- Auditorias trimestrais de permissões  
- Testes periódicos de segurança  
- Registro de alterações no sistema


  # **3. Desenvolvimento de Alternativas de Soluções de Sistemas de Informação (SI)**

Este capítulo apresenta o desenvolvimento das alternativas de solução para os problemas identificados no Plano de Inteligência Competitiva (IC).  
O objetivo é propor, avaliar e selecionar tecnologias, métodos e funcionalidades que comporão o Sistema de Informação integrado para a Re.Nascer Soluções em Resíduos Plásticos Ltda.

A construção das alternativas foi guiada por:

- Problemas operacionais e estratégicos identificados no Capítulo 1  
- KIT e KIQs definidos no Capítulo 2  
- Necessidades de rastreabilidade, padronização e automação  
- Aderência à LGPD, boas práticas e segurança  

---

# **3.1 Conexão das Alternativas com o Plano de IC**

As alternativas foram desenvolvidas de forma diretamente alinhada ao KIT e às KIQs definidas anteriormente, garantindo que o sistema não apenas digitalize rotinas, mas gere **inteligência acionável**.

A seguir, uma tabela consolidada ligando problemas, soluções estratégicas e funcionalidades propostas:

| **Problema Identificado** | **Solução Estratégica (IC)** | **Funcionalidade no Sistema de Informação** |
|---------------------------|------------------------------|----------------------------------------------|
| Agendamento manual e sem controle | Centralização e padronização | Módulo de Agendamento com status e timestamps |
| Perda de dados em papel | Digitalização na origem | Registro digital via web/app com validações |
| Falta de visibilidade de rotas | Monitoramento logístico | Dashboard com volume por rota/período |
| Dificuldade para rastrear estoque | Integração ponta a ponta | Fluxo Recebimento → Estoque → Vendas |
| Falta de histórico para decisões | IC estruturada | Relatórios e indicadores automatizados |
| Peso estimado sem confirmação | Controle operacional | Registro de Peso Real no recebimento |
| Falha na comunicação entre setores | Integração de dados | Banco de dados centralizado e sincronizado |

A partir dessas necessidades, são elaboradas as alternativas de solução.

---

# **3.2 Alternativas de Solução de SI**

As soluções foram agrupadas em três categorias:

1. Alternativas Tecnológicas  
2. Alternativas Funcionais  
3. Alternativas de Arquitetura (Infraestrutura + Segurança)  

Cada alternativa foi avaliada considerando custo-benefício, escalabilidade, requisitos legais e aderência ao IC.

---

# **3.2.1 Alternativas Tecnológicas**

A tabela a seguir apresenta as tecnologias consideradas:

| **Camada** | **Alternativa 1 – Recomendada** | **Alternativa 2** | **Alternativa 3** |
|-------------|-------------------------------|--------------------|--------------------|
| Frontend | React + Tailwind CSS | Angular | Vue.js |
| Backend | Node.js (Express) | Django (Python) | Spring Boot (Java) |
| Banco de Dados | PostgreSQL | Firebase Firestore | MySQL |
| Infraestrutura | Google Cloud Platform | AWS | Azure |
| Autenticação | JWT + RBAC | Firebase Auth | Keycloak |
| DevOps | Docker + GitHub Actions | GitLab CI/CD | Jenkins |

### ➤ **Motivação da escolha da alternativa recomendada:**

- **React**: flexível, rápido e com grande comunidade.  
- **Node.js**: ideal para APIs rápidas e escaláveis.  
- **PostgreSQL**: confiabilidade, integridade relacional e baixo custo.  
- **Google Cloud**: serviços integrados e excelente custo-benefício para pequenas empresas.  

Essa arquitetura suporta alta disponibilidade, segurança, integrações futuras e escalabilidade.

---

# **3.2.2 Alternativas Funcionais**

Nesta seção, são detalhadas as funcionalidades que compõem as alternativas de solução, alinhadas ao KIT.

---

## **3.2.2.1 Módulo de Cadastros (CRUD)**

### Funcionalidades:
- Cadastro de fornecedores, clientes, produtos, pontos de coleta.  
- Upload de documentos (ex.: notas fiscais, fotos) se necessário.  
- Validação automática de CPF/CNPJ.  

### Benefícios:
- Padronização dos dados  
- Redução de informações duplicadas  
- Acesso rápido a histórico e contatos  

---

## **3.2.2.2 Módulo de Agendamento de Coletas**

### Funcionalidades:
- Criar e editar agendamentos  
- Registrar peso estimado  
- Histórico do fornecedor  
- Linha do tempo com status:  
  - Agendado  
  - Confirmado  
  - A caminho  
  - Coletado  
  - Cancelado  

### Benefícios:
- Visão organizada da demanda  
- Redução de falhas de comunicação  
- Base para cálculo de rotas e produtividade  

---

## **3.2.2.3 Módulo de Recebimento de Materiais**

### Funcionalidades:
- Registro do peso real  
- Registro do tempo de espera (entrada → descarga → saída)  
- Auditoria de divergência peso estimado X real  
- Classificação do tipo de plástico  

### Benefícios:
- Maior confiabilidade operacional  
- Dados essenciais para IC  
- KPIs logísticos (produtividade por hora, tempo médio, etc.)  

---

## **3.2.2.4 Módulo de Estoque**

### Funcionalidades:
- Registro automático após recebimento  
- Cálculo de estoque consolidado por tipo de plástico  
- Alertas quando estoque crítico  

### Benefícios:
- Visibilidade operacional  
- Base para vendas e controle financeiro  

---

## **3.2.2.5 Módulo de Vendas**

### Funcionalidades:
- Lançamento de vendas com cliente, peso e valor  
- Ficha técnica por produto  
- Integração com estoque  
- Relatórios mensais  

---

## **3.2.2.6 Módulo de Dashboards (BI)**

### Indicadores propostos:
- Tempo médio de espera  
- Ranking de fornecedores  
- Volume por rota/período  
- Peso estimado × peso real  
- Produto mais vendido  
- Evolução mensal de recebimentos e vendas  

### Benefícios:
- Tomada de decisão orientada a dados  
- Base para inovação e expansão  
- Respostas diretas às KIQs  

---

# **3.2.3 Alternativas de Arquitetura e Infraestrutura**

A infraestrutura deve atender requisitos como:

- Segurança  
- Alta disponibilidade  
- Conformidade com LGPD  
- Baixo custo operacional  

### **Infraestrutura Recomendada (Cloud First)**

| Camada | Recurso | Justificativa |
|--------|---------|----------------|
| Aplicação | Google Cloud Run | Escalabilidade automática e baixo custo |
| Banco | Cloud SQL (PostgreSQL) | Segurança e backups automáticos |
| Armazenamento | Cloud Storage | Upload seguro de arquivos |
| Autenticação | Firebase Auth | Simples, seguro e barato |
| Logs | Cloud Logging | Acompanhamento em tempo real |

---

# **3.3 Modelagem da Solução (Requisitos + Fluxos)**

Nesta seção, apresenta-se a modelagem necessária para representar graficamente os processos e validar o fluxo antes do desenvolvimento.

---

# **3.3.1 Histórias de Usuário (User Stories)**

| **Ator** | **Eu, como...** | **Quero...** | **Para...** |
|----------|----------------|--------------|-------------|
| Fornecedor | Fornecedor | Agendar coleta | Agilizar meu atendimento |
| Administrador | Gestor/Administrador | Visualizar agendamentos | Planejar rotas |
| Funcionário | Recebimento | Registrar peso | Garantir precisão |
| Vendas | Vendedor | Registrar venda | Atualizar estoque e receita |
| Gestor | Diretor/Gerente | Ver dashboards | Apoiar decisões |

---

# **3.3.2 Modelo de Dados (Simplificado)**

### **Entidades Principais:**

- **Fornecedor**  
- **Produto (Tipo de Plástico)**  
- **Ponto de Coleta**  
- **Agendamento**  
- **Recebimento**  
- **Estoque**  
- **Venda**  
- **Usuário (Autenticação e Permissões)**  

### **Relacionamentos (Resumidos):**
- Um **Fornecedor** pode ter vários **Agendamentos**  
- Um **Agendamento** gera um **Recebimento**  
- Um **Recebimento** atualiza o **Estoque**  
- Uma **Venda** reduz o **Estoque**  

---

# **3.3.3 BPMN – Fluxo de Agendamento e Coleta**

*(Representado em Markdown para fins de documentação; pode ser futuramente redesenhado em BPMN 2.0.)*


Fluxo detalhado:

1. Fornecedor solicita coleta.  
2. Sistema valida dados e cria agendamento.  
3. Administrador define rota e confirma.  
4. Motorista coleta o material.  
5. Funcionário registra peso real no recebimento.  
6. Sistema registra timestamps.  
7. Estoque é atualizado automaticamente.  

---

# **3.4 Avaliação e Escolha da Alternativa Final**

Com base nos critérios:

- Custo  
- Complexidade  
- Facilidade de adoção  
- Escalabilidade  
- Alinhamento com o IC  
- Segurança (LGPD)  

A alternativa recomendada é:

### ✔️ **Arquitetura Web Full-Stack: React + Node.js + PostgreSQL + Google Cloud**  

Com os módulos:

- Cadastros  
- Agendamentos  
- Recebimentos  
- Estoque  
- Vendas  
- Dashboards/Relatórios  

E integrações:

- Autenticação JWT  
- Armazenamento em Cloud Storage  
- Logs em Cloud Logging  

Essa solução atende **100% das KIQs**, entrega rastreabilidade ponta a ponta e reduz retrabalho e perdas de dados.

# **4. Arquitetura Detalhada e Modelagem Técnica da Solução**

Este capítulo apresenta a arquitetura técnica completa do Sistema de Informação proposto para a Re.Nascer Soluções em Resíduos Plásticos Ltda.  
Inclui camadas, componentes, integrações, estratégias de segurança e padrões de desenvolvimento recomendados.

---

# **4.1 Arquitetura Geral da Solução**

A arquitetura adotada segue o padrão **Web Full-Stack Modular**, composta pelas camadas:

1. **Frontend (Interface do Usuário)**  
2. **Backend (API REST + Regras de Negócio)**  
3. **Banco de Dados Relacional (PostgreSQL)**  
4. **Armazenamento de Arquivos (Midias/Documentos)**  
5. **Infraestrutura Cloud (Google Cloud Platform)**  

A arquitetura foi definida considerando:
- Escalabilidade  
- Baixo custo  
- Curva de aprendizado compatível  
- Segurança (LGPD)  
- Simplicidade operacional  

---

# **4.2 Arquitetura Lógica**

A arquitetura lógica define a forma como os componentes se comunicam.

Usuário → Interface Web (React)
↓
API Gateway / HTTPS
↓
Backend (Node.js/Express)
↓
PostgreSQL (Cloud SQL)
↓
Armazenamento (Cloud Storage)

diff
Copy code

### Componentes:

### **Frontend (React + Tailwind CSS)**
- Interface responsiva  
- Formulários validados  
- Dashboards  
- Consumo de APIs via Axios/Fetch  
- Autenticação JWT  

### **Backend (Node.js/Express)**
- CRUDs completos  
- Autenticação e autorização (JWT + RBAC)  
- Logs  
- Exportação de relatórios (PDF/Excel)  

### **Banco de Dados (PostgreSQL)**  
- Integridade referencial  
- Índices para agilidade nas consultas  
- Views para BI  

### **Armazenamento (Google Cloud Storage)**  
Para:
- Fotos  
- Documentos  
- Notas fiscais  
- Evidências de entrega/recebimento  

---

# **4.3 Modelo de Banco de Dados (ER Simplificado)**

### **Entidades Principais**

#### **Fornecedor**
- id_fornecedor  
- nome  
- tipo (empresa, catador, cooperativa)  
- documento (CPF/CNPJ)  
- contato  
- endereço  

#### **Agendamento**
- id_agendamento  
- id_fornecedor (FK)  
- data_hora  
- peso_estimado  
- status  
- local (ponto de coleta)  
- observações  

#### **Recebimento**
- id_recebimento  
- id_agendamento (FK)  
- peso_real  
- hora_chegada  
- hora_inicio_descarga  
- hora_fim_descarga  
- divergencia (%)  
- valor_total  

#### **Estoque**
- id_produto  
- descricao  
- quantidade  
- unidade_medida (kg)  

#### **Venda**
- id_venda  
- id_produto  
- data  
- cliente  
- quantidade  
- valor_total  

#### **Usuário**
- id_usuario  
- nome  
- email  
- senha_hash  
- papel (admin, operador, gestor)  

---

# **4.4 Fluxos BPMN (Versão Documentada)**

---

## **4.4.1 Fluxo BPMN – Agendamento de Coleta**

Fornecedor → Solicita Agendamento
Sistema → Registra como “Agendado”
Administrador → Confirma / Ajusta data
Sistema → Envia atualização

yaml
Copy code

---

## **4.4.2 Fluxo BPMN – Recebimento**

Caminhão Chega → Registrar Hora Chegada
Descarregamento Inicia → Registrar Início
Descarregamento Finaliza → Registrar Fim
Funcionário → Inserir Peso Real
Sistema → Atualiza Estoque

yaml
Copy code

---

## **4.4.3 Fluxo BPMN – Vendas**

Vendedor → Registra Venda
Sistema → Valida Estoque
Sistema → Atualiza Estoque
Sistema → Gera Nota/Recibo

yaml
Copy code

---

# **4.5 Padrões de Desenvolvimento**

### **Padrões Seguidos:**
- RESTful API  
- Clean Code  
- MVC  
- Separação de camadas (Controller, Service, Repository)  
- DTOs para entrada/saída  
- Hash de senhas (bcrypt)  

### **Boas Práticas:**
- Paginação em todas as consultas  
- Soft delete (não excluir registros sensíveis)  
- Timestamps automáticos  
- Logs de auditoria  

---

# **4.6 Segurança e Compliance**

O sistema foi projetado para estar em conformidade com:

- **LGPD**  
- **Marco Civil da Internet**  
- **ISO/IEC 27001** (boas práticas aplicáveis)

### **Medidas de Segurança Implementadas:**
- Criptografia em trânsito (HTTPS)  
- Criptografia em repouso (Cloud SQL Encryption)  
- Hash de senhas (bcrypt)  
- Controle de acesso via RBAC  
- Logs de auditoria  
- Política de backup diária  

---

# **4.7 Deploy, Integração Contínua e Observabilidade**

### **Pipeline (CI/CD via GitHub Actions)**  
- Lint  
- Testes  
- Build  
- Deploy automático no Cloud Run  

### **Observabilidade**
- Cloud Logging  
- Cloud Monitoring  
- Alertas em caso de falhas  

---

# **4.8 Considerações Técnicas Finais**

A arquitetura proposta é:

- Escalável  
- Moderna  
- Baixo custo  
- Segura  
- Adequada à realidade da empresa  
- Fácil de evoluir  

---

# **5. Conclusão e Trabalhos Futuros**

Este capítulo encerra o Trabalho de Conclusão de Curso, consolidando os resultados obtidos e propondo evoluções futuras para o sistema.

---

# **5.1 Conclusão do Projeto**

O desenvolvimento deste estudo de caso demonstrou que a Re.Nascer Soluções em Resíduos Plásticos Ltda. possui processos críticos que dependem fortemente de registros manuais, o que gera:

- Retrabalho  
- Falta de integração  
- Atrasos operacionais  
- Perdas de dados  
- Ausência de indicadores confiáveis  

A análise de mercado, o mapeamento dos processos, o diagnóstico das necessidades informacionais e a elaboração do Plano de Inteligência Competitiva permitiram propor um Sistema de Informação completo, capaz de:

- Modernizar e digitalizar todos os processos operacionais  
- Oferecer visibilidade em tempo real  
- Eliminar perdas de registros  
- Integrar coleta → recebimento → estoque → vendas  
- Suportar análises estratégicas  
- Atender normas e regulamentações  
- Reduzir custos e aumentar eficiência  

A arquitetura final proposta atende às KIQs e entrega uma plataforma robusta, escalável e segura.

Assim, este projeto cumpre seu objetivo de demonstrar a aplicação prática dos conhecimentos adquiridos no curso de **Sistemas de Informação** e gerar impacto real na produtividade e sustentabilidade da empresa.

---

# **5.2 Limitações da Solução (Curto Prazo)**

- Dependência de treinamento de equipe  
- Necessidade de adaptação cultural para abandonar o papel  
- Infraestrutura local da empresa (internet/wi-fi) pode exigir melhorias  
- Versão inicial não inclui app mobile nativo  

---

# **5.3 Trabalhos Futuros**

Para evolução do sistema, recomenda-se:

---

### **1. Aplicativo Mobile (Android/iOS)**
Para coleta em campo, registros fotográficos e OCR de documentos.

---

### **2. Reconhecimento de Materiais por IA**
Identificar tipos de plástico utilizando visão computacional.

---

### **3. Integração com Sistemas de Clientes e Cooperativas**
Via API ou EDI.

---

### **4. Módulo Financeiro Completo**
Com:
- Contas a pagar  
- Contas a receber  
- Emissão de boletos  
- Fluxo de caixa  

---

### **5. Rastreabilidade Blockchain**
Para cadeia de reciclagem e certificação ambiental.

---

### **6. Otimização de Rotas com Algoritmos**
Como:
- Dijkstra  
- A*  
- Algoritmos genéticos  
- Google Maps API  

---

### **7. Machine Learning para Previsão de Volume**
Baseada em:
- Histórico de recebimentos  
- Safra de materiais  
- Estações do ano  
- Perfil dos fornecedores  

---

### **8. Certificado Digital para Assinatura Eletrônica**
Para documentos fiscais e contratos.

---

# **5.4 Considerações Finais**

A implementação do SI proposto representa um marco para a empresa, fortalecendo:

- Sustentabilidade  
- Competitividade  
- Transparência  
- Governança  
- Inteligência de Negócios  

O projeto demonstra como a tecnologia pode transformar realidades e otimizar operações em pequenas empresas que atuam na gestão de resíduos, alinhando eficiência operacional com responsabilidade socioambiental.



