import { useFavorite } from "../../lib/useFavorite";
import { getSafeUrl } from "../../lib/safeUrl";
import { useFetch } from "../../lib/useFetch";

export const FavoritesList: React.FC<{ title: string; type: string }> = ({
  title,
  type
}) => {
  const [isFavorited, doFavorite, doUnfavorite, state] = useFavorite(
    "kriterie:favorites:" + type,
    ""
  );

  const url = getSafeUrl("/api/search", undefined);
  const data = useFetch(url);

  const selection = data.filter(
    (el: any) => el.type === type && state.includes(el.code)
  );

  return (
    <>
      {selection.map(el => (
        <div key={el.code}>
          <i>{title}</i> {el.title}
        </div>
      ))}
    </>
  );
};
