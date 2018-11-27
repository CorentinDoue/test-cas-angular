# Angular CAS example

Goal: show how to implement, in Angular + phpCAS, the [various possibilites of authenticating a web service using the CAS protocol](https://prigaux.frama.io/cas-spa-docs/)

Cette application de démonstration est construite avec "angular-cli".

Quelques pages PHP très simples ont été ajouté pour montrer comment authentifier une application Angular sur CAS.

NB : 

## tous les commits montrent une fonctionnalité séparée.

Pour bien comprendre je vous conseille de les regarder/tester l'un après l'autre :

* [casification de la page html](https://framagit.org/prigaux/cas-angular-example/commit/ea77d91d31c8cc5cc9cad1f454e906910f78bfc1) : app/index.html est accessible, mais l'appli est sensée démarrer sur la page app/index.php
* [401 géré par HttpInterceptor](https://framagit.org/prigaux/cas-angular-example/commit/7ef23e080a1889014fd216584a0772a6c8820626) : casification de la page html + propose le rechargement de la page en cas de fin de session
* [JSONP](https://framagit.org/prigaux/cas-angular-example/commit/5eb91b887d9f91af0d813d4c7d070da09fb6b8a1) : tentative d'obtenir une session via JSONP + propose le rechargement de la page en cas d'échec. cf le [diagramme](https://prigaux.frama.io/cas-spa-docs/#jsonp)
* [login_then](https://framagit.org/prigaux/cas-angular-example/commit/2b28b8f280368c110c62e2f49ea7649a559af21a) : l'api fournit une page login.php qui redirige vers la page html une fois la session obtenue. cf le [diagramme](https://prigaux.frama.io/cas-spa-docs/#initial-redirect)
* [login_then - bearer](https://framagit.org/prigaux/cas-angular-example/commit/0be789c5cb701b6a20327ad4c0e42d7effedfd60) : pareil qu'au dessus, mais sans cookies. cf le [diagramme](https://prigaux.frama.io/cas-spa-docs/#initial-redirect)
* [implict grant](https://framagit.org/prigaux/cas-angular-example/commit/ae2e69d96b05c5575ccd3447e170abfc9cbed6c3) : cf le [diagramme](https://prigaux.frama.io/cas-spa-docs/#initial-redirect)

NB: this is a remake of [AngularJS phpCAS](https://github.com/prigaux/angular-seed)

## pour le faire fonctionner :

```
git clone https://framagit.org/prigaux/cas-angular-example
cd cas-angular-example
npm install
npm run ng build --watch
```

Pointer un apache avec mod-php vers le répertoire cas-angular-example/dist/

NB : il faut avoir phpCAS : ``apt install php-cas`` ou voir https://wiki.jasig.org/display/CASC/phpCAS+installation+guide

