import { mdiClose } from "@mdi/js";
import { Checkbox } from "./checkbox";

export const SimpleControls: React.FC<{
  disabled?: boolean;
  value: boolean;
  label: string;
  name: string;
  setValue: (val: boolean) => void;
}> = ({ disabled, value, setValue, label, name }) =>
  !disabled && (
    <section className="controls">
      <aside>inställningar:</aside>
      <div>
        <Checkbox
          checked={value}
          value="enabled"
          onChange={val => setValue(val)}
          color="#d44700"
          label={label}
          name={name}
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
