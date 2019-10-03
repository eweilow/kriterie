import { CriteriaGroup } from "./group";
import { CriteriaGrade } from "./grade";
import { CriteriaLine } from "./line";

export const PartialGrade: React.FC<{
  dense: boolean;
  grade: string;
  lower: string;
  upper: string;
}> = ({ dense, grade, lower, upper }) => (
  <CriteriaGroup>
    <CriteriaGrade grade={grade}>
      <CriteriaLine dense={dense}>
        Betyget {grade} innebär att kunskapskraven för {lower} och till
        övervägande del för {upper} är uppfyllda.
      </CriteriaLine>
      <CriteriaLine dense={dense}>
        <i>
          Kommentar från kriterie.se - till övervägande del är inte
          nödvändigtvis ekvivalent med en kvantitativ jämförelse!
        </i>
      </CriteriaLine>
      <CriteriaLine dense={dense}>
        För mer information, se{" "}
        <a
          href="https://www.skolverket.se/publikationsserier/stodmaterial/2016/betygsskalan-och-betygen-b-och-d"
          rel="noopener noreferrer"
          target="_blank"
        >
          Skolverkets stödmaterial för betygen B och D
        </a>
        .
      </CriteriaLine>
    </CriteriaGrade>
  </CriteriaGroup>
);
