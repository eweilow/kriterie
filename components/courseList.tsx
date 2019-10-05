import Link from "next/link";

export const CourseList: React.FC<{
  subjects: {
    title: string;
    minPoints: number | null;
    code: string;
    freeChoice: number | null;
    courses: {
      title: string;
      code: string;
      points: number;
    }[];
  }[];
}> = ({ subjects }) => (
  <section className="courseList">
    {subjects.map(subj => (
      <div key={subj.code}>
        <header>
          {subj.minPoints != null && (
            <>
              {subj.title} ({subj.minPoints}p)
            </>
          )}
          {subj.minPoints == null && <>{subj.title}</>}
        </header>
        {subj.courses.length > 0 && (
          <ul>
            {subj.courses.map(cour => (
              <li key={cour.code}>
                <Link href="/gy11/course/[id]" as={`/gy11/course/${cour.code}`}>
                  <a>
                    {cour.title} ({cour.points}p)
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        )}
        {subj.freeChoice > 0 && (
          <div className="choice">
            Valfrihet på normalt sett {subj.freeChoice} poäng finns inom ämnet.
          </div>
        )}
      </div>
    ))}
    <style jsx>{`
      .courseList {
        columns: 2;
      }
      .courseList header {
        font-size: 16px;
        color: #6b615d;
        font-weight: bold;
      }

      .courseList > div {
        break-inside: avoid-column;
      }
      ul {
        margin: 4px 0 12px 0;
        padding: 0 0 0 20px;
      }
      li {
        list-style: none;
        position: relative;
        line-height: 20px;
      }
      li::before {
        content: "";
        position: absolute;
        left: -10px;
        top: 10px;
        -khtml-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        width: 4px;
        height: 4px;
        background: #d44700;
      }

      .choice {
        margin: 0.2em 0;
      }
    `}</style>
  </section>
);
