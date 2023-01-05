import { getCourseData } from "../../api/course";
import { useState, Fragment, useCallback, PropsWithChildren } from "react";
import { CriteriaControls } from "./controls";

import parse, { HTMLReactParserOptions, domToReact } from "html-react-parser";
import { CriteriaGroup } from "./group";
import { CriteriaGrade } from "./grade";
import { CriteriaLine } from "./line";

const parseOptions: HTMLReactParserOptions = {
  replace(node: any) {
    if (node.type === "tag") {
      if (node.name === "strong") {
        return <Bold>{domToReact(node.children, parseOptions)}</Bold>;
      }
    }
  },
};

const Bold = ({ children }: PropsWithChildren<{}>) => <b>{children}</b>;

export const CourseCriteria = ({
  criteria,
}: PropsWithChildren<{
  criteria: ReturnType<typeof getCourseData>["criteria"];
}>) => {
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
      {(filter === "E" || filter == "alla") && (
        <CriteriaGroup>
          <CriteriaGrade grade={"E"}>
            <CriteriaLine dense={dense}>
              <i>
                "För godkända betyg måste elevens kunskaper motsvara minst
                samtliga delar av betygskriterierna för betyget E eller samtliga
                delar av betygskriterierna för betyget godkänt inom
                vuxenutbildningen."
              </i>
            </CriteriaLine>
            <CriteriaLine dense={dense}>
              För mer information, se{" "}
              <a
                href="https://www.skolverket.se/undervisning/gymnasieskolan/aktuella-forandringar-pa-gymnasial-niva/andringar-i-hur-betyg-ska-sattas-och-nya-allmanna-rad"
                rel="noopener noreferrer"
                target="_blank"
              >
                Skolverkets material om "Ändringar i hur betyg ska sättas och
                nya allmänna råd"
              </a>
              .
            </CriteriaLine>
          </CriteriaGrade>
        </CriteriaGroup>
      )}
      {(filter === "C" || filter === "A" || filter == "alla") && (
        <CriteriaGroup>
          <CriteriaGrade
            grade={
              <>
                A<br />B<br />C<br />D
              </>
            }
          >
            <CriteriaLine dense={dense}>
              <i>
                "Läraren sätter det betyg som sammantaget bäst motsvarar elevens
                kunskaper. Även om elevens kunskaper varierar något inom spannet
                E-A, så är det den sammantaget bäst motsvarande nivån som också
                är den som blir betyget. Läraren sätter betyget C eller A när
                elevens kunskaper sammantaget bäst motsvarar betygskriterierna
                för något av dessa betyg."
              </i>
            </CriteriaLine>
            <CriteriaLine dense={dense}>
              <i>
                "Läraren sätter betyget B eller D om den sammantagna bedömningen
                är att elevens kunskaper bäst motsvarar en nivå mellan betygen A
                och C eller C och E."
              </i>
            </CriteriaLine>
            <CriteriaLine dense={dense}>
              För mer information, se{" "}
              <a
                href="https://www.skolverket.se/undervisning/gymnasieskolan/aktuella-forandringar-pa-gymnasial-niva/andringar-i-hur-betyg-ska-sattas-och-nya-allmanna-rad"
                rel="noopener noreferrer"
                target="_blank"
              >
                Skolverkets material om "Ändringar i hur betyg ska sättas och
                nya allmänna råd"
              </a>
              .
            </CriteriaLine>
          </CriteriaGrade>
        </CriteriaGroup>
      )}
    </>
  );
};
