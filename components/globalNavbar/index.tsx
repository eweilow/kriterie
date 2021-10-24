import Link, { LinkProps } from "next/link";
import { Column } from "../column";
import { useTouchResponder } from "../touchResponder/useTouchResponder";
import { TouchResponseShape } from "../touchResponder/response";
import { SearchBox } from "../searchBox";
import { Logo } from "./logo";

const RowHeight = 40;
export const GlobalNavbarHeight = Math.floor(RowHeight * 2) + 8;

const Navlink: React.FC<LinkProps> = (props) => {
  const [responderProps, responder] = useTouchResponder<HTMLAnchorElement>(
    "#fff",
    0.3,
    TouchResponseShape.Circular
  );

  return (
    <Link {...props}>
      <a {...responderProps}>
        {responder}
        {props.children}
        <style jsx>{`
          a {
            position: relative;
            overflow: hidden;

            display: flex;
            align-items: center;
            justify-content: center;
            padding: 4px 8px;
            text-decoration: none;
            color: inherit;

            font-weight: bold;

            border-radius: 8px;

            height: ${RowHeight}px;
            box-sizing: border-box;

            opacity: 1;
            transform: none;
            z-index: 1;
          }
        `}</style>
      </a>
    </Link>
  );
};
export const GlobalNavbar: React.FC = () => {
  return (
    <>
      <nav>
        <Column>
          <div className="rows">
            <section className="row">
              <Logo />
              <div className="searchBox">
                <SearchBox zIndex={20} id="searchBox2" initialSize={200} />
              </div>
            </section>
            <section className="row links">
              <Navlink href="/" as="/">
                hem
              </Navlink>
              <Navlink href="/gy11/courses/[letter]" as="/gy11/courses/a">
                kurser
              </Navlink>
              <Navlink href="/gy11/subjects/[letter]" as="/gy11/subjects/a">
                ämnen
              </Navlink>
              <Navlink href="/gy11/programmes" as="/gy11/programmes">
                program
              </Navlink>
            </section>
          </div>
        </Column>
        <style jsx>{`
          nav {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            box-sizing: content-box;

            border-bottom: 4px solid #b64004;

            color: white;

            background-color: #d44700;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='18' viewBox='0 0 100 18'%3E%3Cpath fill='%23cc4400' fill-opacity='0.4' d='M61.82 18c3.47-1.45 6.86-3.78 11.3-7.34C78 6.76 80.34 5.1 83.87 3.42 88.56 1.16 93.75 0 100 0v6.16C98.76 6.05 97.43 6 96 6c-9.59 0-14.23 2.23-23.13 9.34-1.28 1.03-2.39 1.9-3.4 2.66h-7.65zm-23.64 0H22.52c-1-.76-2.1-1.63-3.4-2.66C11.57 9.3 7.08 6.78 0 6.16V0c6.25 0 11.44 1.16 16.14 3.42 3.53 1.7 5.87 3.35 10.73 7.24 4.45 3.56 7.84 5.9 11.31 7.34zM61.82 0h7.66a39.57 39.57 0 0 1-7.34 4.58C57.44 6.84 52.25 8 46 8S34.56 6.84 29.86 4.58A39.57 39.57 0 0 1 22.52 0h15.66C41.65 1.44 45.21 2 50 2c4.8 0 8.35-.56 11.82-2z'%3E%3C/path%3E%3C/svg%3E");
          }

          .searchBox {
            min-width: 200.1px;
            max-width: 320px;
            width: 100%;
            height: 40px;
            margin-left: 4px;
          }

          .rows {
            padding-top: 16px;
            height: ${GlobalNavbarHeight}px;
            display: flex;
            flex-direction: column;
          }

          .row {
            display: flex;
            flex: 1;
            align-items: center;
            min-height: ${RowHeight}px;
            box-sizing: border-box;
            justify-content: space-between;
          }

          .row + .row {
            margin-top: 8px;
          }

          .row.links {
            flex-grow: 0;
            margin: 0 -2px;
            justify-content: flex-end;
          }

          .row.links :global(a) {
            margin: 0 2px;
          }

          :global(html) :global(body) {
            padding-top: ${GlobalNavbarHeight + 4 + 16}px;
          }
        `}</style>
      </nav>
    </>
  );
};
