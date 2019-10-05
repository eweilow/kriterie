import { mdiClose } from "@mdi/js";
import { ToggleControl } from "./checkbox";

export const SimpleControls: React.FC<{
  disabled?: boolean;
  value: boolean;
  label: string;
  name: string;
  icon?: string;
  title?: string;
  color?: string;
  setValue: (val: boolean) => void;
}> = ({
  disabled,
  value,
  setValue,
  label,
  name,
  color = "#d44700",
  icon = mdiClose,
  title = "inställningar"
}) =>
  !disabled && (
    <section className="controls">
      <aside>{title}:</aside>
      <div>
        <ToggleControl
          checked={value}
          value="enabled"
          onChange={val => setValue(val)}
          color={color}
          label={label}
          name={name}
          icon={icon}
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
