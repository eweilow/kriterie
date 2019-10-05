import Head from "next/head";

export const LayoutStyle: React.FC = () => (
  <>
    {process.env.NODE_ENV === "production" && (
      <Head>
        <link
          rel="preload"
          href="/static/font/GlacialIndifference-Regular.woff2"
          as="font"
        />
        <link
          rel="preload"
          href="/static/font/GlacialIndifference-Bold.woff2"
          as="font"
        />
        <link
          rel="preload"
          href="/static/font/GlacialIndifference-Italic.woff2"
          as="font"
        />
      </Head>
    )}
    <style jsx global>{`
      @font-face {
        font-family: "GlacialIndifference";
        src: url("/static/font/GlacialIndifference-Bold.eot");
        src: url("/static/font/GlacialIndifference-Bold.woff2") format("woff2"),
          url("/static/font/GlacialIndifference-Bold.otf") format("opentype"),
          url("/static/font/GlacialIndifference-Bold.woff") format("woff"),
          url("/static/font/GlacialIndifference-Bold.ttf") format("truetype"),
          url("/static/font/GlacialIndifference-Bold.svg#GlacialIndifference-Bold")
            format("svg"),
          url("/static/font/GlacialIndifference-Bold.eot?#iefix")
            format("embedded-opentype");
        font-weight: bold;
        font-style: normal;
        font-display: fallback;
      }
      @font-face {
        font-family: "GlacialIndifference";
        src: url("/static/font/GlacialIndifference-Italic.eot");
        src: url("/static/font/GlacialIndifference-Italic.woff2")
            format("woff2"),
          url("/static/font/GlacialIndifference-Italic.otf") format("opentype"),
          url("/static/font/GlacialIndifference-Italic.woff") format("woff"),
          url("/static/font/GlacialIndifference-Italic.ttf") format("truetype"),
          url("/static/font/GlacialIndifference-Italic.svg#GlacialIndifference-Italic")
            format("svg"),
          url("/static/font/GlacialIndifference-Italic.eot?#iefix")
            format("embedded-opentype");
        font-weight: normal;
        font-style: italic;
        font-display: fallback;
      }
      @font-face {
        font-family: "GlacialIndifference";
        src: url("/static/font/GlacialIndifference-Regular.eot");
        src: url("/static/font/GlacialIndifference-Regular.woff2")
            format("woff2"),
          url("/static/font/GlacialIndifference-Regular.otf") format("opentype"),
          url("/static/font/GlacialIndifference-Regular.woff") format("woff"),
          url("/static/font/GlacialIndifference-Regular.ttf") format("truetype"),
          url("/static/font/GlacialIndifference-Regular.svg#GlacialIndifference-Regular")
            format("svg"),
          url("/static/font/GlacialIndifference-Regular.eot?#iefix")
            format("embedded-opentype");
        font-weight: normal;
        font-style: normal;
        font-display: fallback;
      }

      html,
      body,
      * {
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0) !important;
        -webkit-tap-highlight-color: transparent !important; /* For some Androids */
      }
      body,
      html {
        margin: 0;
        padding: 0;
        width: 100%;
        min-height: 100%;
        box-sizing: border-box;
        font-family: "GlacialIndifference", "Roboto", -apple-system,
          "Trebuchet MS", Helvetica, sans-serif;
        font-size: 16px;

        background: #fffcfa;
        background-color: #fffcfa;
        background-image: url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.184 20c.357-.13.72-.264 1.088-.402l1.768-.661C33.64 15.347 39.647 14 50 14c10.271 0 15.362 1.222 24.629 4.928.955.383 1.869.74 2.75 1.072h6.225c-2.51-.73-5.139-1.691-8.233-2.928C65.888 13.278 60.562 12 50 12c-10.626 0-16.855 1.397-26.66 5.063l-1.767.662c-2.475.923-4.66 1.674-6.724 2.275h6.335zm0-20C13.258 2.892 8.077 4 0 4V2c5.744 0 9.951-.574 14.85-2h6.334zM77.38 0C85.239 2.966 90.502 4 100 4V2c-6.842 0-11.386-.542-16.396-2h-6.225zM0 14c8.44 0 13.718-1.21 22.272-4.402l1.768-.661C33.64 5.347 39.647 4 50 4c10.271 0 15.362 1.222 24.629 4.928C84.112 12.722 89.438 14 100 14v-2c-10.271 0-15.362-1.222-24.629-4.928C65.888 3.278 60.562 2 50 2 39.374 2 33.145 3.397 23.34 7.063l-1.767.662C13.223 10.84 8.163 12 0 12v2z' fill='%23ff6600' fill-opacity='0.01' fill-rule='evenodd'/%3E%3C/svg%3E");
      }

      pre {
        font-size: 14px;
      }

      html {
        height: 100%;
        overflow-y: scroll;
        overflow-x: hidden;
      }

      body {
        padding: 0;
        position: relative;
      }

      p {
        color: #262626;
      }

      a {
        color: inherit;
      }
      a:hover {
        opacity: 0.9;
      }
      a:active {
        opacity: 0.8;
      }

      .column.root {
        padding-top: 64px;
        padding-bottom: 64px;
      }

      pre {
        max-width: 100%;
        overflow: scroll;
        background: #efefef;
        padding: 4px;
        border-radius: 8px;
        border: 1px solid #c7c7c7;
        box-sizing: border-box;
      }

      h1,
      h2,
      h3,
      h4 {
        margin-top: 0.75em;
        margin-bottom: 0.45em;
      }
      h1 {
        font-size: 32px;
        color: #280d00;
      }
      h2 {
        font-size: 25px;
        color: #3b271d;
      }
      h3 {
        font-size: 22px;
        color: #523b31;
      }
      h4 {
        font-size: 19px;
        color: #832b05;
      }
      h5 {
        font-size: 16px;
        color: #6b615d;
      }
    `}</style>
  </>
);
