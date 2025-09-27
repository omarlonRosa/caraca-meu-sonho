// --- Interfaces (Tipos de Dados) ---

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
  featured: boolean;
}

export type NewPackageData = Omit<PacoteViagem, 'id'>;

export interface DestinationsResponse {
  upcoming: PacoteViagem[];
  past: PacoteViagem[];
}

export interface Reserva {
  id: number;
  pacoteViagem: PacoteViagem;
  dataReserva: string;
  status: string;
}

export interface DashboardMetrics {
  totalPacotes: number;
  totalUsuarios: number;
  proximaViagemTitulo: string;
  proximaViagemData: string | null;
}

interface RegisterData {
  nome: string;
  email: string;
  senha: string;
  roles: string;
}

interface LoginData {
  email: string;
  senha: string;
}

export interface LoginResponse {
  token: string;
}

interface GoogleLoginData {
  code: string;
}

// --- URL Base Única para toda a API ---
const API_BASE_URL = 'http://localhost:8080/api';


// --- Funções de API ---

export const fetchPacotesViagem = async (): Promise<DestinationsResponse> => {
  const response = await fetch(`${API_BASE_URL}/v1/destinations`);
  if (!response.ok) throw new Error('Falha ao buscar os pacotes de viagem.');
  return response.json();
};

export const registerUser = async (data: RegisterData): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Falha ao registrar.');
};

export const loginUser = async (data: LoginData): Promise<LoginResponse> => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Falha no login.');
  return response.json();
};

export const googleLogin = async (data: GoogleLoginData): Promise<LoginResponse> => {
  const response = await fetch(`${API_BASE_URL}/auth/google`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Falha na autenticação com o Google.');
  return response.json();
};

export const fetchAdminPacotes = async (): Promise<PacoteViagem[]> => {
  const token = localStorage.getItem('@CaracaMeuSonho:token');
  const response = await fetch(`${API_BASE_URL}/admin/pacotes`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!response.ok) throw new Error('Falha ao buscar pacotes ou acesso negado.');
  return response.json();
};

export const createPacoteViagem = async (data: NewPackageData): Promise<PacoteViagem> => {
  const token = localStorage.getItem('@CaracaMeuSonho:token');
  const response = await fetch(`${API_BASE_URL}/admin/pacotes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error('Falha ao criar novo pacote.');
  return response.json();
}

export const fetchPacoteById = async (id: string): Promise<PacoteViagem> => {
  const token = localStorage.getItem('@CaracaMeuSonho:token');
  const response = await fetch(`${API_BASE_URL}/admin/pacotes/${id}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!response.ok) throw new Error('Falha ao buscar dados do pacote.');
  return response.json();
};

export const updatePacoteViagem = async (id: string, data: NewPackageData): Promise<PacoteViagem> => {
  const token = localStorage.getItem('@CaracaMeuSonho:token');
  const response = await fetch(`${API_BASE_URL}/admin/pacotes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error('Falha ao atualizar o pacote.');
  return response.json();
};

export const deletePacoteViagem = async (id: number): Promise<void> => {
  const token = localStorage.getItem('@CaracaMeuSonho:token');
  const response = await fetch(`${API_BASE_URL}/admin/pacotes/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!response.ok) throw new Error('Falha ao excluir o pacote.');
};

export const fetchDashboardMetrics = async (): Promise<DashboardMetrics> => {
  const token = localStorage.getItem('@CaracaMeuSonho:token');
  const response = await fetch(`${API_BASE_URL}/admin/dashboard/metrics`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!response.ok) throw new Error('Falha ao buscar as métricas do dashboard.');
  return response.json();
}

export const fetchMinhasReservas = async (): Promise<Reserva[]> => {
  const token = localStorage.getItem('@CaracaMeuSonho:token');
  const response = await fetch(`${API_BASE_URL}/me/reservas`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!response.ok) throw new Error('Falha ao buscar suas reservas.');
  return response.json();
};

export const createPendingReserva = async (pacoteId: number): Promise<Reserva> => {
  const token = localStorage.getItem('@CaracaMeuSonho:token');
  const response = await fetch(`${API_BASE_URL}/me/reservas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify({ pacoteId })
  });
  if (!response.ok) throw new Error('Falha ao criar reserva pendente.');
  return response.json();
};

// VVVV --- FUNÇÃO MODIFICADA PARA DEBUG --- VVVV
export const createPaymentIntent = async (data: { pacoteId: number, reservaId: number }): Promise<{ clientSecret: string }> => {
  // LOG 1: Verificando se a função foi chamada
  console.log('Tentando criar Payment Intent com os dados:', data); 

  const token = localStorage.getItem('@CaracaMeuSonho:token');
  if (!token) {
    console.error('ERRO FATAL: Token de autenticação não encontrado. O usuário está logado?');
    throw new Error('Token não encontrado.');
  }

  try {
    const response = await fetch(`${API_BASE_URL}/payments/create-payment-intent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(data)
    });

    // LOG 2: Verificando a resposta do servidor
    console.log('Resposta do servidor recebida:', response);

    if (!response.ok) {
      // LOG 3: Verificando se a resposta foi um erro
      const errorBody = await response.text();
      console.error('Falha ao criar intenção de pagamento. Status:', response.status, 'Corpo:', errorBody);
      throw new Error('Falha ao criar intenção de pagamento.');
    }
    
    const responseData = await response.json();
    // LOG 4: Sucesso!
    console.log('Payment Intent criado com sucesso!', responseData);
    return responseData;

  } catch (error) {
    // LOG 5: Capturando qualquer erro na chamada fetch ou no processamento
    console.error('ERRO INESPERADO ao chamar createPaymentIntent:', error);
    throw error; // Re-lança o erro para que o chamador possa lidar com ele
  }
};

export const uploadImage = async (file: File): Promise<{ imageUrl: string }> => {
  const token = localStorage.getItem('@CaracaMeuSonho:token');
  
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE_URL}/uploads/image`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` }, // Segurança é importante!
    body: formData, // Enviamos como FormData, não JSON
  });

  if (!response.ok) {
    throw new Error('Falha ao fazer upload da imagem.');
  }

  return response.json();
};

export const uploadProfilePicture = async (file: File): Promise<{ token: string }> => {
  const token = localStorage.getItem('@CaracaMeuSonho:token');
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE_URL}/me/foto-perfil`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Falha ao atualizar a foto de perfil.');
  }
  return response.json();
};
