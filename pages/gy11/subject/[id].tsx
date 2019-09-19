import { useRouter } from "next/router";
import { NextPage } from "next";

import Link from "next/link";
import { getSafeUrl } from "../../../lib/safeUrl";
import { fetchAndParseJson, wrappedInitialProps } from "../../../lib/notFound";

type Props = { data: any };
const Page: NextPage<Props> = props => {
  const router = useRouter();

  return (
    <>
      <h1>subject?? {router.query.id}</h1>
      {props.data.courses.map(el => (
        <div key={el.code}>
          <Link href="/gy11/course/[id]" as={`/gy11/course/${el.code}`}>
            <a>to course {el.title}</a>
          </Link>
        </div>
      ))}
      <pre>{JSON.stringify(props.data, null, "  ")}</pre>
    </>
  );
};

Page.getInitialProps = wrappedInitialProps<Props>(async ctx => {
  const id = (ctx.query.id as string).toLowerCase();
  const url = getSafeUrl(`/api/subject/${id}`, ctx.req);
  const data = await fetchAndParseJson(`Subject '${id}' not found`, url);
  return {
    data
  };
});

export default Page;
