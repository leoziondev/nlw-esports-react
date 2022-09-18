interface GameCardProps {
  bannerUrl: string;
  title: string;
  adsCount: number;
}

export function GameCard({ bannerUrl, title, adsCount }: GameCardProps) {
  return (
    <a href="" className="relative rounded-lg overflow-hidden">
      <img src={bannerUrl} alt="" />

      <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 right-0">
        <h2 className="font-bold text-white">{title}</h2>
        <span className="text-sm text-zinc-300">{adsCount} anúncios</span>
      </div>
    </a>
  )
}