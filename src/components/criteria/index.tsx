import { getCourseData } from "../../api/course";
import { useState, Fragment, useCallback } from "react";
import { CriteriaControls } from "./controls";

import parse, { HTMLReactParserOptions, domToReact } from "html-react-parser";
import { CriteriaGroup } from "./group";
import { CriteriaGrade } from "./grade";
import { CriteriaLine } from "./line";
import { PartialGrade } from "./partialGrade";

const parseOptions: HTMLReactParserOptions = {
  replace(node: any) {
    if (node.type === "tag") {
      if (node.name === "strong") {
        return <Bold>{domToReact(node.children, parseOptions)}</Bold>;
      }
    }
  },
};

const Bold: React.FC = ({ children }) => <b>{children}</b>;

export const CourseCriteria: React.FC<{
  criteria: ReturnType<typeof getCourseData>["criteria"];
}> = ({ criteria }) => {
  const [dense, setDense] = useState(false);
  const [filter, setFilter] = useState<"E" | "C" | "A" | "alla">("alla");

  const parts: Array<"E" | "C" | "A"> = ["E", "C", "A"];

  const [hovering, setHovering] = useState<string>(null);

  const onHoverIn = useCallback((index: string) => {
    setHovering(index);
  }, []);

  const onHoverOut = useCallback((index: string) => {
    setHovering(null);
  }, []);

  return (
    <>
      <CriteriaControls
        dense={dense}
        setDense={setDense}
        filter={filter}
        setFilter={setFilter}
      />
      {criteria.map((el, groupIndex) => (
        <CriteriaGroup key={groupIndex}>
          {parts.map((part) => (
            <Fragment key={part}>
              {(filter === part || filter == "alla") && (
                <CriteriaGrade grade={part}>
                  {el[part].map((line, partIndex) => {
                    const index = `group-${groupIndex}-part-${partIndex}`;
                    return (
                      <Fragment key={line}>
                        {line != null && (
                          <CriteriaLine
                            onHoverIn={onHoverIn}
                            onHoverOut={onHoverOut}
                            index={index}
                            isHovering={hovering === index}
                            dense={dense}
                          >
                            {parse(line, parseOptions)}
                          </CriteriaLine>
                        )}
                      </Fragment>
                    );
                  })}
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
