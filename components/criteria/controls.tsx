export const CriteriaControls: React.FC<{
  dense: boolean;
  setDense: (val: boolean) => void;
  filter: "E" | "C" | "A" | null;
  setFilter: (val: "E" | "C" | "A" | null) => void;
}> = ({ dense, setDense, filter, setFilter }) => (
  <div>
    <div>
      <label>
        <input
          checked={dense}
          onChange={e => setDense(e.target.checked)}
          type="checkbox"
        />
        tätare text
      </label>
    </div>
    <div>
      <label>
        <input
          checked={filter === "E"}
          value="E"
          name="filter"
          onChange={e => {
            if (e.target.checked) {
              setFilter("E");
            }
          }}
          type="radio"
        />
        E
      </label>
      <label>
        <input
          checked={filter === "C"}
          value="C"
          name="filter"
          onChange={e => {
            if (e.target.checked) {
              setFilter("C");
            }
          }}
          type="radio"
        />
        C
      </label>
      <label>
        <input
          checked={filter === "A"}
          value="A"
          name="filter"
          onChange={e => {
            if (e.target.checked) {
              setFilter("A");
            }
          }}
          type="radio"
        />
        A
      </label>
      <label>
        <input
          checked={filter === null}
          value={"null"}
          name="filter"
          onChange={e => {
            if (e.target.checked) {
              setFilter(null);
            }
          }}
          type="radio"
        />
        alla
      </label>
    </div>
  </div>
);
