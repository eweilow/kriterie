/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const { execSync } = require("child_process");

const SENTRY_ORG = "personal-yl";
const SENTRY_PROJECT = "kriterie";
const SENTRY_LOG_LEVEL = "";

const VERSION = execSync("sentry-cli releases propose-version", {
  env: {
    SENTRY_PROJECT,
    SENTRY_ORG,
    SENTRY_LOG_LEVEL
  }
})
  .toString()
  .trim();

if (!/^[A-z0-9]+$/.test(VERSION)) {
  console.log("Invalid version: '" + VERSION + "'");
  return setTimeout(() => {
    process.exit(1);
  }, 500);
}
console.log("Using version: '" + VERSION + "'");

console.log("Starting release");
execSync(`sentry-cli releases new "${VERSION}"`, {
  env: {
    SENTRY_PROJECT,
    SENTRY_ORG,
    SENTRY_LOG_LEVEL
  }
});

console.log("Assigning commits");
execSync(`sentry-cli releases set-commits "${VERSION}" --auto`, {
  env: {
    SENTRY_PROJECT,
    SENTRY_ORG,
    SENTRY_LOG_LEVEL
  }
});

console.log("Uploading sourcemaps");
execSync(
  `sentry-cli releases files "${VERSION}" upload-sourcemaps --rewrite --strip-common-prefix ./.next`,
  {
    env: {
      SENTRY_PROJECT,
      SENTRY_ORG,
      SENTRY_LOG_LEVEL
    }
  }
);

console.log("Creating deployment");
execSync(`sentry-cli releases deploys "${VERSION}" new -e NOW`, {
  env: {
    SENTRY_PROJECT,
    SENTRY_ORG,
    SENTRY_LOG_LEVEL
  }
});

console.log("Finalizing release");
execSync(`sentry-cli releases finalize "${VERSION}"`, {
  env: {
    SENTRY_PROJECT,
    SENTRY_ORG,
    SENTRY_LOG_LEVEL
  }
});
