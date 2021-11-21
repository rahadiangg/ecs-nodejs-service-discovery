import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const node = process.env.node || "Node1";
const host_lawan = process.env.host_lawan || "localhost";

app.use(express.json());

app.get('/call', async (req, res) => {
    try {
        const response = await axios.get(`http://${host_lawan}:3000/get`);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({message: error});
    }
});

app.get('/get', async (req, res) => {


    try {        
        const ecs_metadata = await axios.get(process.env.ECS_CONTAINER_METADATA_URI_V4 + "/task");
    
        res.json({
            "messages" : "Response from " + node,
            // "task_family": ecs_metadata.data.Containers[0].Labels.com.amazonaws.ecs.task-definition-family,
            // "task_version": ecs_metadata.data.Containers[0].Labels.com.amazonaws.ecs.task-definition-version,
            "serve_from": ecs_metadata.data.Containers[0].Networks[0].IPv4Addresses[0],
            "AZ": ecs_metadata.data.AvailabilityZone,

        });
    } catch (error) {
        res.status(500).json({error});
    }
});

app.get('/', (req, res) => {
    res.send(`<h1>${node} serving...</h1>`);
});

app.listen(port, () => console.log(`Server running on ${port}`));