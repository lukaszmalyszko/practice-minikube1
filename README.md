# Configure Istio with Kubernetes on Minikube.

### Before you begin:
To work with Kuberenetes you must install following programs:
- docker
- kubectl
- minikube
- istio-1.0.1
- virtual machine (e.g. VirtualBox)

**Remember to enable VT-x or AMD-v in your computer's BIOS**

The goal of the exercise was to create an application which have two microservices stored in one cluster communicating each other:

![Diagram](https://github.com/lukaszmalyszko/practice-minikube1/blob/istio/schema-istio.png)

### Workflow:
1. User sends a request to the server, passing query parameter 'message'.
2. Server passes a request to bot service.
3. If message is contained in the set of known greetings, bot returns random object from greeting responses.
4. Server passes received message to user.

There are 2 versions of the bot microservice:
* v1:
  * sends plain text
* v2: 
  * sends response with emoji at the end of the message
  * if request headers contain one called 'fail', the value of this headers defines chance that service will throw HTTP 500 error 

### Setting up your application:
1. Run minikube
  ```
  minikube start --memory=8192 --cpus=4 --kubernetes-version=v1.10.0     --extra-config=controller-manager.cluster-signing-cert-file="/var/lib/localkube/certs/ca.crt"     --extra-config=controller-manager.cluster-signing-key-file="/var/lib/localkube/certs/ca.key"
  ```

2. Set the Minikube context:
  ```
  kubectl config use-context minikube
  ```
3. Install istio on your cluster. Follow [istio docs](https://istio.io/docs/setup/kubernetes/helm-install/).

4. Enable automatic sidecar injection:
  ```
  kubectl label namespace default istio-injection=enabled
  ```

5. Create bot service (Run those commands from ~/bot location)
  ```
  eval $(minikube docker-env)
  docker build -t bot:v1 .
  kubectl create -f .
  docker build -t bot:v2 ../bot-v2/
  kubectl create -f ../bot-v2/bot-v2-deployment.yaml
  ```

5. Create server service (Run those commands from ~/server location)
  ```
  eval $(minikube docker-env)
  docker build -t server:v1 .
  kubectl create -f .
  ```

### Preparing istio components:
1. Gateway configuration:
   * Define the ingress gateway:
     ```
     kubectl apply -f networking/gateway.yaml
     ```
   * Set ingress ports:
     ```
     export INGRESS_PORT=$(kubectl -n istio-system get service istio-ingressgateway -o jsonpath='{.spec.ports[?(@.name=="http2")].nodePort}')
     export SECURE_INGRESS_PORT=$(kubectl -n istio-system get service istio-ingressgateway -o jsonpath='{.spec.ports[?(@.name=="https")].nodePort}')
     ```
   * Set ingress ip:
     ```
     export INGRESS_HOST=$(minikube ip)
     ```
   * Set GATEWAY_URL:
     ```
     export GATEWAY_URL=$INGRESS_HOST:$INGRESS_PORT
     ```
   * Test gateway:
     ```
     curl http://${GATEWAY_URL}
     ```
2. Apply default destination rules:
  ```
  kubectl apply -f networking/destination-rule-all.yaml
  ```
### Sample traffic management rules:
1. Route all traffic to v1 of each microservice:
  ```
  kubectl apply -f networking/virtual-service-all-v1.yaml
  ```
2. Route all traffic to v2 if request headers contain one called 'user' with value 'jason':
  ```
  kubectl apply -f networking/virtual-service-test-v2.yaml
  ```
3. Route all traffic to v2 if request headers contain one called 'user' with value 'jason', moreover if HTTP request fails istio will execute 3 additional attempts to connect:
  ```
  kubectl apply -f networking/virtual-service-test-retry.yaml
  ```
4. Route all traffic to v1 with 30% chance of 5s delay:
  ```
  kubectl apply -f networking/virtual-service-test-delay.yaml
  ```
5. Route all traffic to v1 and mirror traffic to v2:
  ```
  kubectl apply -f networking/virtual-service-mirroring.yaml
  ```
  
### Sample rate limiting:
* default rule is 500 requets every 1s
* 2 requests every 5s if the destination is server
* 5 requests every 5s if the destination is server and request headers contain one called "source" with value "10.28.11.20"
* no limit if request headers contain one called "user" with value "jason"
 ```
 kubectl apply -f policy/server-ratelimit.yaml
 ```
 
 ### Sample authentication policy:
 1. Apply mesh authentication policy:
 ```
 kubectl apply -f policy/default-meshpolicy.yaml
 ```
 2. Configure destination rule with mutual TLS:
 ```
 kubectl apply -f networking/destination-rule-all-mtls.yaml
 ```
 
 ### Metrics:
 * Tracing with Jaeger:
 ```
 kubectl port-forward -n istio-system $(kubectl get pod -n istio-system -l app=jaeger -o jsonpath='{.items[0].metadata.name}') 16686:16686 &
 ```
 Access the Jaeger dashboard by opening your browser to http://localhost:16686.
 
 * Collecting metrics and logs with Prometheus:
 ```
 kubectl -n istio-system port-forward $(kubectl -n istio-system get pod -l app=prometheus -o jsonpath='{.items[0].metadata.name}') 9090:9090 &
 ```
 Access the Prometheus dashboard by opening your browser to http://localhost:9090.
 
 * Visualizing metrics with Grafana:
 ```
 kubectl -n istio-system port-forward $(kubectl -n istio-system get pod -l app=grafana -o jsonpath='{.items[0].metadata.name}') 3000:3000 &
 ```
 Access the Grafana dashboard by opening your browser to http://localhost:3000.
 
 * Generating Service Graph:
 ```
 kubectl -n istio-system port-forward $(kubectl -n istio-system get pod -l app=servicegraph -o jsonpath='{.items[0].metadata.name}') 8088:8088 &
 ```
 Access the Service graph by opening your browser to http://localhost:8088/force/forcegraph.html.
 
 * Collecting logs with Fluentd:
   1. Configure new telemetry data:
   ```
   KUBE_ENABLE_NODE_LOGGING=true
   KUBE_LOGGING_DESTINATION=elasticsearch
   kubectl apply -f logging/new_telemetry.yaml
   ```
   2. Setting up  Fluentd, Elasticsearch, Kibana Stack
   ```
   kubectl apply -f logging/logging-stack.yaml
   ```
   3. Running Fluentd daemon:
   ```
   kubectl apply -f fluentd-istio.yaml
   ```
   4. Run Kibana:
   ```
   kubectl -n logging port-forward $(kubectl -n logging get pod -l app=kibana -o jsonpath='{.items[0].metadata.name}') 5601:5601 &
   ```
   
    Access the Kibana dashboard by opening your browser to http://localhost:5601.
---
  
Useful links:

https://kubernetes.io/docs/tutorials/hello-minikube/

https://kubernetes.io/docs/tasks/access-application-cluster/connecting-frontend-backend/

https://apps.worldwritable.com/tutorials/chatbot/
