import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ComboboxPopover,
  ComboboxOptionText,
} from "@reach/combobox";
import useResizeObserver from "use-resize-observer";
import Head from "next/head";
import * as Fathom from "fathom-client";

import { useEffect, useCallback, useState, useRef } from "react";

import * as ExampleWorker from "./search.worker";
import { useRouter } from "next/router";
import clsx from "clsx";
import { SearchLoadingBar } from "../loadingIndicator/searchBar";
import { SearchPreload } from "./searchPreload";

const workerCache = new Map<string, any>();
function getWorkerByUrl(url: string) {
  if (workerCache.has(url)) {
    return workerCache.get(url);
  }

  const worker = new (ExampleWorker as any)();
  worker.postMessage({
    type: "url",
    url,
  });
  workerCache.set(url, worker);

  return worker;
}

export const SearchBox: React.FC<{
  zIndex?: number;
  id: string;
  initialSize?: number;
}> = ({ id, initialSize = null, zIndex = 1 }) => {
  const [searchDisabled, setSearchDisabled] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [loadingString, setLoadingString] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>(null);

  const worker = useRef<Worker>(null);
  const nextString = useRef(searchString);
  useEffect(() => {
    worker.current = getWorkerByUrl(window.location.origin + "/api/search");

    function listener(msg: any) {
      if (nextString.current === msg.data.str) {
        setSearchResults(
          msg.data.results.map((el) => ({
            code: el.obj.code,
            type: el.obj.type,
            title: `${el.obj.title} (${el.obj.code})`,
          }))
        );
      }
    }
    worker.current.addEventListener("message", listener);

    return () => {
      worker.current.removeEventListener("message", listener);
    };
  }, []);

  useEffect(() => {
    if (searchString.trim() === "") {
      setSearchResults(null);
      if (searchString !== "") {
        setSearchString("");
      }
      nextString.current = "";
    } else {
      worker.current.postMessage({
        type: "search",
        searchString: searchString.trim(),
      });
      nextString.current = searchString;
    }
  }, [searchString]);

  const handleChange = useCallback(
    (event) => setSearchString(event.target.value),
    [setSearchString]
  );

  const router = useRouter();

  const mountedRef = useRef(false);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const handleSelect = useCallback(
    (value) => {
      function start() {
        setSearchResults(null);
        setSearchString("");
        setLoadingString(value);
        setActive(true);
        setLoading(true);
        setSearchDisabled(true);

        Fathom.trackGoal("JTEEC6YX", 0);
      }
      function waitForPromise(promise: Promise<any>) {
        promise.then(() => {
          if (mountedRef.current) {
            setLoading(false);
            setActive(false);
            setSearchDisabled(false);
            setSearchResults(null);
            setSearchString("");
          }
        });
      }
      setSearchString(value);

      if (searchResults != null) {
        const found = searchResults.find((el) => el.title === value);
        if (found.type === "program") {
          waitForPromise(
            router.push("/gy11/program/[id]", "/gy11/program/" + found.code)
          );
          start();
        }
        if (found.type === "course") {
          waitForPromise(
            router.push("/gy11/course/[id]", "/gy11/course/" + found.code)
          );
          start();
        }
        if (found.type === "subject") {
          waitForPromise(
            router.push("/gy11/subject/[id]", "/gy11/subject/" + found.code)
          );
          start();
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

  const [boxRef, , boxHeight] = useResizeObserver({
    defaultHeight: 40,
  });

  const Text = ComboboxOptionText as any;

  return (
    <Combobox
      as="div"
      openOnFocus
      className={clsx({ active, hasResults: searchResults })}
      id={id}
      onSelect={handleSelect}
      // value={searchString}
    >
      <SearchPreload />
      <div data-size={boxHeight} ref={boxRef} className="box right">
        <div className="box left">
          <ComboboxInput
            as="input"
            autoComplete="off"
            name="search"
            type="text"
            onFocus={setFocused}
            onBlur={setUnfocused}
            value={loading ? loadingString : searchString}
            disabled={searchDisabled}
            aria-label="Innehållssök"
            onChange={handleChange}
            placeholder="sök efter något"
          />
          <div className="background" />
          <SearchLoadingBar.Wrapped loading={loading} />
        </div>
      </div>
      {searchResults && (
        <ComboboxPopover portal={false} id={id + "Popover"}>
          <ComboboxList persistSelection aria-label="Innehållssök">
            {searchResults.map((result, index) => (
              <ComboboxOption key={index} value={`${result.title}`}>
                {result.type === "subject" && <i>ämne:</i>}
                {result.type === "course" && <i>kurs:</i>}
                {result.type === "program" && <i>program:</i>}
                <br />
                <Text />
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
          position: relative;
          z-index: 1;
        }

        .box.left {
          border-top-left-radius: 8px;
          border-bottom-left-radius: 8px;
          background: #eb7031;
          transform: ${
            initialSize != null
              ? `translate3d(calc(100% - ${initialSize}px), 0, 0)`
              : "none"
          };
          transition: transform 195ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        :global(#${id}.active) .box.left,
        :global(#${id}[aria-expanded="true"].hasResults) .box.left {
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
          pointer-events: none;
        }

        :global(input:focus) + .background {
          opacity: 0.1 !important;
        }

        .box.right {
          border-top-right-radius: 8px;
          border-bottom-right-radius: 8px;
          filter: drop-shadow(0px 2px 4px #0000002b) drop-shadow(0px 0px 2px #0000001b);
          transition: filter 195ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        :global(#${id}.active) .box.right,
        :global(#${id}[aria-expanded="true"].hasResults) .box.right {
          filter: drop-shadow(0px 4px 8px #0000002a)
            drop-shadow(0px 2px 2px #0000002b);
        }

        .border {
          border: 2px solid #ff9d6b;
          border-radius: 8px;
        }

        :global(#${id}[data-reach-combobox]) {
          z-index: ${zIndex};
          position: relative;
          width: 100%;
          height: 100%;
        }

        :global(#${id} [data-reach-combobox-input]),
        .box {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          display: block;
          box-sizing: border-box;
        }

        :global(#${id} [data-reach-combobox-input]) {
          background: none;
          border: none;
          padding: 4px 8px;
          outline: none !important;
        }
        :global(#${id} [data-reach-combobox-input]),
        :global(#${id} [data-reach-combobox-input])::placeholder {
          color: #4d1a00;
          font-size: 16px;
          font-family: "GlacialIndifference", "Roboto", -apple-system,
            "Trebuchet MS", Helvetica, sans-serif;
          font-weight: bold;
        }

        :global(#${id + "Popover"}[data-reach-combobox-popover]) {
          position: absolute;
          top: -4px;
          left: -4px;
          right: -4px;
          background: #ffb58f;
          color: #4d1a00;
          border-radius: 12px;
          padding-top: ${boxHeight + 16}px;
          border: none;
          box-shadow: 0px 4px 24px #00000024, 0px 2px 4px #0000000f;
          padding-bottom: 8px;

          animation: enter 195ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
          outline: none;
        }

        :global(#${id}[aria-expanded="true"].hasResults)
          :global(#${id + "Popover"}[data-reach-combobox-popover]) {
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

        :global(#${id + "Popover"} [data-reach-combobox-list]) {
          list-style: none;
          margin: 0;
          padding: 0;
          user-select: none;
        }

        :global(#${id + "Popover"} [data-reach-combobox-option]) {
          cursor: pointer;
          margin: 0;
          padding: 4px 8px;
          outline: none !important;
        }

        :global(#${id + "Popover"}
            [data-reach-combobox-option][aria-selected="true"]) {
          background: hsl(20, 100%, 70%);
        }

        :global(#${id + "Popover"} [data-reach-combobox-option]:hover) {
          background: hsl(20, 100%, 68%);
        }

        :global(#${id + "Popover"}
            [data-reach-combobox-option][aria-selected="true"]:hover) {
          background: hsl(20, 100%, 66%);
        }

        :global(#${id + "Popover"} [data-user-value]) {
          font-weight: bold;
        }

        :global(#${id + "Popover"} [data-suggested-value]) {
          font-weight: normal;
        }
      `}</style>
    </Combobox>
  );
};
