import { useTouchResponder } from "../touchResponder/useTouchResponder";
import clsx from "clsx";

export const ToggleControl: React.FC<{
  type?: "radio" | "checkbox";
  name: string;
  label?: string;
  value?: string;
  checked: boolean;
  color: string;
  icon?: string;
  iconType?: "text" | "svg";
  onChange: (value: boolean) => void;
}> = ({ type = "checkbox", icon, iconType = "svg", ...props }) => {
  const [responderProps, responderElement] = useTouchResponder<HTMLDivElement>(
    "currentColor",
    0.2
  );

  return (
    <label className={type}>
      <input
        type={type}
        onChange={(e) => props.onChange(e.target.checked)}
        checked={props.checked}
        name={props.name}
        value={props.value}
      />
      <div
        className={clsx("box", { checked: props.checked })}
        {...responderProps}
      >
        {responderElement}
        {icon && iconType === "text" && <span>{icon}</span>}
        {icon && iconType === "svg" && (
          <svg viewBox="0 0 24 24">
            <path d={icon} />
          </svg>
        )}
        <div className="bg" />
        <div className="border" />
      </div>
      {props.label && <span className="label">{props.label}</span>}

      <style jsx>{`
        .box {
          height: 24px;
          min-width: 24px;
          overflow: hidden;
          position: relative;
          border-radius: 4px;
          padding: 2px;

          display: flex;
          align-items: center;
          justify-content: center;
        }

        .box:not(.checked) svg {
          opacity: 0;
          transform: scale3d(0.5, 0.5, 0.5);
        }

        .box.checked svg {
          opacity: 1;
          transform: none;
        }

        .box .bg {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          transition: opacity 200ms;
          background: currentColor;
        }

        .box .border {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          transition: opacity 200ms;
          border-radius: 4px;
          border: 2px solid currentColor;
        }

        label.radio .box,
        label.radio .box .border {
          border-radius: 24px;
        }

        .box:not(.checked) .border {
          opacity: 0.2;
        }

        .box.checked .border {
          opacity: 1;
        }

        .box:not(.checked) .bg {
          opacity: 0;
        }

        .box.checked .bg {
          opacity: 0.15;
        }

        input {
          display: none;
        }
        .label {
          display: block;
          line-height: 1em;
          padding-left: 8px;
          font-weight: bold;
        }
        label {
          cursor: pointer;
          display: flex;
          align-items: center;
          color: ${props.color};
        }

        svg {
          width: 24px;
          height: 24px;
          transition: opacity 200ms, transform 200ms;
        }

        label.radio svg {
          width: 20px;
          height: 20px;
        }

        svg path {
          fill: currentColor;
        }

        .box span {
          padding: 0 4px;
          font-weight: bold;
          text-align: center;
        }
      `}</style>
    </label>
  );
};
