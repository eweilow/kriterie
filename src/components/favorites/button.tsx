import { useFavorite } from "../../lib/useFavorite";
import { SimpleControls } from "../purposeControls";
import { mdiHeart } from "@mdi/js";
import { useCallback } from "react";

export const FavoritesButton = ({
  storageKey,
  code,
}: {
  storageKey: string;
  code: string;
}) => {
  const [isFavorited, doFavorite, doUnfavorite] = useFavorite(storageKey, code);

  const setValue = useCallback(
    (val) => {
      if (val) {
        doFavorite();
      } else {
        doUnfavorite();
      }
    },
    [isFavorited, doFavorite, doUnfavorite]
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
