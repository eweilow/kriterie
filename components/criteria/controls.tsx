import { Checkbox } from "../checkbox";
import { mdiClose } from "@mdi/js";

const filterTypes: Array<"E" | "C" | "A" | "alla"> = ["E", "C", "A", "alla"];

export const CriteriaControls: React.FC<{
  dense: boolean;
  setDense: (val: boolean) => void;
  filter: "E" | "C" | "A" | "alla";
  setFilter: (val: "E" | "C" | "A" | "alla") => void;
}> = ({ dense, setDense, filter, setFilter }) => (
  <section className="controls">
    <aside>inställningar:</aside>
    <div className="dense">
      <Checkbox
        checked={dense}
        value="enabled"
        onChange={val => setDense(val)}
        color="#d44700"
        label="tätare text"
        name="dense"
        icon={mdiClose}
      />
    </div>
    <div className="grades">
      {filterTypes.map(el => (
        <div key={el}>
          <Checkbox
            checked={filter === el}
            value={el || "null"}
            onChange={val => val && setFilter(el)}
            color="#d44700"
            name="filter"
            icon={el}
            iconType="text"
          />
        </div>
      ))}
    </div>
    <style jsx>{`
      .controls {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        margin-bottom: 16px;
      }

      @media (max-width: 400px) {
        aside {
          flex-basis: 100%;
          padding-bottom: 12px;
        }
      }

      aside {
        font-weight: bold;
        color: #5f5f5f;
        padding-right: 1em;
      }

      .grades {
        display: flex;
        margin-right: -2px;
        margin-left: auto;
        padding-left: 6px;
      }

      .grades > div {
        padding: 0 2px;
      }
    `}</style>
  </section>
);
