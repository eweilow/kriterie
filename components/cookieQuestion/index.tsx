import {
  LongTermTracking,
  LongTermTrackingPopupState,
  LongTermTrackingState
} from "@excitare/analytics";

import { createPortal } from "react-dom";

export const TrackingQuestion = () => (
  <LongTermTracking>
    {(state, trackingState, setEnabled, hide) =>
      createPortal(
        <section className={"tracking " + state.toString()}>
          {
            <div
              className={
                "text " +
                (trackingState === LongTermTrackingState.Enabled
                  ? "visible"
                  : "")
              }
            >
              Tack! Du kan ändra ditt val på sidan om kakor vid ett senare
              tillfälle om du ändrar dig.
            </div>
          }
          {
            <div
              className={
                "text " +
                (trackingState === LongTermTrackingState.Disabled
                  ? "visible"
                  : "")
              }
            >
              Oh, tack ändå. Du kan ändra ditt val på sidan om kakor vid ett
              senare tillfälle om du ändrar dig.
            </div>
          }
          {
            <div
              className={
                "text " +
                (trackingState === LongTermTrackingState.None ? "visible" : "")
              }
            >
              <div className="textContent">
                Hoppas att du har nytta av kriterie.se!
                <br />
                Kan vi få spara en långtidskaka för att se hur du använder sidan
                över längre tid?
              </div>
              <div className="buttonContent">
                <button onClick={() => setEnabled(true)}>Okej!</button>
                <button onClick={() => setEnabled(false)}>Nej tack.</button>
                <button onClick={() => hide()}>Dölj tills senare.</button>
              </div>
            </div>
          }

          <style jsx>{`
            .tracking {
              position: fixed;
              left: 0;
              right: 0;
              bottom: 8px;
              font-weight: bold;
              background: #ff9e6d;
              color: #6d2500;
              height: 56px;
              margin: 0 auto;
              max-width: 1000px;
              font-size: 16px;
              box-shadow: 0px 4px 16px #00000045;
              border-radius: 8px;
            }

            .tracking .text {
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              display: flex;
              flex-wrap: wrap;
              align-items: center;
              padding: 0 12px;
              opacity: 0;

              transition: opacity 275ms cubic-bezier(0.4, 0, 0.2, 1);

              user-select: none;
            }
            @media (max-width: 900px) {
              .tracking {
                max-width: 900px;
                height: 70px;
              }
              .tracking .text .textContent {
                padding-right: 12px;
              }
            }
            @media (max-width: 800px) {
              .tracking {
                max-width: 600px;
                height: 96px;
              }
              .tracking .text {
                flex-direction: column;
              }
              .tracking .text .textContent {
                padding-right: 0;
              }
              .buttonContent {
                margin-top: 4px;
              }
            }
            @media (max-width: 600px) {
              .tracking {
                max-width: 400px;
                height: 116px;
              }
            }

            @media (max-width: 1000px) {
              .tracking {
                font-size: 15px;
                justify-content: center;
                bottom: 0;
                border-bottom-left-radius: 0;
                border-bottom-right-radius: 0;
              }
              .tracking .text {
                padding: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
              }
            }

            .textContent {
              min-width: 300px;
              flex: 1;
              flex-grow: 1;
              flex-shrink: 0;
              vertical-align: middle;
            }
            .buttonContent {
              flex-shrink: 0;
              flex-grow: 0;
              margin: -4px;
            }

            .buttonContent button {
              margin: 4px;
            }

            .text:not(.visible) {
              pointer-events: none;
            }

            .tracking .text.visible {
              transition-delay: 100ms;
              opacity: 1;
            }

            .tracking.${LongTermTrackingPopupState.Hidden} {
              opacity: 0;
              pointer-events: none;
            }

            .tracking.${LongTermTrackingPopupState.Enter} {
              animation: enter 375ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
            }
            .tracking.${LongTermTrackingPopupState.Exiting} {
              animation: exit 500ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
            }

            @keyframes enter {
              from {
                opacity: 0;
                transform: translate3d(0, 4px, 0);
              }
              to {
                opacity: 1;
                transform: none;
              }
            }

            @keyframes exit {
              from {
                opacity: 1;
                transform: none;
              }
              to {
                opacity: 0;
                transform: translate3d(0, 32px, 0);
              }
            }

            button {
              background: white;
              border: none;
              border-radius: 4px;
              padding: 8px 12px;
              font-weight: bold;
              color: #7b2a00;
            }
          `}</style>
        </section>,
        document.body
      )
    }
  </LongTermTracking>
);
