# Recuperação de senha

**RF** **Requisitos funcionais**

- O usuario deve poder recuperar sua senha informando o seu email;
- O usuario deve receber um email com instruções de recuperação de senha;
- O usuario deve poder resetar sua senha


**RNF** **Requisitos não funcionais**

- Utilizar MailTrap para testar envios em ambiente de dev;
- Utilizar Amazon SES para envios em produção;
- O envio de emails deve acontecer em segundo plano(background job)

**RN** **Regras de negócio**

- O link para resetar senha deve expirar em 2h
- O usuario precisa confirmar a nova senha ao resetar sua senha

# Atualização do perfil

**RF** **Requisitos funcionais**

- O usuario deve poder atualizar seu nome, email e senha;

**RN** **Regras de negócio**

- O usuario não pode alterar seu email para um já utilizado por outro usuário;
- Para atualizar sua senha o usuario deve informar sua senha antiga;
- Para atualizar sua senha o usuario precisa confirmar sua senha;

# Painel do prestador

**RF** **Requisitos funcionais**

- O usuario deve poder listar seus agendamentos de um dia especifico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas

**RNF** **Requisitos não funcionais**

- Os agendamentos do prestador no dia devem ser armazenados em cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
- As notificações do prestador devem sem enviadas em tempo-real utilizando Socket.io;


**RN** **Regras de negócio**

- A Notificação deve ter um status de lida/não lida para que o prestador possa controlar;

# Agendamento de serviços

**RF** **Requisitos funcionais**

- O usuario deve poder listar todos os prestadores de serviço cadastrados
- O usuario deve poder listar os dias de um mes com pelo menos um horario disponível de um prestador
- O usuario deve poder listar horarios disponiveis em um dia especifico de um prestador;
- O usuario deve poder realizar um novo agendamento com um prestador;

**RNF** **Requisitos não funcionais**

- A listagem de prestadores devem ser armazenadas em cache;

**RN** **Regras de negócio**

- Cada agendamento deve durar 1h exatamente;
- Os agendamentos devem estar disponiveis entre as 8h e as 18h(Primeiro as 8h e ultimo as 17h);
- O usuario nao pode agendar em um horario ja ocupado;
- O usuario não pode agendar um horario que ja passou;
- O usuario não pode agendar serviços consigo mesmo;
