import * as Dialog from '@radix-ui/react-dialog';

import { MagnifyingGlassPlus } from "phosphor-react";

export function AdBanner() {
  return (
    <div className="pt-1 bg-nlw-gradient self-stretch rounded-lg overflow-hidden mt-8">
      <div className="bg-[#2a2634] px-8 py-6 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-6 md:mb-0">
          <h3 className="text-2xl text-white font-black">Não encontrou o seu duo?</h3>
          <span className="text-zinc-300">Publique um anúncio para encontrar novos players</span>
        </div>
        <Dialog.Trigger className="flex items-center gap-3 bg-violet-500 hover:bg-violet-600 text-white rounded px-4 py-3">
          <MagnifyingGlassPlus size={24} />
          Publicar anúncio
        </Dialog.Trigger>
      </div>
    </div>
  )
}