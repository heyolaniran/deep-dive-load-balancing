# deep-dive-load-balancing
Advanced load balancing system that can handle heterogeneous backend servers

## What about the project ?  

Load balancing is a critical component of any scalable web applications. 
It helps distribute incoming client requests evenly accross multiple backend servers optimizing resource utilization and the high availability. 

## What about the features to implement in the project ?  

* Accepts HTTPS requests and terminate SSL ✔️
* Health check endpoints on each server for monitoring status ✔️
* Weighted round robin algo to distribute loads based on server capacity
* Session Affinity ( route requests from the same client to same backend)
* Graceful handling of servers being added or removed
* Customizable with different balancing strategies
* Detailed logging and metrics for monitoring 
