minikube start
kubectl create -f https://k8s.io/examples/service/access/hello.yaml
kubectl describe deployment hello
kubectl create -f https://k8s.io/examples/service/access/hello-service.yaml
kubectl create -f https://k8s.io/examples/service/access/frontend.yaml

