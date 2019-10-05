import {
  LongTermTrackingOptIn,
  LongTermTrackingState
} from "@excitare/analytics";
import { useState, useLayoutEffect } from "react";
import { ToggleControl } from "../checkbox";
import { mdiGoogleAnalytics, mdiCircle, mdiCircleMedium } from "@mdi/js";

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
  if (typeof window === "undefined") {
    return <CookieToggleContainer enter={false} />;
  }

  return (
    <CookieToggleContainer enter>
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

              <div className="control">
                <ToggleControl
                  type="radio"
                  checked={trackingState === LongTermTrackingState.Enabled}
                  value="enabled"
                  onChange={val => {
                    if (val) {
                      setTrackingEnabled(true);
                    }
                  }}
                  label={"godkänn långtidsspårning"}
                  color="#004400"
                  name={"trackingConsent"}
                  icon={mdiCircle}
                />
              </div>
              <div className="control">
                <ToggleControl
                  type="radio"
                  checked={trackingState === LongTermTrackingState.Disabled}
                  value="disabled"
                  onChange={val => {
                    if (val) {
                      setTrackingEnabled(false);
                    }
                  }}
                  label={"behåll långtidsspårning avstängt"}
                  color="#940022"
                  name={"trackingConsent"}
                  icon={mdiCircle}
                />
              </div>
              <style jsx>{`
                .control {
                  margin-top: 12px;
                }
              `}</style>
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
