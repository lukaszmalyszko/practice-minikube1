# Application created to practice Kubernetes with Minikube.

### Before you begin:
To work with Kuberenetes you must install following programs:
- docker
- kubectl
- minikube
- virtual machine (e.g. VirtualBox)

**Remember to enable VT-x or AMD-v in your computer's BIOS**

The goal of the exercise was to create an application which have two microservices stored in one cluster communicating each other:

![Diagram](https://github.com/lukaszmalyszko/practice-minikube1/blob/master/schema.jpg)

### Workflow:
1. User sends a request to the server, passing query parameter 'message'.
2. Server passes a request to bot.
3. If message is contained in the set of known greetings, bot returns random object from greeting responses.
4. Server passes received message to user.

### Setting up your application:
1. Run minikube
  ```
  minikube start
  ```

2. Set the Minikube context:
  ```
  kubectl config use-context minikube
  ```

3. Create bot service (Run those commends from ~/bot location)
  ```
  eval $(minikube docker-env)
  docker build -t bot:v1 .
  kubectl create -f .
  ```

4. Create server service (Run those commends from ~/server location)
  ```
  eval $(minikube docker-env)
  docker build -t server:v1 .
  kubectl create -f .
  ```

### Testing your application:
1. Check server's service's Cluster IP
  ```
  kubectl get services
  ```
2. Run ssh on Minikube
  ```
  minikube ssh
  ```
3. Send request with 'curl' to the server
  ```
  curl http://[service's cluster ip]/get_sentence?message=[message]
  ```

### Centralized logging:
1. Create account on https://timber.io/.
2. Create app on https://timber.io/ to colect Timber API Key.
3. Create Kubernetes Secret to store our Timber API Key
  ```
kubectl create secret generic timber --from-literal=timber-api-key=TIMBER_API_KEY
  ```
4. Launch Timber Agent DaemonSet
  ```
kubectl apply -f https://raw.githubusercontent.com/timberio/agent/master/support/scripts/kubernetes/timber-agent-daemonset-rbac.yaml

  ```
If you need more information about Centralized logging with Timber visit this website:

https://timber.io/blog/collecting-application-logs-on-kubernetes/


### Monitoring:

#### Prometheus configuration:
1. Create monitoring namespace
  ```
kubectl create namespace monitoring
  ```
2. Create the cluster role
  ```
kubectl create -f clusterRole.yaml
  ```
3. Create config map in Kubernetes
  ```
kubectl create -f config-map.yaml -n monitoring
  ```
4. Create a deployment on monitoring namespace
  ```
kubectl create  -f prometheus-deployment.yaml -n monitoring
  ```
5. Exposing Prometheus As a Service
  ```
kubectl create -f prometheus-service.yaml -n monitoring
  ```
6. Now you can access the Prometheus dashboard using Kubernetes master IP with 30050 port. To check IP write:
  ```
kubectl cluster-info
  ```

#### Using Prometheus in Grafana:
1. Open Grafana Dashboard using Kubernetes master IP with 30002 port
2. Click Grafana logo and chose Data Sources
3. Find on site button "Add data source"
4. Select Prometheus as a Type
5. Paste Prometheus URL and select direct Access
6. Add new Dashboard
7. Select for example Graph
8. Click on "Panel Title" and choose edit
9. In Metrics tab change Panel Data Source to your Prometheus Data Source

  If you need more information about using Prometheus in Grafana visit this website:

  http://docs.grafana.org/features/datasources/prometheus/





  
---
  
Useful links:

https://kubernetes.io/docs/tutorials/hello-minikube/

https://kubernetes.io/docs/tasks/access-application-cluster/connecting-frontend-backend/

https://apps.worldwritable.com/tutorials/chatbot/
