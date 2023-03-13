import * as Dialog from '@radix-ui/react-dialog';
import axios from 'axios';
import { useEffect, useState } from 'react';
import logoImg from './assets/Logo.svg';
import { CreateAdBanner } from './components/CreateAdBanner';
import { CreateAdModal } from './components/CreateAdModal';
import { GameBanner } from './components/GameBanner';
import './styles/main.css';

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3333/games').then(({ data }) => {
      setGames(data);
    });
  }, []);

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} width={200} alt="logo" />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu
        <span className="text-transparent bg-nlw-gradient bg-clip-text">
          {' '}
          duo{' '}
        </span>
        está aqui.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map(game => {
          return (
            <GameBanner
              title={game.title}
              key={game.id}
              adsCount={game._count.ads}
              bannerUrl={game.bannerUrl}
            />
          );
        })}
      </div>
      <Dialog.Root>
        <CreateAdModal />
        <CreateAdBanner />
      </Dialog.Root>
    </div>
  );
}

export default App;
