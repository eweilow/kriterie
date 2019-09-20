import Link from "next/link";
import { Column } from "../column";

export const GlobalNavbarHeight = 120;

export const GlobalNavbar: React.FC = () => {
  return (
    <>
      <nav>
        <Column>
          nav nav nav
          <br />
          <Link href="/">
            <a>home</a>
          </Link>
        </Column>
        <style jsx>{`
          nav {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: ${GlobalNavbarHeight}px;

            background: #cc4400;
            color: white;
          }

          :global(body) {
            padding-top: ${GlobalNavbarHeight}px !important;
          }
        `}</style>
      </nav>
    </>
  );
};
