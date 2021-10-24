import { getCourseData } from "../../api/course";
import { useState, Fragment } from "react";
import { CriteriaControls } from "./controls";

import parse, { HTMLReactParserOptions, domToReact } from "html-react-parser";
import { CriteriaGroup } from "./group";
import { CriteriaGrade } from "./grade";
import { CriteriaLine } from "./line";
import { PartialGrade } from "./partialGrade";

const parseOptions: HTMLReactParserOptions = {
  replace({ name, attribs, children }) {
    if (!attribs) return;

    if (name === "strong") {
      return <Bold>{domToReact(children, parseOptions)}</Bold>;
    }
    return <>{domToReact(children, parseOptions)}</>;
  },
};

const Bold: React.FC = ({ children }) => <b>{children}</b>;

export const CourseCriteria: React.FC<{
  criteria: ReturnType<typeof getCourseData>["criteria"];
}> = ({ criteria }) => {
  const [dense, setDense] = useState(false);
  const [filter, setFilter] = useState<"E" | "C" | "A" | "alla">("alla");

  const parts: Array<"E" | "C" | "A"> = ["E", "C", "A"];

  return (
    <>
      <CriteriaControls
        dense={dense}
        setDense={setDense}
        filter={filter}
        setFilter={setFilter}
      />
      {criteria.map((el, i) => (
        <CriteriaGroup key={i}>
          {parts.map((part) => (
            <Fragment key={part}>
              {(filter === part || filter == "alla") && (
                <CriteriaGrade grade={part}>
                  {el[part].map((line) => (
                    <CriteriaLine dense={dense} key={line}>
                      {parse(line, parseOptions)}
                    </CriteriaLine>
                  ))}
                </CriteriaGrade>
              )}
            </Fragment>
          ))}
        </CriteriaGroup>
      ))}
      {filter == "alla" && (
        <>
          <PartialGrade dense={dense} grade="B" lower="C" upper="A" />
          <PartialGrade dense={dense} grade="D" lower="E" upper="C" />
        </>
      )}
    </>
  );
};
