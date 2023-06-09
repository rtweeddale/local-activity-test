import {
    Client as TemporalClient,
    Connection as TemporalConnection,
    ConnectionOptions as TemporalConnectionOptions
} from '@temporalio/client';

const temporalAddress: string = `localhost:7233`
const temporalnamespace: string = `default`
const taskQueue: string = `hello-world`
const exampleWorkflow: string = `example`



async function runTemporalHello() {
    const connectionOptions: TemporalConnectionOptions = {
        address: temporalAddress,
    }
    const connection: TemporalConnection = await TemporalConnection.connect(connectionOptions);
    const temporalClient = new TemporalClient({
        connection,
        namespace: temporalnamespace,
    });

    const handle = await temporalClient.workflow.start(exampleWorkflow, {
        args: ["Richard"],
        taskQueue: taskQueue,
        workflowId: 'test-local-1'
    });
    const response = await handle.result()
    console.log(response)
}

runTemporalHello()