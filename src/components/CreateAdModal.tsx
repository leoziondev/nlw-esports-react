import { useState, useEffect, FormEvent } from 'react';
import axios from 'axios';
import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as Select from "@radix-ui/react-select";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { toast } from 'react-toastify';

import { Input } from "./Form/Input";
import { AdBanner } from './AdBanner';

import { CaretDown, CaretUp, Check, GameController } from "phosphor-react";

interface Game {
  id: string;
  title: string;
}

export function CreateAdModal() {
  const [open, setOpen] = useState<boolean>(false);
  const [games, setGames] = useState<Game[]>([]);
  const [currentGame, setCurrentGame] = useState<string>('');
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState<boolean>(false);


  useEffect(() => {
    axios('http://localhost:3333/games').then(response => {
        setGames(response.data)
    });
  }, []);

  const mockPromise = async () =>
    await new Promise((resolve) => setTimeout(resolve, 500));

  async function handleCreateAd(event: FormEvent) {
    event.preventDefault();
    
    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    if (!data.name) {
      return;
    }

    try {
      await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekDays.map(Number),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel: useVoiceChannel
      });

      mockPromise().then(() => setOpen(false));
      
      setTimeout(() => {
        toast.success('Anúncio criado com sucesso!', {
          position: "top-right",
          autoClose: 3000,
          theme: "dark"
        });
      }, 800);
    } catch (err) {
      console.log(err);

      toast.error('Houve um erro ao criar o anúncio!', {
        position: "top-right",
        autoClose: 3000,
        theme: "colored"
      });
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <AdBanner />
      
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

        <Dialog.Content className="w-[480px] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#2A2634] py-8 px-10 text-white rounded-lg shadow-black">
          <Dialog.Title className="text-3xl font-black mb-8">Publique um anúncio</Dialog.Title>

          
          <form onSubmit={handleCreateAd} className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="game" className="font-semibold mb-1">Qual o game?</label>
              <Select.Root
                name="game"
                value={currentGame}
                onValueChange={(value) => setCurrentGame(value)}
              >
                <Select.Trigger name="game" id="game" className="bg-zinc-900 rounded flex items-center justify-between py-3 px-4 text-sm text-zinc-500">
                  <Select.Value placeholder="Selecione o game que deseja jogar" />
                  <Select.Icon>
                    <CaretDown />
                  </Select.Icon>
                </Select.Trigger>
                <Select.Portal>
                  <Select.Content className="overflow-hidden bg-zinc-900 text-zinc-400 rounded">
                    <Select.ScrollUpButton>
                      <CaretUp />
                    </Select.ScrollUpButton>
                    <Select.Viewport className="py-3 px-4">
                      {games.map((game) => {
                        return (
                          <Select.Item
                            value={game.id}
                            key={game.id}
                            className="flex justify-between items-center cursor-pointer hover:bg-violet-500 hover:text-white rounded"
                          >
                            <Select.ItemText className="px-4">{game.title}</Select.ItemText>
                            {currentGame === game.id && (
                              <Select.ItemIndicator>
                                <Check />
                              </Select.ItemIndicator>
                            )}
                          </Select.Item>
                        );
                      })}
                    </Select.Viewport>
                    <Select.ScrollDownButton>
                      <CaretDown />
                    </Select.ScrollDownButton>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            </div>
            <div className="flex flex-col">
              <label htmlFor="name" className="font-semibold mb-1">Seu nickname</label>
              <Input name="name" id="name" placeholder="Como te chamam dentro do game?" />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label htmlFor="yearsPlaying" className="font-semibold mb-1">Joga há quantos anos?</label>
                <Input name="yearsPlaying" id="yearsPlaying" type="number" placeholder="Tudo bem ser ZERO" />
              </div>
              <div className="flex flex-col">
                <label htmlFor="discord" className="font-semibold mb-1">Qual seu discord?</label>
                <Input name="discord" id="discord" placeholder="Usuario#0000" />
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="weekDays" className="font-semibold mb-1">Quando costuma jogar?</label>                
              <ToggleGroup.Root
                type="multiple"
                className="flex justify-between"
                value={weekDays}
                onValueChange={setWeekDays}
              >
                <ToggleGroup.Item
                  value="0"
                  title="Domingo"
                  className={`flex items-center justify-center p-3 hover:bg-violet-600 rounded text-xs ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                >
                  Dom
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="1"
                  title="Segunda"
                  className={`flex items-center justify-center p-3 hover:bg-violet-600 rounded text-xs ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                >
                  Seg
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="2"
                  title="Terça"
                  className={`flex items-center justify-center p-3 hover:bg-violet-600 rounded text-xs ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                >
                  Ter
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="3"
                  title="Quarta"
                  className={`flex items-center justify-center p-3 hover:bg-violet-600 rounded text-xs ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                >
                  Qua
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="4"
                  title="Quinta"
                  className={`flex items-center justify-center p-3 hover:bg-violet-600 rounded text-xs ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                >
                  Qui
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="5"
                  title="Sexta"
                  className={`flex items-center justify-center p-3 hover:bg-violet-600 rounded text-xs ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                >
                  Sex
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="6"
                  title="Sabado"
                  className={`flex items-center justify-center p-3 hover:bg-violet-600 rounded text-xs ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                >
                  Sab
                </ToggleGroup.Item>
              </ToggleGroup.Root>
            </div>
            <div className="flex flex-col">
                <label htmlFor="discord" className="font-semibold mb-1">Qual o horário do dia?</label>
                <div className="grid grid-cols-2 gap-4">
                  <Input name="hourStart" id="hourStart" type="time" placeholder="De" />
                  <Input name="hourEnd" id="hourEnd" type="time" placeholder="Até" />
                </div>
              </div>
            <label className="flex items-center gap-2 text-sm">
              <Checkbox.Root
                checked={useVoiceChannel}
                onCheckedChange={(checked) => {
                  if (checked === true) {
                    setUseVoiceChannel(true)
                  } else {
                    setUseVoiceChannel(false)
                  }
                }}
                className="w-6 h-6 bg-zinc-900 rounded p-1"
              >
                <Checkbox.Indicator>
                  <Check className="w-4 h-4 text-emerald-400" />
                </Checkbox.Indicator>
              </Checkbox.Root>
              Costumo me conectar ao chat de voz
            </label>

            <footer className="flex justify-end gap-6">
              <Dialog.Close className="bg-zinc-500 hover:bg-zinc-600 h-12 rounded-md font-semibold px-5">Cancelar</Dialog.Close>
              <button type="submit" className="flex items-center gap-2 bg-violet-500 hover:bg-violet-600 h-12 rounded-md font-semibold px-5">
                <GameController size={24} />
                Encontrar duo
              </button>
            </footer>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}