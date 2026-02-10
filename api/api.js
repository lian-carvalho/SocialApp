import DataBase from "./config"

const API = new DataBase();

API.createNewAccount(0, 'liandev', 'Lian Dev', 'Ceará, Brazil', 'Desenvolvedor e Designer', 'liandev.png', 360);
API.createNewAccount(1, 'socialapp', 'Social App', 'Ceará, Brazil', 'Novo projeto que saiu do forno (Social App)', 'sociallogo.png', 160);
API.createNewAccount(2, 'barbershop', 'Barbearia', 'Ceará, Brazil', 'Novo projeto que saiu do forno (Barbearia)', 'barbericon.png', 300);
API.createNewAccount(3, 'movebusiness', 'Move', 'Ceará, Brazil', 'Novo projeto vindo (Move)', 'moveprofile.png', 0);

API.createNewPost(0, 0, 'socialbanner.png', 'Desenvolvendo o Social App', 'Processo de desenvolvimento do app', 'há 10 horas', false, undefined, true);
API.createNewPost(1, 0, 'liandevbanner.png', 'Nova landing page', 'Querendo um website apenas seu? Só encomendar comigo', 'há 2 horas', true, 0);
API.createNewPost(2, 1, 'socialbanner.png', 'Bem vindo ao melhor app de todos', '', 'há 5 horas');
API.createNewPost(3, 2, 'barberbanner.png', 'Melhor barbearia da região...', '', 'há 8 horas');
API.createNewPost(4, 3, 'movebanner.png', 'Maior empresa de mudança do Brasil', '', 'há 1 dia');

API.createNewProduct(0, 'Website completo', 'Seu site completamente personalizado', 'website-completo.jpeg', 'Há discutir', true);

API.createNewNotification(0, 0, 'Já me seguiu nas redes?');

export default API