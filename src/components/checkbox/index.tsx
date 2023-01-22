import clsx from "clsx";

export const ToggleControl = ({
  icon,
  iconType = "svg",
  ...props
}: {
  name: string;
  label?: string;
  value?: string;
  checked: boolean;
  color: string;
  icon?: string;
  iconType?: "text" | "svg";
  onChange: (value: boolean) => void;
}) => {
  return (
    <label
      className={clsx("cursor-pointer flex items-center")}
      style={{
        color: props.color,
      }}
    >
      <input
        className="hidden"
        type={"checkbox"}
        onChange={(e) => props.onChange(e.target.checked)}
        checked={props.checked}
        name={props.name}
        value={props.value}
      />
      <div
        className={clsx(
          "_box min-w-[24px] h-[24px] overflow-hidden relative rounded p-1 flex items-center justify-center",
          {
            checked: props.checked,
            "w-[24px]": iconType === "svg",
          }
        )}
      >
        {icon && iconType === "text" && (
          <span className="px-1 font-bold text-center">{icon}</span>
        )}
        {icon && iconType === "svg" && (
          <svg
            viewBox="0 0 24 24"
            className={clsx("w-[24px] h-[24px] transition", {
              "opacity-0 scale-50": !props.checked,
              "opacity-100 scale-100": props.checked,
            })}
          >
            <path fill="currentColor" d={icon} />
          </svg>
        )}
        <div
          className={clsx(
            "_bg absolute top-0 bottom-0 left-0 right-0 transition-opacity bg-current",
            {
              "opacity-0": !props.checked,
              "opacity-[0.15]": props.checked,
            }
          )}
        />
        <div
          className={clsx(
            "_border absolute top-0 bottom-0 left-0 right-0 transition-opacity rounded border-2 border-current",
            {
              "opacity-20": !props.checked,
              "opacity-70": props.checked,
            }
          )}
        />
      </div>

      {props.label && (
        <span className="pl-2 block font-bold text-center">{props.label}</span>
      )}
    </label>
  );
};
