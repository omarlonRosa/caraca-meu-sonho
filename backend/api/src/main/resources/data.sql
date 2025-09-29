-- backend/api/src/main/resources/data.sql

--DELETE FROM reserva;
--DELETE FROM pacote_viagem;

-- Insere os pacotes SEM especificar o ID
INSERT INTO pacote_viagem (titulo, destino, descricao, data_partida, duracao_dias, preco, vagas_disponiveis, url_foto_principal, featured) VALUES 
('Aventura na Patagônia', 'El Chaltén, Argentina', 'Uma jornada de trekking...', '2025-11-10', 10, 9500.00, 8, 'https://res.cloudinary.com/.../patagonia_wvrjvi.jpg', true);
INSERT INTO pacote_viagem (titulo, destino, descricao, data_partida, duracao_dias, preco, vagas_disponiveis, url_foto_principal, featured) VALUES 
('Cores do Atacama', 'San Pedro de Atacama, Chile', 'Explore o deserto mais árido...', '2026-04-22', 7, 7800.00, 12, 'https://res.cloudinary.com/.../atacama_jqvqkd.jpg', true);
INSERT INTO pacote_viagem (titulo, destino, descricao, data_partida, duracao_dias, preco, vagas_disponiveis, url_foto_principal, featured) VALUES 
('Mergulho em Fernando de Noronha', 'Fernando de Noronha, Brasil', 'Descubra a vida marinha...', '2026-09-05', 5, 12300.00, 6, 'https://res.cloudinary.com/.../noronha_e4ue6l.jpg', false);
INSERT INTO pacote_viagem (titulo, destino, descricao, data_partida, duracao_dias, preco, vagas_disponiveis, url_foto_principal, featured) VALUES 
('Aurora Boreal na Islândia', 'Reykjavík, Islândia', 'Uma caçada inesquecível pelas luzes...', '2024-12-01', 8, 15500.00, 10, 'https://res.cloudinary.com/.../iceland_qyswub.jpg', false);

-- Insere os usuários SEM especificar o ID
INSERT INTO usuario (nome, email, senha, roles) VALUES ('Administrador', 'admin@caracameusonho.com', '$2a$10$c/DeLNNd.MrINbV2mwDNFuaXcEGAyw/lN9.6wAge9CrwPp2W07Uc2', 'ROLE_ADMIN');


INSERT INTO usuario (nome, email, senha, roles) VALUES 
('Cliente Viajante', 'viajante@email.com', '$2a$10$BSB7vWpfX6R8hC9PN6CXaOznz9r0rfKeJNJkQw8zBR9Bf4JHVKci2', 'ROLE_USER');

-- Insere as reservas usando sub-queries para pegar os IDs dinamicamente
INSERT INTO reserva (usuario_id, pacote_viagem_id, data_reserva, status) VALUES
((SELECT id from usuario where email = 'viajante@email.com'), (SELECT id from pacote_viagem where titulo = 'Aventura na Patagônia'), '2025-08-10T10:00:00', 'PENDENTE'),
((SELECT id from usuario where email = 'viajante@email.com'), (SELECT id from pacote_viagem where titulo = 'Aurora Boreal na Islândia'), '2024-10-01T15:30:00', 'REALIZADA');


INSERT INTO hero_config (type, title, subtitle, main_url, active) VALUES
(
    'BANNER',
    'Viaje com o fotógrafo dos seus sonhos.',
    'Quero viver essa experiência',
    'https://res.cloudinary.com/djrzoct2q/image/upload/v1756939987/banner_hero_default_v2_x2k9v0.jpg', -- URL de um banner padrão
    true
);
