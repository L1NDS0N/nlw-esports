import { MagnifyingGlassPlus } from 'phosphor-react';
import { Trigger } from '@radix-ui/react-dialog';

export function CreateAdBanner() {
  return (
    <div className="pt-1 mt-8 bg-nlw-gradient self-stretch rounded-lg overflow-hidden">
      <div className="bg-[#2A2634] px-8 py-6 flex justify-between items-center">
        <div>
          <strong className="text-2xl text-white font-black block">
            Não encontrou seu duo?
          </strong>
          <span className="text-zinc-300">
            Publique um anúncio para encontrar novos players!
          </span>
        </div>

        <Trigger className="px-4 py-3 bg-violet-500 hover:bg-violet-600 text-white rounded flex items-center gap-3">
          <MagnifyingGlassPlus size={24} />
          Publicar anúncio
        </Trigger>
      </div>
    </div>
  );
}
