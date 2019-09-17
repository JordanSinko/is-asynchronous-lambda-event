/*
Sample CloudwatchLogs Event:
{
    "awslogs": {
        "data": "ewogICAgIm1lc3NhZ2VUeXBlIjogIkRBVEFfTUVTU0FHRSIsCiAgICAib3duZXIiOiAiMTIzNDU2Nzg5MDEyIiwKICAgICJsb2dHcm91cCI6I..."
    }
}
*/

module.exports = event => event && event.awslogs && event.awslogs.data;
