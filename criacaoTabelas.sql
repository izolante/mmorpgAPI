-- criação da tabela locais
create table locais (
	codigo serial primary key, 
	nome varchar(40) not null, 
	descricao varchar(250) not null,
	custo integer not null	
);

-- inserindo registros na tabela locais
insert into locais (nome, descricao, custo) 
values ('Cidade dos Iniciantes', 'Cidade utilizada para o spawn de novos personagens', '0')
returning codigo, nome, descricao, custo;



-- criação da tabela criaturas
create table criaturas (
	codigo serial primary key, 
	nome varchar(40) not null, 
	descricao varchar(250) not null,
	nivelbase integer not null,
	local integer not null, 
	foreign key (local) references locais (codigo)
);

-- inserindo alguns registros na tabela criaturas
insert into criaturas (nome, descricao, nivelbase, local) 
values ('Diabrete', 'Criatura alada pequena, possui pele avermelhada e um temperamento explosivo', 1, 1),
('Porco selvagem', 'Criatura parecida com um javali, mas com o dobro do tamanho', 1, 1)
returning codigo, nome, descricao, nivelbase, local;



-- criação da tabela itens
create table itens (
	codigo serial primary key, 
	nome varchar(40) not null, 
	descricao varchar(250) not null,
	custo integer not null	
);

-- inserindo registros na tabela locais
insert into itens (nome, descricao, custo) 
values ('Espada curva', 'Espada simples com lâmina curvada', '10'),
('Lança de ferro fundido', 'Lança feita por um ferreiro inexperiente', '50')
returning codigo, nome, descricao, custo;