const isAsynchronousEvent = require("..");

test("given a cloudformation event; then it should return true", () => {
  const actual = isAsynchronousEvent({
    RequestType: "Create",
    ServiceToken: "arn:aws:lambda:us-east-2:123456789012:function:lambda-error-processor-primer-14ROR2T3JKU66",
    ResponseURL:
      "https://cloudformation-custom-resource-response-useast2.s3-us-east-2.amazonaws.com/arn%3Aaws%3Acloudformation%3Aus-east-2%3A123456789012%3Astack/lambda-error-processor/1134083a-2608-1e91-9897-022501a2c456%7Cprimerinvoke%7C5d478078-13e9-baf0-464a-7ef285ecc786?AWSAccessKeyId=AKIAIOSFODNN7EXAMPLE&Expires=1555451971&Signature=28UijZePE5I4dvukKQqM%2F9Rf1o4%3D",
    StackId:
      "arn:aws:cloudformation:us-east-2:123456789012:stack/lambda-error-processor/1134083a-2608-1e91-9897-022501a2c456",
    RequestId: "5d478078-13e9-baf0-464a-7ef285ecc786",
    LogicalResourceId: "primerinvoke",
    ResourceType: "AWS::CloudFormation::CustomResource",
    ResourceProperties: {
      ServiceToken: "arn:aws:lambda:us-east-2:123456789012:function:lambda-error-processor-primer-14ROR2T3JKU66",
      FunctionName: "lambda-error-processor-randomerror-ZWUC391MQAJK"
    }
  });
  expect(actual).toBeTruthy();
});

test("given a cloudwatchevents event; then it should return true", () => {
  const actual = isAsynchronousEvent({
    account: "123456789012",
    region: "us-east-2",
    detail: {},
    "detail-type": "Scheduled Event",
    source: "aws.events",
    time: "2019-03-01T01:23:45Z",
    id: "cdc73f9d-aea9-11e3-9d5a-835b769c0d9c",
    resources: ["arn:aws:events:us-east-1:123456789012:rule/my-schedule"]
  });
  expect(actual).toBeTruthy();
});

test("given a cloudwatchlogs event; then it should return true", () => {
  const actual = isAsynchronousEvent({
    awslogs: {
      data:
        "ewogICAgIm1lc3NhZ2VUeXBlIjogIkRBVEFfTUVTU0FHRSIsCiAgICAib3duZXIiOiAiMTIzNDU2Nzg5MDEyIiwKICAgICJsb2dHcm91cCI6I..."
    }
  });
  expect(actual).toBeTruthy();
});

test("given a codecommit event; then it should return true", () => {
  const actual = isAsynchronousEvent({
    Records: [
      {
        awsRegion: "us-east-2",
        codecommit: {
          references: [
            {
              commit: "5e493c6f3067653f3d04eca608b4901eb227078",
              ref: "refs/heads/master"
            }
          ]
        },
        eventId: "31ade2c7-f889-47c5-a937-1cf99e2790e9",
        eventName: "ReferenceChanges",
        eventPartNumber: 1,
        eventSource: "aws:codecommit",
        eventSourceARN: "arn:aws:codecommit:us-east-2:123456789012:lambda-pipeline-repo",
        eventTime: "2019-03-12T20:58:25.400+0000",
        eventTotalParts: 1,
        eventTriggerConfigId: "0d17d6a4-efeb-46f3-b3ab-a63741badeb8",
        eventTriggerName: "index.handler",
        eventVersion: "1.0",
        userIdentityARN: "arn:aws:iam::123456789012:user/intern"
      }
    ]
  });
  expect(actual).toBeTruthy();
});

test("given a config event; then it should return true", () => {
  const actual = isAsynchronousEvent({
    invokingEvent:
      '{"configurationItem":{"configurationItemCaptureTime":"2016-02-17T01:36:34.043Z","awsAccountId":"000000000000","configurationItemStatus":"OK","resourceId":"i-00000000","ARN":"arn:aws:ec2:us-east-1:000000000000:instance/i-00000000","awsRegion":"us-east-1","availabilityZone":"us-east-1a","resourceType":"AWS::EC2::Instance","tags":{"Foo":"Bar"},"relationships":[{"resourceId":"eipalloc-00000000","resourceType":"AWS::EC2::EIP","name":"Is attached to ElasticIp"}],"configuration":{"foo":"bar"}},"messageType":"ConfigurationItemChangeNotification"}',
    ruleParameters: '{"myParameterKey":"myParameterValue"}',
    resultToken: "myResultToken",
    eventLeftScope: false,
    executionRoleArn: "arn:aws:iam::012345678912:role/config-role",
    configRuleArn: "arn:aws:config:us-east-1:012345678912:config-rule/config-rule-0123456",
    configRuleName: "change-triggered-config-rule",
    configRuleId: "config-rule-0123456",
    accountId: "012345678912",
    version: "1.0"
  });
  expect(actual).toBeTruthy();
});

test("given a s3 event; then it should return true", () => {
  const actual = isAsynchronousEvent({
    Records: [
      {
        eventVersion: "2.1",
        eventSource: "aws:s3",
        awsRegion: "us-east-2",
        eventTime: "2019-09-03T19:37:27.192Z",
        eventName: "ObjectCreated:Put",
        userIdentity: {
          principalId: "AWS:AIDAINPONIXQXHT3IKHL2"
        },
        requestParameters: {
          sourceIPAddress: "205.255.255.255"
        },
        responseElements: {
          "x-amz-request-id": "D82B88E5F771F645",
          "x-amz-id-2": "vlR7PnpV2Ce81l0PRw6jlUpck7Jo5ZsQjryTjKlc5aLWGVHPZLj5NeC6qMa0emYBDXOo6QBU0Wo="
        },
        s3: {
          s3SchemaVersion: "1.0",
          configurationId: "828aa6fc-f7b5-4305-8584-487c791949c1",
          bucket: {
            name: "lambda-artifacts-deafc19498e3f2df",
            ownerIdentity: {
              principalId: "A3I5XTEXAMAI3E"
            },
            arn: "arn:aws:s3:::lambda-artifacts-deafc19498e3f2df"
          },
          object: {
            key: "b21b84d653bb07b05b1e6b33684dc11b",
            size: 1305107,
            eTag: "b21b84d653bb07b05b1e6b33684dc11b",
            sequencer: "0C0F6F405D6ED209E1"
          }
        }
      }
    ]
  });
  expect(actual).toBeTruthy();
});

test("given a ses event; then it should return true", () => {
  const actual = isAsynchronousEvent({
    Records: [
      {
        eventVersion: "1.0",
        ses: {
          mail: {
            commonHeaders: {
              from: ["Jane Doe <janedoe@example.com>"],
              to: ["johndoe@example.com"],
              returnPath: "janedoe@example.com",
              messageId: "<0123456789example.com>",
              date: "Wed, 7 Oct 2015 12:34:56 -0700",
              subject: "Test Subject"
            },
            source: "janedoe@example.com",
            timestamp: "1970-01-01T00:00:00.000Z",
            destination: ["johndoe@example.com"],
            headers: [
              {
                name: "Return-Path",
                value: "<janedoe@example.com>"
              },
              {
                name: "Received",
                value:
                  "from mailer.example.com (mailer.example.com [203.0.113.1]) by inbound-smtp.us-west-2.amazonaws.com with SMTP id o3vrnil0e2ic for johndoe@example.com; Wed, 07 Oct 2015 12:34:56 +0000 (UTC)"
              },
              {
                name: "DKIM-Signature",
                value:
                  "v=1; a=rsa-sha256; c=relaxed/relaxed; d=example.com; s=example; h=mime-version:from:date:message-id:subject:to:content-type; bh=jX3F0bCAI7sIbkHyy3mLYO28ieDQz2R0P8HwQkklFj4=; b=sQwJ+LMe9RjkesGu+vqU56asvMhrLRRYrWCbV"
              },
              {
                name: "MIME-Version",
                value: "1.0"
              },
              {
                name: "From",
                value: "Jane Doe <janedoe@example.com>"
              },
              {
                name: "Date",
                value: "Wed, 7 Oct 2015 12:34:56 -0700"
              },
              {
                name: "Message-ID",
                value: "<0123456789example.com>"
              },
              {
                name: "Subject",
                value: "Test Subject"
              },
              {
                name: "To",
                value: "johndoe@example.com"
              },
              {
                name: "Content-Type",
                value: "text/plain; charset=UTF-8"
              }
            ],
            headersTruncated: false,
            messageId: "o3vrnil0e2ic28tr"
          },
          receipt: {
            recipients: ["johndoe@example.com"],
            timestamp: "1970-01-01T00:00:00.000Z",
            spamVerdict: {
              status: "PASS"
            },
            dkimVerdict: {
              status: "PASS"
            },
            processingTimeMillis: 574,
            action: {
              type: "Lambda",
              invocationType: "Event",
              functionArn: "arn:aws:lambda:us-west-2:012345678912:function:Example"
            },
            spfVerdict: {
              status: "PASS"
            },
            virusVerdict: {
              status: "PASS"
            }
          }
        },
        eventSource: "aws:ses"
      }
    ]
  });
  expect(actual).toBeTruthy();
});

test("given a sns event; then it should return true", () => {
  const actual = isAsynchronousEvent({
    Records: [
      {
        EventVersion: "1.0",
        EventSubscriptionArn: "arn:aws:sns:us-east-2:123456789012:sns-lambda:21be56ed-a058-49f5-8c98-aedd2564c486",
        EventSource: "aws:sns",
        Sns: {
          SignatureVersion: "1",
          Timestamp: "2019-01-02T12:45:07.000Z",
          Signature: "tcc6faL2yUC6dgZdmrwh1Y4cGa/ebXEkAi6RibDsvpi+tE/1+82j...65r==",
          SigningCertUrl:
            "https://sns.us-east-2.amazonaws.com/SimpleNotificationService-ac565b8b1a6c5d002d285f9598aa1d9b.pem",
          MessageId: "95df01b4-ee98-5cb9-9903-4c221d41eb5e",
          Message: "Hello from SNS!",
          MessageAttributes: {
            Test: {
              Type: "String",
              Value: "TestString"
            },
            TestBinary: {
              Type: "Binary",
              Value: "TestBinary"
            }
          },
          Type: "Notification",
          UnsubscribeUrl:
            "https://sns.us-east-2.amazonaws.com/?Action=Unsubscribe&amp;SubscriptionArn=arn:aws:sns:us-east-2:123456789012:test-lambda:21be56ed-a058-49f5-8c98-aedd2564c486",
          TopicArn: "arn:aws:sns:us-east-2:123456789012:sns-lambda",
          Subject: "TestInvoke"
        }
      }
    ]
  });
  expect(actual).toBeTruthy();
});
