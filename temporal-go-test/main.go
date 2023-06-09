package main

import (
	"context"
	"log"

	"go.temporal.io/sdk/client"
)

const (
	taskQueue       = `hello-world`
	exampleWorkflow = `example`
)

func main() {
	c, err := client.Dial(client.Options{})
	if err != nil {
		log.Fatalln("Unable to create client", err)
	}
	defer c.Close()

	workflowOptions := client.StartWorkflowOptions{
		TaskQueue: taskQueue,
	}

	we, err := c.ExecuteWorkflow(context.Background(), workflowOptions, exampleWorkflow, "Richard")
	if err != nil {
		log.Fatalln("Unable to execute workflow", err)
	}

	log.Println("Started workflow", "WorkflowID", we.GetID(), "RunID", we.GetRunID())

	var result string
	err = we.Get(context.Background(), &result)
	if err != nil {
		log.Fatalln("Unable get workflow result", err)
	}
	log.Println("Workflow result:", result)
}
