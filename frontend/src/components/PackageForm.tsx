import type { NewPackageData } from "../services/api";

interface PackageFormProps {
  formData: NewPackageData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isEditing?: boolean;
}

export function PackageForm({ formData, handleChange, handleSubmit, isEditing = false }: PackageFormProps) {
  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-slate-800 p-8 rounded-lg shadow-md">
      {/* Título */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="titulo" className="block mb-2 text-sm font-medium">Título</label>
          <input type="text" name="titulo" id="titulo" value={formData.titulo} onChange={handleChange} required className="input-style" />
        </div>
        <div>
          <label htmlFor="destino" className="block mb-2 text-sm font-medium">Destino</label>
          <input type="text" name="destino" id="destino" value={formData.destino} onChange={handleChange} required className="input-style" />
        </div>
      </div>
      {/* Descrição */}
      <div>
        <label htmlFor="descricao" className="block mb-2 text-sm font-medium">Descrição</label>
        <textarea name="descricao" id="descricao" value={formData.descricao} onChange={handleChange} rows={4} className="input-style" />
      </div>
      {/* Detalhes Numéricos e Data */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div>
          <label htmlFor="dataPartida" className="block mb-2 text-sm font-medium">Data de Partida</label>
          <input type="date" name="dataPartida" id="dataPartida" value={formData.dataPartida} onChange={handleChange} required className="input-style" />
        </div>
        <div>
          <label htmlFor="duracaoDias" className="block mb-2 text-sm font-medium">Duração (dias)</label>
          <input type="number" name="duracaoDias" id="duracaoDias" value={formData.duracaoDias} onChange={handleChange} required className="input-style" />
        </div>
        <div>
          <label htmlFor="preco" className="block mb-2 text-sm font-medium">Preço (BRL)</label>
          <input type="number" step="0.01" name="preco" id="preco" value={formData.preco} onChange={handleChange} required className="input-style" />
        </div>
        <div>
          <label htmlFor="vagasDisponiveis" className="block mb-2 text-sm font-medium">Vagas</label>
          <input 
            type="number" 
            name="vagasDisponiveis" 
            id="vagasDisponiveis"
            value={formData.vagasDisponiveis} 
            onChange={handleChange} 
            required
            className="input-style" />
        </div>
      </div>
      {/* URL e Destaque */}

    <div>
        <label htmlFor="fotoPrincipalFile" className="block mb-2 text-sm font-medium">Foto Principal</label>
        <input 
                    type="file"
                    name="fotoPrincipalFile"
                    id="fotoPrincipalFile"
                    onChange={handleChange}
                    required={!isEditing}
                    className="input-style file:mr-4 file:py-2file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-primary/10 file:text-brand-primary hover:file:bg-brand-primary/20 "
                />
      </div>
      <div className="flex items-center gap-4">
        <input type="checkbox" name="featured" id="featured" checked={formData.featured} onChange={handleChange} className="h-4 w-4 rounded text-brand-primary focus:ring-brand-primary" />
        <label htmlFor="featured" className="text-sm font-medium">Marcar como destaque na homepage?</label>
      </div>
      {/* Botão de Envio */}
      <div className="text-right">
        <button type="submit" className="bg-brand-primary hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-lg">
          {isEditing ? 'Atualizar Pacote' : 'Salvar Pacote'}
        </button>
      </div>


       </form>
  );
}
