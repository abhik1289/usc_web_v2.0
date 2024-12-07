export interface Champion {
  id: number;
  title: string;
  description: string;
  image: File | null;
}

export interface ChampionDialogProps {
  onClose: () => void;
  onAddChampion: (champion: Champion) => void;
  onEditChampion?: (champion: Champion) => void;
  editingChampion?: Champion | null;
}
