# Aplikacja stworzona w ramach ćwiczeń z Kubernetes'a. 

Do wykonania zadania należy pobrać: docker, kubectl, minikube oraz maszynę wirtualną (np. VirtualBoxa).

Celem było stworzenie aplikacji składającej się z użytkownika oraz dwóch mikroserwisów umieszczonych w jednym klastrze:

![Diagram](https://github.com/lukaszmalyszko/practice-minikube1/blob/master/Untitled%20Diagram.jpg)

### Schemat działania:
1. Użytkownik wysyła request do serwera, przekazując parametr query 'message'.
2. Serwer przekazuje żądanie do bota.
3. Jeśli wiadomość jest w zbiorze znanych przywitań bota, bot zwraca losową odpowiedź.
4. Serwer przekazuje otrzymaną wiadomość do użytkownika.

### Przygotowanie aplikacji:
1. Najpierw należy uruchomić minikube komendą:
  ```
  minikube start
  ```

2. Następnie ustawiamy kontekst, aby kubectl wiedział, z którym klastrem współpracuje:
  ```
  kubectl config use-context minikube
  ```

3. Utworzenie serwisu bota (musimy znajdować się w folderze bot)
  ```
  eval $(minikube docker-env)
  docker build -t bot:v1
  kubectl create -f bot_deploy.yaml
  kubectl create -f bot_service.yaml
  ```

4. Utworzenie serwisu serwera (musimy znajdować się w folderze server)
  ```
  eval $(minikube docker-env)
  docker build -t server:v1
  kubectl create -f server_deploy.yaml
  kubectl create -f server_service.yaml
  ```

### Testowanie aplikacji
1. Sprawdzenie adresu IP serwisu serwera
  ```
  kubectl get services
  ```
2. Uruchomienie ssh minikube'a
  ```
  minikube ssh
  ```
3. Wysłanie żądania z użyciem 'curl' do serwera
  ```
  curl http://[adres_ip_serwisu_serwera]/get_sentence?message=[wiadomosc]
  ```
  
  
  
  
---
  
Pomocne linki:

https://kubernetes.io/docs/tutorials/hello-minikube/

https://kubernetes.io/docs/tasks/access-application-cluster/connecting-frontend-backend/

https://apps.worldwritable.com/tutorials/chatbot/
