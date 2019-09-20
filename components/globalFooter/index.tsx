import Link from "next/link";

export const GlobalFooter: React.FC = () => {
  return (
    <>
      <hr />
      <footer>
        foot foot foot
        <br />
        <Link href="/cookies">
          <a>cookie usage</a>
        </Link>
      </footer>
    </>
  );
};
