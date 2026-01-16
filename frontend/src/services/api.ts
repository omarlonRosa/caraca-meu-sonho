const API_BASE_URL = 'http://localhost:8080/api'; 

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
  dicasViagem?: string;
  roteiroUrl?: string;
  galeriaFotos?: { id: number; imageUrl: string }[]; 
}

export type NewPackageData = Omit<PacoteViagem, 'id'>;

export interface DestinationsResponse {
  featured: PacoteViagem[];
  upcoming: PacoteViagem[];
  all: PacoteViagem[];
}

export interface Reserva {
  id: number;
  pacoteViagem: PacoteViagem;
  dataReserva: string;
  status: string;
  asaasBoletoUrl?: string;
  asaasInvoiceUrl?: string;
  asaasPixQrcode?: string;
  urlPassagem?: string;
  urlHotelVoucher?: string;
  urlSeguroViagem?: string;
  urlOutros?: string[];
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
  cpf: string; 
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
  redirectUri: string;	
}

export interface FotoGaleria{
  id: number;
  imageUrl: string;
  pacoteViagem: PacoteViagem[];
}

export const fetchPacotesViagem = async (): Promise<DestinationsResponse> => {
  const response = await fetch(`${API_BASE_URL}/pacotes`); 
  
  if (!response.ok) throw new Error('Falha ao buscar os pacotes de viagem.');
  
  const data: PacoteViagem[] = await response.json();

  return {
    featured: data.filter(p => p.featured),
    upcoming: data, 
    all: data
  };
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

export const iniciarPagamento = async (data: { reservaId: number, formaPagamento: 'BOLETO' | 'PIX' | 'CREDIT_CARD' }): Promise<Reserva> => {
  const token = localStorage.getItem('@CaracaMeuSonho:token');
  
  if (!token) {
    throw new Error('Token não encontrado.');
  }

  const response = await fetch(`${API_BASE_URL}/payments/iniciar`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${token}` 
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const errorText = await response.text();
    try {
        const errorJson = JSON.parse(errorText);
        throw new Error(errorJson.message || 'Falha ao iniciar pagamento');
    } catch {
        throw new Error('Falha ao conectar com o servidor de pagamentos.');
    }
  }
  
  return response.json(); 
};


export const uploadImage = async (file: File, resourceType: 'image' | 'video' | 'auto' | 'raw' = 'auto' ): Promise<{ imageUrl: string }> => {
  const token = localStorage.getItem('@CaracaMeuSonho:token');
  
  const formData = new FormData();
  formData.append('file', file);
  formData.append('resource_type', resourceType);

  const response = await fetch(`${API_BASE_URL}/uploads/image`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` }, 
    body: formData, 
  });

  if (!response.ok) {
    throw new Error('Falha ao fazer upload do arquivo.');
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


export const forgotPassword = async (email: string): Promise<string> => {
  const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  if (!response.ok) throw new Error('Falha ao solicitar redefinição de senha.');
  return response.text(); 
};

interface ResetPasswordData {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export const resetPassword = async (data: ResetPasswordData): Promise<string> => {
  const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Falha ao redefinir a senha.');
  }
  return response.text(); 
};


export interface HeroSlide {
  id: number;
  imageUrl: string;
  sortOrder: number;
}

export interface HeroConfig {
  id: number;
  type: 'VIDEO' | 'BANNER' | 'SLIDESHOW';
  title: string;
  subtitle: string;
  mainUrl: string;
  slides: HeroSlide[];
  active: boolean;
}

export interface HeroConfigDTO {
  type: 'VIDEO' | 'BANNER' | 'SLIDESHOW';
  title: string;
  subtitle: string;
  mainUrl?: string;
  slideImageUrls?: string[]; 
}


export const getAdminHeroConfig = async (): Promise<HeroConfig> => {
  const token = localStorage.getItem('@CaracaMeuSonho:token');
  const response = await fetch(`${API_BASE_URL}/admin/hero`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!response.ok) throw new Error('Falha ao buscar configuração do Hero.');
  return response.json();
};

export const updateAdminHeroConfig = async (data: HeroConfigDTO): Promise<HeroConfig> => {
  const token = localStorage.getItem('@CaracaMeuSonho:token');
  const response = await fetch(`${API_BASE_URL}/admin/hero`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error('Falha ao atualizar a configuração do Hero.');
  return response.json();
};
export const getActiveHeroConfig = async (): Promise<HeroConfig> => {
  const response = await fetch(`${API_BASE_URL}/v1/hero/active`);
  if (!response.ok) throw new Error('Falha ao buscar a configuração do Hero.');
  return response.json();
};

export const fetchPublicPacoteById = async (id: string): Promise<PacoteViagem> => {
  const response = await fetch(`${API_BASE_URL}/v1/destinations/${id}`);
  if (!response.ok) throw new Error('Falha ao buscar dados do pacote.');
  return response.json();
};

export const uploadGalleryImages = async (pacoteId: string, files: FileList): Promise<PacoteViagem> => {
  const token = localStorage.getItem('@CaracaMeuSonho:token');
  
  const formData = new FormData();
  Array.from(files).forEach(file => {
    formData.append('files', file);
  });

  const response = await fetch(`${API_BASE_URL}/admin/pacotes/${pacoteId}/galeria`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Falha ao fazer upload das imagens da galeria.');
  }

  return response.json();
};


export const fetchGalleryForPackage = async (pacoteId: number): Promise<FotoGaleria[]> => {
  const token = localStorage.getItem('@CaracaMeuSonho:token');
  const response = await fetch(`${API_BASE_URL}/me/pacotes/${pacoteId}/galeria`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!response.ok) {
    if (response.status === 403) throw new Error('Você não tem permissão para ver esta galeria.');
    throw new Error('Falha ao buscar a galeria de fotos.');
  }
  return response.json();
};


export interface UserAdminView {
  id: number;
  nome: string;
  email: string;
  roles: string;
  fotoPerfilUrl?: string;
}

export interface UserAdminUpdateData {
  nome: string;
  email: string;
  roles: string;
}


export const fetchAdminUsers = async (): Promise<UserAdminView[]> => {
  const token = localStorage.getItem('@CaracaMeuSonho:token');
  const response = await fetch(`${API_BASE_URL}/admin/users`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!response.ok) throw new Error('Falha ao buscar a lista de usuários.');
  return response.json();
};

export const fetchAdminUserById = async (id: string): Promise<UserAdminView> => {
  const token = localStorage.getItem('@CaracaMeuSonho:token');
  const response = await fetch(`${API_BASE_URL}/admin/users/${id}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!response.ok) throw new Error('Falha ao buscar os dados do usuário.');
  return response.json();
};

export const updateAdminUser = async (id: string, data: UserAdminUpdateData): Promise<UserAdminView> => {
  const token = localStorage.getItem('@CaracaMeuSonho:token');
  const response = await fetch(`${API_BASE_URL}/admin/users/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error('Falha ao atualizar o usuário.');
  return response.json();
};

export const deleteAdminUser = async (id: number): Promise<void> => {
  const token = localStorage.getItem('@CaracaMeuSonho:token');
  const response = await fetch(`${API_BASE_URL}/admin/users/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!response.ok) throw new Error('Falha ao deletar o usuário.');
};




export interface ReservaAdminView {
  reservaId: number;
  status: string;
  dataReserva: string;
  pacoteId: number;
  pacoteTitulo: string;
  clienteId: number;
  clienteNome: string;
  clienteEmail: string;
}

export interface UpdateReservaStatusData {
  newStatus: string;
}

export const fetchAdminReservas = async (): Promise<ReservaAdminView[]> => {
  const token = localStorage.getItem('@CaracaMeuSonho:token');
  const response = await fetch(`${API_BASE_URL}/admin/reservas`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!response.ok) throw new Error('Falha ao buscar a lista de reservas.');
  return response.json();
};

export const updateReservaStatus = async (reservaId: number, data: UpdateReservaStatusData): Promise<ReservaAdminView> => {
  const token = localStorage.getItem('@CaracaMeuSonho:token');
  const response = await fetch(`${API_BASE_URL}/admin/reservas/${reservaId}/status`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error('Falha ao atualizar o status da reserva.');
  return response.json();
};

export async function deleteGalleryImage(pacoteId: string | number, fotoId: number): Promise<void> {
  const token = localStorage.getItem('@CaracaMeuSonho:token');
  
  const response = await fetch(`${API_BASE_URL}/admin/pacotes/${pacoteId}/galeria/${fotoId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Falha ao excluir imagem.');
  }
}

export const updateProfile = async (data: { nome?: string; cpf?: string; email?: string }): Promise<void> => {
  const token = localStorage.getItem('@CaracaMeuSonho:token');
  const response = await fetch(`${API_BASE_URL}/me`, { 
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Falha ao atualizar perfil.');
};



export interface UpdateReservaDocsData {
  urlPassagem?: string;
  urlHotelVoucher?: string;
  urlSeguroViagem?: string;
}

export const updateReservaDocs = async (reservaId: number, data: UpdateReservaDocsData): Promise<void> => {
  const token = localStorage.getItem('@CaracaMeuSonho:token');
  const response = await fetch(`${API_BASE_URL}/admin/reservas/${reservaId}/documentos`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error('Falha ao atualizar documentos.');
};




export interface WaitingListEntry {
  id: number;
  pacoteId: number;
  pacoteTitulo: string;
  createdAt: string;
}

export const joinWaitingList = async (pacoteId: number): Promise<WaitingListEntry> => {
  const token = localStorage.getItem('@CaracaMeuSonho:token');
  const response = await fetch(`${API_BASE_URL}/me/waiting-list`,
		{
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify({ pacoteId }),
  });

  if (!response.ok) {
    try {
      const errorData = await response.json();
      throw new Error(errorData.message || `Erro ${response.status}`);
    } catch (e) {
      throw new Error(`Ocorreu um erro no servidor (status: ${response.status})`);
    }
  }

  try {
    return await response.json();
  } catch (e) {
    throw new Error('O servidor deu uma resposta inesperada.');
  }
};
