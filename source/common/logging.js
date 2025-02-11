const request = require('request-promise-native');

module.exports = (serviceName, context) => {
    return async (tracingObj) => {
        // Tracing
        const { api, tracer } = tracingObj;

        const toLokiServer = async (details) => {
            const { message, level, job, endpointLabel, endpoint, namespace } = details;
            let error = false;
            let stream = {
                service_name: serviceName,
                level,
                job,
                namespace,
            };
            if (endpoint) {
                stream[endpointLabel] = endpoint;
            }

            try {
                await request(
                    {
                        uri: process.env.LOGS_TARGET,
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json'
                        },
                        json: true,
                        body: {
                            'streams': [
                                {
                                    stream,
                                    'values': [
                                        [ `${Date.now() * 1000000}`, message ]
                                    ]
                                }
                            ]
                        }
                    },
                );
            } catch (err) {
                console.log(`Logging error: ${err}`);
                error = true;
            }

            return error;
        };

        // Logging system sends to Loki
        const logEntry = async (details) => {
            let logSpan;
            let error = false;
            if (context === 'requester') {
                // Create a new span
                logSpan = tracer.startSpan("log_to_loki");
            }

            console.log(details.message);
            if (process.env.LOGS_TARGET) {
                error = await toLokiServer(details);
            } 

            if (context === 'requester') {
                // Set the status code as OK and end the span
                logSpan.setStatus({ code: (!error) ? api.SpanStatusCode.OK : api.SpanStatusCode.ERROR });
                logSpan.end();
            }
        };

        return logEntry;
    };
}
