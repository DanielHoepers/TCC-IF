drop database tccdaniheitor;
create database tccdaniheitor;
use tccdaniheitor;

create table produto(
id int primary key auto_increment,
titulo text,
descricao text,
preco double,
img text,
tag text
);

create table usuario(
id int primary key auto_increment,
nome text,
email varchar(50),
senha varchar(16)
);

create table img(
id int primary key auto_increment,
idProduto int,
foreign key (idProduto) references produto(id),
nomeArquivo varchar(30)
);

create table departamento(
id int primary key auto_increment,
nome text,
tag text
);

create table carrinho(
id int primary key auto_increment,
idUsuario int,
foreign key (idUsuario) references usuario(id),
total double
);

create table departamento_tem_produto(
idDepartamento int,
foreign key (idDepartamento) references departamento(id),
idProduto int,
foreign key (idProduto) references produto(id)
);

create table carrinho_tem_produto(
idCarrinho int,
foreign key (idCarrinho) references carrinho(id),
idProduto int,
foreign key (idProduto) references produto(id),
quantidade int
);

drop user tccdh21b;
create user 'tccdh21b'@'%' identified with mysql_native_password by 'daniheitor';
grant all on tccdaniheitor.* to 'tccdh21b'@'%';

insert into produto values(
1, "DualShock4", "Controle de ps4", 200.00, "controleps4perfil.jpeg controleps4lado.jpeg", "controle ps4 jogos"); 