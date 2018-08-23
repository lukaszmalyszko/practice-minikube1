# Aplikacja stworzona w ramach ćwiczeń z Kubernetes'a. 

Do wykonania zadania należy pobrać: docker, kubectl, minikube oraz maszynę wirtualną (np. VirtualBoxa).
Celem było stworzenie aplikacji składającej się z użytkownika oraz dwóch mikroserwisów umieszczonych w jednym klastrze.

Najpierw należy uruchomić minikube komendą:
```
minikube start
```

Następnie ustawiamy kontekst, aby kubectl wiedział, z którym klastrem współpracuje:
```
kubectl config use-context minikube
```

Utworzenie serwisu bota (musimy znajdować się w folderze bot)
```
eval $(minikube docker-env)
docker build -t bot:v1
kubectl create -f bot_deploy.yaml
kubectl create -f bot_service.yaml
```

Utworzenie serwisu serwera (musimy znajdować się w folderze server)
```
eval $(minikube docker-env)
docker build -t server:v1
kubectl create -f server_deploy.yaml
kubectl create -f server_service.yaml
```
