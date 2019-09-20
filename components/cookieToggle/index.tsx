import {
  LongTermTrackingOptIn,
  LongTermTrackingState
} from "@excitare/analytics";
import { useState, useLayoutEffect } from "react";

const CookieToggleContainer: React.FC<{ enter: boolean }> = ({
  enter,
  children
}) => {
  const [visible, setVisible] = useState(false);
  if (typeof window !== "undefined") {
    useLayoutEffect(() => {
      if (enter) {
        setVisible(true);
      }
    }, [enter]);
  }

  return (
    <div className={visible ? "cookieToggle enter" : "cookieToggle"}>
      {visible && children}
      <noscript>
        Eftersom JavaScript är avstängt i din webbläsare kommer kakor inte att
        sparas.
      </noscript>
      <style jsx>{`
        div {
          height: 56px;
          opacity: 0;
        }

        div.enter {
          animation: enter 200ms forwards;
        }

        @keyframes enter {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export const CookieToggle: React.FC = () => {
  return (
    <CookieToggleContainer enter={typeof window !== "undefined"}>
      <LongTermTrackingOptIn>
        {(trackingState, setTrackingEnabled, trackingPossible) =>
          trackingPossible ? (
            <>
              {trackingState === LongTermTrackingState.Enabled && (
                <>Långtidsspårning är explicit godkänt av användaren.</>
              )}
              {trackingState === LongTermTrackingState.Disabled && (
                <>Långtidsspårning är explicit avstängt av användaren.</>
              )}
              {trackingState === LongTermTrackingState.None && (
                <>
                  Långtidsspårning är varken godkänt eller avstängt av
                  användaren.
                </>
              )}
              <br />
              <button
                disabled={trackingState === LongTermTrackingState.Enabled}
                onClick={() => setTrackingEnabled(true)}
              >
                godkänn långtidsspårning
              </button>
              <button
                disabled={trackingState === LongTermTrackingState.Disabled}
                onClick={() => setTrackingEnabled(false)}
              >
                {trackingState === LongTermTrackingState.Disabled
                  ? "stäng av långtidsspårning"
                  : "behåll långtidsspårning avstängt"}
              </button>
            </>
          ) : (
            <>
              Långtidsspårning är avstängt av din webbläsare genom inställningen{" "}
              <i>do-not-track</i>.
            </>
          )
        }
      </LongTermTrackingOptIn>
    </CookieToggleContainer>
  );
};
