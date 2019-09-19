import { useRouter } from "next/router";
import { NextPage } from "next";

import Link from "next/link";
import { getSafeUrl } from "../../../lib/safeUrl";
import { wrappedInitialProps, fetchAndParseJson } from "../../../lib/notFound";

type Props = { data: any };
const Page: NextPage<Props> = props => {
  const router = useRouter();

  return (
    <>
      <h1>program?? {router.query.id}</h1>
      <pre>{JSON.stringify(props.data, null, "  ")}</pre>
    </>
  );
};

Page.getInitialProps = wrappedInitialProps<Props>(async ctx => {
  const id = (ctx.query.id as string).toLowerCase();
  const url = getSafeUrl(`/api/program/${id}`, ctx.req);
  const data = await fetchAndParseJson(`Program '${id}' not found`, url);
  return {
    data
  };
});

export default Page;
