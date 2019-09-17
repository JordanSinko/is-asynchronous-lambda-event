const isCloudformationEvent = require("./isCloudformationEvent");
const isCloudwatchEventsEvent = require("./isCloudwatchEventsEvent");
const isCloudwatchLogsEvent = require("./isCloudwatchLogsEvent");
const isCodeCommitEvent = require("./isCodeCommitEvent");
const isConfigEvent = require("./isConfigEvent");
const isS3Event = require("./isS3Event");
const isSesEvent = require("./isSesEvent");
const isSnsEvent = require("./isSnsEvent");

module.exports = function isAsynchronousLambdaEvent(event) {
  return (
    isCloudformationEvent(event) ||
    isCloudwatchEventsEvent(event) ||
    isCloudwatchLogsEvent(event) ||
    isCodeCommitEvent(event) ||
    isConfigEvent(event) ||
    isS3Event(event) ||
    isSesEvent(event) ||
    isSnsEvent(event)
  );
};
