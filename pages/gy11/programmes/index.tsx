import { NextPage } from "next";
import { NextSeo } from "next-seo";
import { getAllProgrammesData } from "../../../api/allProgrammes";
import { Fragment } from "react";
import Link from "next/link";
import { isNotFoundError } from "../../../api/helpers";

export async function getStaticProps() {
  try {
    return {
      props: {
        data: await getAllProgrammesData()
      },
      revalidate: false
    };
  } catch (err) {
    if (isNotFoundError(err)) {
      return {
        props: {
          data: null
        },
        revalidate: false
      };
    }
    throw err;
  }
}

type Props = { data: ReturnType<typeof getAllProgrammesData> };
const ProgrammesPage: NextPage<Props> = props => (
  <>
    <NextSeo
      noindex={true}
      canonical="https://kriterie.se/gy11/programmes"
      title={`Program`}
    />
    <h1>Alla program</h1>
    {props.data.programmes.map(data => (
      <Fragment key={data.type}>
        <h2>{data.type}</h2>
        <ul>
          {data.programmes.map(el => (
            <li key={el.code}>
              <Link href="/gy11/program/[id]" as={`/gy11/program/${el.code}`}>
                <a>
                  {el.title} ({el.code})
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </Fragment>
    ))}
    <style jsx>{`
      h2 {
        border-bottom: 4px solid #d44700;
        padding-bottom: 8px;
        margin-left: -8px;
        margin-right: -8px;
        padding-left: 8px;
        padding-right: 8px;
      }

      ul {
        margin: 16px 0;
        padding: 0 0 0 20px;
      }

      ul.wrap {
        columns: 3;
      }

      @media (max-width: 750px) {
        ul.wrap {
          columns: 2;
        }
      }

      @media (max-width: 500px) {
        ul.wrap {
          columns: 1;
        }
      }

      li {
        list-style: none;
        position: relative;
        line-height: 20px;
      }

      li + li {
        margin-top: 10px;
      }

      li.nonApplicable {
        color: #666;
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
    `}</style>
  </>
);

export default ProgrammesPage;
