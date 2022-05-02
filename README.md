# Spis treści
1. [Serwer](#serwer)
2. [CRUD](#crud)
3. [API](#api)
4. [Struktura aplikacji](#struktura-aplikacji)
5. [Zadanie](#zadanie)

# Serwer
Celem jest napisanie serwera który umożliwi wysyłanie wiadomości do serwera i odczytywanie wiadomości z niego. Komunikacja z serwerem odbędzie się przez REST API, po drodze omówione zostaną pojęcia powiązane. Od razu mamy kilka problemów do rozwiązania, jednak na początku zacznijmy od wprowadzenia do tematu.

# CRUD
Skrót CRUD może być stosowany w odniesieniu do interfejsu użytkownika lub tak naprawdę jakiegokolwiek interfejsu odsłaniającego jakąś funkcjonalność. Interfejsy CRUD zazwyczaj pozwalają użytkownikowi na:
- Utworzenie nowych informacji (Create)
- Odczytanie istniejących informacji (Read)
- Modyfikowanie istniejących informacji (Update)
- Usuwanie istniejących informacji (Delete)

Jednocześnie to są cztery podstawowe funkcje w aplikacjach, które korzystają z bazy danych. W przypadku naszego serwera skupimy się na tworzeniu i odczytywaniu wiadomości, 
ponieważ większość problemów dotyczy właśnie tych dwóch funkcji. Usuwanie i modyfikowanie traktujemy na razie jako "dodatek".

# API
API to specyfikacja; zbiór reguł określający w jaki sposób przebiega komunikacja między składowymi systemu. W tym przypadku systemem jest klient i serwer jako całość. API będzie określać w jaki sposób można sięgnąć po informacje do serwera oraz jakie informacje serwer zwraca.
Dzięki temu, udostępnione API serwera może być wykorzystywane przez aplikacje trzecie i jeden serwer dostarcza informacje do różnych, niepowiązanych ze sobą, aplikacji czy stron.
<br />
API rozwija się jako Application Programming Interface i słowem-klucz jest tu interfejs. Tak jak w programowaniu obiektowym interfejsy są "wizytówkami" klas i służą do odsłaniania publicznych metod z których każdy może korzystać, tak interfejs w API mówi nam, że odsłaniamy jakiś <b>konkretny</b> sposób komunikacji z naszym serwerem. Co ważniejsze, API nie odnosi się stricte do komunikacji sieciowej - określa komunikację programów lub podprogramów w jakimś formacie, w tym wypadku mówimy o Web API.
<br />
Istnieje wiele sposobów, w jakie można odsłonić informacje z serwera, m.in. REST API, Websockets czy GraphQL. My skupimy się na REST API, czyli API który spełnia zasady projektowania REST, czy inaczej mówiąc, jest zgodne ze specyfikacją REST. Nasze API będzie komunikować się właśnie za pośrednictwem żądań HTTP w celu wykonywania standardowych operacji CRUD.

Warto znać:
* Żądania i odpowiedzi HTTP
* Nagłówki HTTP
* jak działa REST API w praktyce


Przydatne linki:
* <a href="https://bykowski.pl/rest-api-efektywna-droga-do-zrozumienia/">Rest API</a>
* <a href="https://www.ibm.com/docs/en/cics-ts/5.2?topic=concepts-http-protocol">HTTP Requests & Responses</a>
 

# Struktura aplikacji
Odpowiednie zaplanowanie struktury jest o tyle ważne, że bez poprawnie ułożonych części programu, na dłuższą metę utrudnimy sobie życie. Kod staje się trudniejszy do wytestowania, architektura staje się mało jasna przez co zmiany mogą zostać dodane w złym miejscu, a kod staje się coraz mniej czytelny. Zobaczmy jak może wyglądać struktura naszej aplikacji.

Klient <-> API <-> Serwer

Technicznie API jest częścią serwera, ale REST API nie posiada stanu; tj. nie powinno przechowywać informacji, tylko operować na tym, co dostaje. Dlatego podprogram API będziemy traktować jako osobną część. Klient wysyła żądania do API, a API wie w jaki sposób obsłużyć każde żądanie poprzed odsłonione metody serwera. Serwer dostaje wtedy do wykonania jakieś zadanie, po czym przekazuje co trzeba do API które wie komu przekazać te informacje.
Poza API, serwer nawet nie jest świadomy że z kimś się komunikuje.

<h2>Serwer</h2>
W strukturze naszego serwera zastosujemy architekturę, która pozwoli na jak największą abstrakcję; tj. komponenty nie będą ze sobą ściśle powiązane (zależności od konkretnych klas) tylko będą luźno powiązanymi komponentami, a komunikacja będzie odbywać się za pomocą interfejsów. Dzięki temu każdy komponent będzie mógł być łatwo podmieniony, a zatem i łatwo wytestowany.

<b>API</b>: Kontroler <br />
<b>Serwer</b>: Serwis <-> Repozytorium <-> Data store

Kontroler jest częścią API - zajmuje się przechwytywaniem zapytań, wyciąga z nich odpowiednie informacje i przekazuje je do serwera, który w żadnym stopniu nie polega na zapytaniach HTTP. Poza kontrolerem, serwer jest nieświadomy tego, że komunikuje się przez sieć. Dlatego również kontroler odpowiada klientowi informacjami jakie dostaje od serwera i wie w jaki sposób odpowiedzieć. Zauważmy, że możemy zmienić API na np. nie wykorzystujące zapytań HTTP tylko inny sposób komunikacji i po stronie samego serwera nie będzie trzeba nic zmieniać.

Rezpozytorium - najniższa warstwa serwera, zajmuje się bezpośrednio danymi, komunikacją z bazą danych. Repozytorium jest świadome tego, gdzie znajdują się dane i operuje na nich wysyłając np. zapytania do bazy danych,

Serwis - Dodatkowy poziom abstrakcji między warstwą komunikacji (Kontrolery) a warstwą danych (Repozytorium). Służy za komunikację między oboma i pozwala dzięki temu na dodatkowe operacje na danych jeszcze przed trafieniem do API. (Repository-Service pattern).

W serwisie zależnie od potrzeb możemy łatwo podmieniać repozytoria, w zależności od tego czy chcemy np. zmienić silnik bazy danych, strukturę tabel. Ta podmiana jest łatwa właśnie dlatego, że polegamy na interfejsach nie konkretnych klasach. Wystarczy, że mamy inne repozytorium które implementuje metody interfejsu i możemy je wstawić do serwisu.

Poza tymi składowymi mamy jeszcze modele - struktury elementów (klasy), na podstawie których repozytorium mapuje z relacji do obiektów.

Zauważmy, że strukturę serwera dzielimy na takie komponenty, żeby każdy z nich pełnił jedną funkcję; kontroler odbiera i przekazuje informacje, serwis tłumaczy zapytania CRUD na konkretne dane, a repozytorium wie w jaki sposób obsługuje się pamięć trwałą (bazę danych).

Przydatne linki:
* <a href="https://en.wikipedia.org/wiki/Object%E2%80%93relational_mapping">ORM</a>
* <a href="https://exceptionnotfound.net/the-repository-service-pattern-with-dependency-injection-and-asp-net-core/">Repository-Service pattern w C#</a>
* <a href="https://stackoverflow.com/questions/5049363/difference-between-repository-and-service-layer">StackOverflow: Difference between Repository and Service layer</a>

# Zadanie

Stwórz podstawowy serwer z REST API (np. platforma .NET umożliwia stworzenie gotowego szablonu, należy tylko wprowadzić własny model i zmiany w istniejących klasach)
- Serwer powinien pozwalać na dodawanie i odczytywanie wszystkich wiadomości (/api/messages/ - zapytanie GET żeby odczytać listę wiadomości, PUT żeby dodać nową wiadomość)
- Wiadomości mają trzy pola: Id (number), author (string), content (string)
- Serwer powinien się składać z kontrolera, serwisu i repozytorium oraz obowiązki powinny być odpowiednio rozdzielone
- Każda z tych części powinna polegać na interfejsach, nie konkretnych klasach.

Klient pojawi się później, jednak należy jakoś sprawdzić czy API działa (Postman lub zapytania przez przeglądarkę).
