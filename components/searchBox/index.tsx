import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ComboboxPopover,
  ComboboxOptionText
} from "@reach/combobox";

import {
  useEffect,
  useCallback,
  useState,
  useRef,
  useLayoutEffect
} from "react";

import * as ExampleWorker from "./search.worker";
import { Router, useRouter } from "next/router";
import clsx from "clsx";
import { SearchLoadingBar } from "../loadingIndicator/searchBar";

export const SearchBox: React.FC = () => {
  const [searchDisabled, setSearchDisabled] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>(null);

  const worker = useRef<Worker>(null);
  const nextString = useRef(searchString);
  useEffect(() => {
    worker.current = new (ExampleWorker as any)();
    worker.current.addEventListener("message", msg => {
      if (nextString.current === msg.data.str) {
        setSearchResults(
          msg.data.results.map(el => ({
            code: el.obj.code,
            type: el.obj.type,
            title: `${el.obj.title} (${el.obj.code})`
          }))
        );
      }
    });
  }, []);

  useEffect(() => {
    if (!searchString) {
      setSearchResults(null);
      setSearchString("");
      nextString.current = "";
    } else {
      worker.current.postMessage(searchString);
      nextString.current = searchString;
    }
  }, [searchString]);

  const handleChange = useCallback(
    event => setSearchString(event.target.value),
    [setSearchString]
  );

  const router = useRouter();

  const handleSelect = useCallback(
    value => {
      setSearchString(value);
      setActive(true);
      setLoading(true);
      if (searchResults != null) {
        const found = searchResults.find(el => el.title === value);
        if (found.type === "program") {
          setTimeout(() => {
            router
              .push("/gy11/program/[id]", "/gy11/program/" + found.code)
              .then(() => {
                setLoading(false);
                setSearchString("");
                setActive(false);
                setSearchDisabled(false);
              });
          }, 500);
          setSearchDisabled(true);
        }
        if (found.type === "course") {
          setTimeout(() => {
            router
              .push("/gy11/course/[id]", "/gy11/course/" + found.code)
              .then(() => {
                setLoading(false);
                setSearchString("");
                setActive(false);
                setSearchDisabled(false);
              });
          }, 500);
          setSearchDisabled(true);
        }
        if (found.type === "subject") {
          setTimeout(() => {
            router
              .push("/gy11/subject/[id]", "/gy11/subject/" + found.code)
              .then(() => {
                setLoading(false);
                setSearchString("");
                setActive(false);
                setSearchDisabled(false);
              });
          }, 500);
          setSearchDisabled(true);
        }
      }
    },
    [searchResults, router]
  );

  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(false);
  const setFocused = useCallback(() => {
    setActive(true);
  }, []);
  const setUnfocused = useCallback(() => {
    setActive(false);
  }, []);

  return (
    <Combobox
      openOnFocus
      className={clsx({ active, hasResults: searchResults })}
      id="searchBox"
      onSelect={handleSelect}
    >
      <div className="box right">
        <div className="box left">
          <ComboboxInput
            onFocus={setFocused}
            onBlur={setUnfocused}
            selectOnClick
            value={searchString}
            disabled={searchDisabled}
            aria-label="Innehållssök"
            className="search-input"
            onChange={handleChange}
            placeholder="sök efter något"
          />
          <div className="background" />
          <SearchLoadingBar.Wrapped loading={loading} />
        </div>
      </div>
      {searchResults && (
        <ComboboxPopover portal={false} id="searchBoxPopover">
          <ComboboxList persistSelection aria-label="Innehållssök">
            {searchResults.map((result, index) => (
              <ComboboxOption key={index} value={`${result.title}`}>
                {result.type}
                <br />
                <ComboboxOptionText />
              </ComboboxOption>
            ))}
          </ComboboxList>
        </ComboboxPopover>
      )}
      <style jsx>{`
        .box {
          display: flex;
          margin-left: auto;
          align-items: center;
          justify-content: flex-end;
          box-sizing: border-box;
          color: #4d1a00;
          overflow: hidden;
          z-index: 1;
          position: relative;
          transform: translate3d(0, 0, 0);
        }

        .box.left {
          border-top-left-radius: 8px;
          border-bottom-left-radius: 8px;
          background: #eb7031;
          transform: translate3d(calc(100% - 240px), 0, 0);
          transition: transform 195ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        :global(#searchBox.active) .box.left,
        :global(#searchBox[aria-expanded="true"].hasResults) .box.left {
          transform: none;
        }

        .box.left .background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: white;
          opacity: 0;
          transition: opacity 195ms cubic-bezier(0.4, 0, 0.2, 1);
          transform: translate3d(0, 0, 0);
        }

        :global(input:focus) + .background {
          opacity: 0.1 !important;
        }

        .box.right {
          border-top-right-radius: 8px;
          border-bottom-right-radius: 8px;
          filter: drop-shadow(0px 4px 8px #0000002b)
            drop-shadow(0px 2px 2px #00000000);
          transition: filter 195ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        :global(#searchBox.active) .box.right,
        :global(#searchBox[aria-expanded="true"].hasResults) .box.right {
          filter: drop-shadow(0px 4px 8px #0000002a)
            drop-shadow(0px 2px 2px #0000002b);
        }

        .border {
          border: 2px solid #ff9d6b;
          border-radius: 8px;
        }

        :global(#searchBox[data-reach-combobox]) {
          width: 320px;
          position: relative;
          z-index: 1;
        }

        :global(#searchBox [data-reach-combobox-input]),
        .box {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          box-sizing: border-box;
          z-index: 1;
        }

        :global(#searchBox [data-reach-combobox-input]) {
          background: none;
          border: none;
          padding: 4px 8px;
          outline: none !important;
        }
        :global(#searchBox [data-reach-combobox-input]),
        :global(#searchBox [data-reach-combobox-input])::placeholder {
          color: #4d1a00;
          font-size: 18px;
          font-family: "GlacialIndifference", "Roboto", -apple-system,
            "Trebuchet MS", Helvetica, sans-serif;
          font-weight: bold;
        }

        :global(#searchBoxPopover[data-reach-combobox-popover]) {
          position: absolute;
          top: -4px;
          left: -4px;
          right: -4px;
          background: #ffb58f;
          color: #4d1a00;
          border-radius: 12px;
          padding-top: 56px;
          border: none;
          box-shadow: 0px 4px 24px #00000024, 0px 2px 4px #0000000f;
          padding-bottom: 8px;

          animation: enter 195ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        :global(#searchBox[aria-expanded="true"].hasResults)
          :global(#searchBoxPopover[data-reach-combobox-popover]) {
          animation-delay: 25ms;
          opacity: 0;
        }

        @keyframes enter {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        :global(#searchBoxPopover [data-reach-combobox-list]) {
          list-style: none;
          margin: 0;
          padding: 0;
          user-select: none;
        }

        :global(#searchBoxPopover [data-reach-combobox-option]) {
          cursor: pointer;
          margin: 0;
          padding: 4px 8px;
          outline: none !important;
        }

        :global(#searchBoxPopover
            [data-reach-combobox-option][aria-selected="true"]) {
          background: hsl(211, 10%, 95%);
        }

        :global(#searchBoxPopover [data-reach-combobox-option]:hover) {
          background: hsl(211, 10%, 92%);
        }

        :global(#searchBoxPopover
            [data-reach-combobox-option][aria-selected="true"]:hover) {
          background: hsl(211, 10%, 90%);
        }

        :global(#searchBoxPopover [data-user-value]) {
          font-weight: bold;
        }

        :global(#searchBoxPopover [data-suggested-value]) {
          font-weight: normal;
        }
      `}</style>
    </Combobox>
  );
};
