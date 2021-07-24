#!/bin/bash

CODE_BUILD_ID=$1

SLACK_PAYLOAD_PRE='{"blocks":[{"type": "section", "text": {"type": "mrkdwn", "text": "StaticNextJs Service has a new release"}},{"type":"section","text":{"type": "mrkdwn","text":"'
SLACK_PAYLOAD_VAR=${CODE_BUILD_ID}
SLACK_PAYLOAD_POST=' has been deployed to PROD"}}]}'

curl -X POST -H 'Content-type: application/json' --data "${SLACK_PAYLOAD_PRE}${SLACK_PAYLOAD_VAR}${SLACK_PAYLOAD_POST}" https://hooks.slack.com/services/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