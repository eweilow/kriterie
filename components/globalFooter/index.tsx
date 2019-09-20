import Link from "next/link";
import { Column } from "../column";

export const GlobalFooterHeight = 140;

export const GlobalFooter: React.FC = () => {
  return (
    <>
      <footer>
        <Column>
          foot foot foot
          <br />
          <Link href="/cookies">
            <a>cookie usage</a>
          </Link>
        </Column>
        <style jsx>{`
          footer {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: ${GlobalFooterHeight}px;
            background: #b63d00;
            color: white;
          }

          :global(body) {
            padding-bottom: ${GlobalFooterHeight}px !important;
          }
        `}</style>
      </footer>
    </>
  );
};
