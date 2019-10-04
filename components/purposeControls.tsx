import { mdiClose } from "@mdi/js";
import { Checkbox } from "./checkbox";

export const PurposeControls: React.FC<{
  disabled?: boolean;
  showAll: boolean;
  setShowAll: (val: boolean) => void;
}> = ({ disabled, showAll, setShowAll }) =>
  !disabled && (
    <section className="controls">
      <aside>inställningar:</aside>
      <div className="dense">
        <Checkbox
          checked={showAll}
          value="enabled"
          onChange={val => setShowAll(val)}
          color="#d44700"
          label="visa hela ämnets omfattning"
          name="dense"
          icon={mdiClose}
        />
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
      `}</style>
    </section>
  );
