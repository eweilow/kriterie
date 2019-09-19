import Link from "next/link";

export default () => (
  <>
    <h1>HI</h1>
    <Link href="/gy11/programmes">
      <a>all programmes</a>
    </Link>
    <br />
    <Link href="/gy11/courses/[letter]" as="/gy11/courses/a">
      <a>all courses on a</a>
    </Link>
    <br />
    <Link href="/gy11/subjects/[letter]" as="/gy11/subjects/b">
      <a>all subjects on b</a>
    </Link>
    <br />
    <Link href="/gy11/subject/[id]" as="/gy11/subject/MAT">
      <a>subject MAT</a>
    </Link>
    <br />
    <Link href="/gy11/course/[id]" as="/gy11/course/MATMAT01a">
      <a>course MATMAT01a</a>
    </Link>
    <br />
    <Link href="/gy11/course/[id]" as="/gy11/course/MATMAT01b">
      <a>course MATMAT01b</a>
    </Link>
  </>
);
