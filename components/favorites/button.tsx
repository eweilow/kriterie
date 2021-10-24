import { useFavorite } from "../../lib/useFavorite";
import { SimpleControls } from "../purposeControls";
import { mdiHeart } from "@mdi/js";
import { useCallback } from "react";

export const FavoritesButton: React.FC<{
  storageKey: string;
  code: string;
}> = ({ storageKey, code }) => {
  const [isFavorited, doFavorite, doUnfavorite] = useFavorite(storageKey, code);

  const setValue = useCallback(
    (val) => {
      if (val) {
        doFavorite();
      } else {
        doUnfavorite();
      }
    },
    [isFavorited]
  );
  return (
    <section className="favorite">
      <SimpleControls
        title="favoritmarkera"
        label=""
        name="favorite"
        setValue={setValue}
        value={isFavorited}
        icon={mdiHeart}
        color="#ff0077"
      />
      <style jsx>{`
        .favorite:not(:first-child) {
          margin-top: 16px;
        }
      `}</style>
    </section>
  );
};
