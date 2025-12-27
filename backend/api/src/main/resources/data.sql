-- 1. Cria os Pacotes de Viagem (PREÇOS BAIXOS PARA TESTE)
INSERT INTO pacote_viagem (titulo, destino, descricao, data_partida, duracao_dias, preco, vagas_disponiveis, url_foto_principal, featured) VALUES 
('Aventura na Patagônia', 'El Chaltén, Argentina', 'Uma jornada de trekking...', '2025-11-10', 10, 50.00, 8, 'https://res.cloudinary.com/djrzoct2q/image/upload/v1759975106/ugjkn7jv4cpjqac2mqzg.jpg', true),
('Cores do Atacama', 'San Pedro de Atacama, Chile', 'Explore o deserto mais árido...', '2026-04-22', 7, 45.00, 12, 'https://res.cloudinary.com/djrzoct2q/image/upload/v1759877778/bzwgtf28wh6uikqj7ucy.jpg', true),
('Mergulho em Fernando de Noronha', 'Fernando de Noronha, Brasil', 'Descubra a vida marinha...', '2026-09-05', 5, 60.00, 6, 'https://res.cloudinary.com/djrzoct2q/image/upload/v1759877760/z7wz4l1ty6uwnexa3ytq.jpg', false),
('Aurora Boreal na Islândia', 'Reykjavík, Islândia', 'Uma caçada inesquecível pelas luzes...', '2023-12-01', 8, 80.00, 10, 'https://res.cloudinary.com/djrzoct2q/image/upload/v1759871943/uqquyxcqjxelb8s9cjbd.jpg', false);

-- 2. Cria os Usuários (SEU CPF REAL)
INSERT INTO usuario (nome, email, senha, roles, cpf) VALUES 
('Administrador', 'admin@caracameusonho.com', '$2a$10$c/DeLNNd.MrINbV2mwDNFuaXcEGAyw/lN9.6wAge9CrwPp2W07Uc2', 'ROLE_ADMIN', '12345678900'),
('Marlon Rosa', 'marlonrosapl@gmail.com', '$2a$10$BSB7vWpfX6R8hC9PN6CXaOznz9r0rfKeJNJkQw8zBR9Bf4JHVKci2', 'ROLE_USER', '01598558293'); 

-- 3. Cria as Reservas
INSERT INTO reserva (usuario_id, pacote_viagem_id, data_reserva, status) VALUES
((SELECT id from usuario where email = 'marlonrosapl@gmail.com'), (SELECT id from pacote_viagem where titulo = 'Aventura na Patagônia'), '2025-08-10T10:00:00', 'PENDENTE'),
((SELECT id from usuario where email = 'marlonrosapl@gmail.com'), (SELECT id from pacote_viagem where titulo = 'Aurora Boreal na Islândia'), '2023-10-01T15:30:00', 'REALIZADA');

-- 4. Hero
INSERT INTO hero_config (type, title, subtitle, main_url, active) VALUES
('BANNER', 'Viaje com o fotógrafo dos seus sonhos.', 'Quero viver essa experiência', 'https://res.cloudinary.com/djrzoct2q/image/upload/v1756939987/banner_hero_default_v2_x2k9v0.jpg', true);
