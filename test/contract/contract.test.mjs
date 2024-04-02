import specmatic from "specmatic";
import { getApp, startAppServer, stopAppServer } from "./util/app.server.js";

const APP_HOST = "localhost";
const APP_PORT = 8081;

let appServer;

appServer = await startAppServer(APP_PORT);
await specmatic.testWithApiCoverage(getApp(), APP_HOST, APP_PORT);
// test Parameter provided to showTestResults is global test function from jest
// eslint-disable-next-line no-undef
specmatic.showTestResults(test);
await stopAppServer(appServer);
