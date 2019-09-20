export const LayoutStyle: React.FC = () => (
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
    }
    @font-face {
      font-family: "GlacialIndifference";
      src: url("/static/font/GlacialIndifference-Italic.eot");
      src: url("/static/font/GlacialIndifference-Italic.woff2") format("woff2"),
        url("/static/font/GlacialIndifference-Italic.otf") format("opentype"),
        url("/static/font/GlacialIndifference-Italic.woff") format("woff"),
        url("/static/font/GlacialIndifference-Italic.ttf") format("truetype"),
        url("/static/font/GlacialIndifference-Italic.svg#GlacialIndifference-Italic")
          format("svg"),
        url("/static/font/GlacialIndifference-Italic.eot?#iefix")
          format("embedded-opentype");
      font-weight: normal;
      font-style: italic;
    }
    @font-face {
      font-family: "GlacialIndifference";
      src: url("/static/font/GlacialIndifference-Regular.eot");
      src: url("/static/font/GlacialIndifference-Regular.woff2") format("woff2"),
        url("/static/font/GlacialIndifference-Regular.otf") format("opentype"),
        url("/static/font/GlacialIndifference-Regular.woff") format("woff"),
        url("/static/font/GlacialIndifference-Regular.ttf") format("truetype"),
        url("/static/font/GlacialIndifference-Regular.svg#GlacialIndifference-Regular")
          format("svg"),
        url("/static/font/GlacialIndifference-Regular.eot?#iefix")
          format("embedded-opentype");
      font-weight: normal;
      font-style: normal;
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
      font-family: "GlacialIndifference", -apple-system, "Trebuchet MS",
        Helvetica, sans-serif;
      font-size: 18px;

      background: #fffcfa;
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
      overflow-x: hidden;
    }
  `}</style>
);
