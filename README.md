# TCC-IF
Trabalho de Conclusão de Curso (TCC) sobre um site de varejo. Contém código-fonte, documentação e recursos relacionados ao projeto. Desenvolvido em colaboração com Heitor Odorizzi Beltrame para meu técnico de informática no Instituto Federal Catarinense. 

Necessário intalar as dependenncias node

Digite o comando para iniciar o projeto e vá apertando ENTER para confirmar as configurações do projeto:
'''
  npm init
'''
Para instalar a extensão que reinicia a aplicação automaticamente:
´´´
  npm install --save-dev nodemon
  ´´´
Para instalar a dependência para funcionar o servidor e o leitor de json:
´´´
  npm install express body-parser
  ´´´
Abra o arquivo package.json e adicione a seguinte linha em scripts (não se esqueça da vírgula no final da linha anterior):
´´´
  "start": "nodemon index.js"
  ´´´
Para executar a aplicação:
´´´
  npm start
  ´´´
