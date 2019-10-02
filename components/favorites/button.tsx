import { useFavorite } from "../../lib/useFavorite";

export const FavoritesButton: React.FC<{
  storageKey: string;
  code: string;
}> = ({ storageKey, code }) => {
  const [isFavorited, doFavorite, doUnfavorite] = useFavorite(storageKey, code);

  return (
    <button onClick={isFavorited ? doUnfavorite : doFavorite}>
      {isFavorited ? "Ta bort från favoriter" : "Lägg till i favoriter"}
    </button>
  );
};
