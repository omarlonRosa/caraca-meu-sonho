import { FaUpload } from "react-icons/fa";
import type { NewPackageData } from "../services/api";

interface PackageFormProps {
  formData: NewPackageData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isEditing?: boolean;
	selectedFile?: File | null;
}

export function PackageForm({ formData, handleChange, handleSubmit, isEditing = false, selectedFile }: PackageFormProps) {
	 const fileName = selectedFile ? selectedFile.name : "Nenhum arquivo escolhido";
	 return (
    <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-1">
            <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Título
            </label>
            <input
              type="text"
              name="titulo"
              id="titulo"
              value={formData.titulo}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md dark:bg-slate-700 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-primary"
            />
          </div>

          <div className="md:col-span-1">
            <label htmlFor="destino" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Destino
            </label>
            <input
              type="text"
              name="destino"
              id="destino"
              value={formData.destino}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md dark:bg-slate-700 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-primary"
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="descricao" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Descrição
            </label>
            <textarea
              name="descricao"
              id="descricao"
              value={formData.descricao}
              onChange={handleChange}
              rows={4}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md dark:bg-slate-700 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-primary"
            />
          </div>

          <div>
            <label htmlFor="dataPartida" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Data de Partida
            </label>
            <input
              type="date"
              name="dataPartida"
              id="dataPartida"
              value={formData.dataPartida}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md dark:bg-slate-700 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-primary"
            />
          </div>

          <div>
            <label htmlFor="duracaoDias" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Duração (dias)
            </label>
            <input
              type="number"
              name="duracaoDias"
              id="duracaoDias"
              value={formData.duracaoDias}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md dark:bg-slate-700 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-primary"
            />
          </div>

          <div>
            <label htmlFor="preco" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Preço (BRL)
            </label>
            <input
              type="number"
              name="preco"
              id="preco"
              value={formData.preco}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md dark:bg-slate-700 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-primary"
            />
          </div>
          <div>
            <label htmlFor="vagasDisponiveis" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Vagas
            </label>
            <input
              type="number"
              name="vagasDisponiveis"
              id="vagasDisponiveis"
              value={formData.vagasDisponiveis}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md dark:bg-slate-700 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-primary"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Foto Principal
            </label>
            <div className="mt-1 flex items-center">
              <label htmlFor="file-upload" className="cursor-pointer bg-white dark:bg-slate-700 py-2 px-4 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-600 flex items-center">
                <FaUpload className="mr-2" />
                <span>Escolher Arquivo</span>
              </label>
              <input id="file-upload" name="urlFotoPrincipal" type="file" className="hidden" onChange={handleChange} />
              <span className="ml-4 text-sm text-gray-500">{fileName}</span>
            </div>
          </div>

          <div className="md:col-span-2 flex items-center">
            <input
              id="featured"
              name="featured"
              type="checkbox"
              checked={formData.featured}
              onChange={handleChange}
              className="h-4 w-4 rounded border-gray-300 text-brand-primary focus:ring-brand-primary"
            />
            <label htmlFor="featured" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
              Marcar como destaque na homepage?
            </label>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="py-3 px-6 bg-brand-primary hover:bg-teal-600 text-white font-bold rounded-md transition-colors"
          >
            {isEditing ? 'Atualizar Pacote' : 'Adicionar Pacote'}
          </button>
        </div>
      </form>
    </div>
  );
}
