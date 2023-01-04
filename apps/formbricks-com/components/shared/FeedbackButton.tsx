import { usePlausible } from "next-plausible";
import Script from "next/script";
import { useState } from "react";

declare global {
  interface Window {
    formbricks: any;
  }
}

export default function FeedbackButton() {
  const plausible = usePlausible();
  const [scriptReady, setScriptReady] = useState(false);
  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/npm/@formbricks/feedback@0.1.2/dist/index.umd.js"
        defer
        onReady={() => setScriptReady(true)}
      />
      <Script id="feedback-setup">{`
      window.formbricks = {
      config: {
        hqUrl: "https://xm.formbricks.com",
        formId: "clchup08o0000lj08526vdujt",
        contact: {
          name: "Matti",
          position: "Co-Founder",
          imgUrl: "https://avatars.githubusercontent.com/u/675065?s=128&v=4",
        },
      },
      ...window.formbricks,
    };`}</Script>
      {scriptReady && (
        <button
          className="bg-brand fixed top-1/2 -right-8 z-40 hidden -translate-y-1/2 -rotate-90 rounded p-4 font-medium text-white sm:block"
          onClick={(event) => {
            window.formbricks.open(event);
            plausible("openFeedback");
          }}>
          Feedback
        </button>
      )}
    </>
  );
}
