# Application created to practice Kubernetes with Minikube.

### Before you begin
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

### Setting up an application:
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
  docker build -t bot:v1
  kubectl create -f .
  ```

4. Create server service (Run those commends from ~/server location)
  ```
  eval $(minikube docker-env)
  docker build -t server:v1
  kubectl create -f .
  ```

### Testing application
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
  
  
  
  
---
  
Useful links:

https://kubernetes.io/docs/tutorials/hello-minikube/

https://kubernetes.io/docs/tasks/access-application-cluster/connecting-frontend-backend/

https://apps.worldwritable.com/tutorials/chatbot/
