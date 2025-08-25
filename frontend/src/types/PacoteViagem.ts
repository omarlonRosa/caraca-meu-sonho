export interface PacoteViagem {
  id: number;
  titulo: string;
  destino: string;
  descricao: string;
  dataPartida: string;
  duracaoDias: number;
  preco: number;
  vagasDisponiveis: number;
  urlFotoPrincipal: string;
}
