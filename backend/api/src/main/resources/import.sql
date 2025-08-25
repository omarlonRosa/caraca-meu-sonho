-- Apaga dados existentes para garantir que não haja duplicatas ao reiniciar
DELETE FROM pacote_viagem;

-- Insere os novos pacotes com as URLs para as imagens locais
INSERT INTO pacote_viagem (titulo, destino, descricao, data_partida, duracao_dias, preco, vagas_disponiveis, url_foto_principal) VALUES ('Aventura na Patagônia', 'El Chaltén, Argentina', 'Uma jornada de trekking pelos picos mais icônicos da Patagônia.', '2025-11-10', 10, 9500.00, 8, '/images/patagonia.jpg');
INSERT INTO pacote_viagem (titulo, destino, descricao, data_partida, duracao_dias, preco, vagas_disponiveis, url_foto_principal) VALUES ('Cores do Atacama', 'San Pedro de Atacama, Chile', 'Explore o deserto mais árido do mundo, com seus gêiseres e céus estrelados.', '2026-04-22', 7, 7800.00, 12, '/images/atacama.jpg');
INSERT INTO pacote_viagem (titulo, destino, descricao, data_partida, duracao_dias, preco, vagas_disponiveis, url_foto_principal) VALUES ('Mergulho em Fernando de Noronha', 'Fernando de Noronha, Brasil', 'Descubra a vida marinha de um dos santuários ecológicos mais importantes do planeta.', '2026-09-05', 5, 12300.00, 6, '/images/noronha.jpg');
