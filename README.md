# Spis treści
1. [Wstęp](#wstęp)
2. [Programowanie obiektowe - podstawy](#programowanie-obiektowe)
3. [Programowanie obiektowe c.d.](#programowanie-obiektowe-2)
4. [Zadania](#zadania)

# Wstęp
Poniższe notatki w dużej części należy traktować jako szybką przypominajkę konkretnego tematu, nie kompletny kurs; jeśli dany temat jest czytelnikowi obcy, notatki mogą nie pomóc za bardzo. Należy również zbadać temat na własną rękę. Notatki opisują w większości wiedzę ogólną, jednak konkretne przykłady i rozwiązania są zaimplementowane w językach C# i TypeScript.
    
Tematyka omawianych tematów jest zróżnicowana; zaczynamy od najważniejszych podstaw jak programowanie obiektowe, jednak przejdziemy przez liczne zagadnienia pod kątem pracy jako programista. W dużej części rozdziały są od siebie niezależne, więc nie jest wymagane wszystkiego od deski do deski; jedynie tematy które czytelnik wybierze jako potrzebne.


# Programowanie obiektowe
<h2> Wstęp </h2>
Programowanie obiektowe zyskało ogromną popularność dzięki temu, jak bardzo jest intuicyjne w użytku. Ta intuicyjność polega na tym, że główne pojęcia (klasy i obiekty) mają jednoznaczne odzwierciedlenie w przedmiotach i pojęciach z życia codziennego. Dzięki temu pojęcia programowania obiektowego można szybko zrozumieć i zacząć wykorzystywać, a stworzony kod jest bardzo czytelny. Dobry program napisany obiektowo ma jasno określoną strukturę i dosyć szybko staje się jasne w jaki sposób kod się ze sobą łączy oraz jak go rozszerzyć o nowe funkcje.

<br />

Pomimo tego, że ciągle pracujemy z kodem obiektowym, programiści zaskakująco często mają problemy (np. na rozmowach o pracę) ze zdefiniowaniem podstawowych pojęć programowania obiektowego, więc od tego zaczniemy.

Przydatne linki:
    <a href="https://algodaily.com/lessons/object-oriented-programming-class-principles">OOP Principles</a> 

<h2>Obiekty i klasy</h2>

Klasy to "przepisy". Określają, z czego obiekt powinien się składać oraz jak powinien się zachowywać. Nie przedstawiają konkretnego przedmiotu, a raczej ogólny koncept tego, czym jest jakaś rodzina przedmiotów. Trzymając się powiązania z światem dookoła nas, klasą może być pilot do telewizora - nie mając konkretnego pilota przy sobie jesteśmy w stanie stwierdzić jak taki pilot działa; tzn. jak się zachowuje po wciśnięciu jakiegoś przycisku, że jest na baterie, że może mieć stan(włączony/wyłączony). Jednocześnie ten pilot nie ma fizycznej reprezentacji - to jedynie ogólny koncept tego, jak wyobrażamy sobie dowolny pilot.
    
Z kolei obiekty stanowią fizyczną reprezentacją klasy. Wiemy, że klasa określa jak piloty się zachowują i jaki mogą mieć stan; po wzięciu konkretnego pilota, ma on swój stan - jest włączony lub wyłączony i jest to jego własna informacja; zachowuje się tak, jak opisuje to klasa pilotu więc jest instancją tej klasy (obiektem) Możemy mieć wiele obiektów jednej klasy, czyli działających na tych samych zasadach, pochodzących Z jednej receptury. Każdy z tych obiektów ma również własny stan (przynajmniej do czasu pojawienia się pól statycznych).

Przykład: z komentarzami `Exercises/Ex1.cs`
```C#
class TVRemote
{
    public bool IsOn;

    public void Toggle()
    {
        this.IsOn = !this.IsOn;
    }
}
```
```C#
public static void Main()
{
    TVRemote remote = new TVRemote();
    remote.Toggle();

    Console.WriteLine(remote.IsOn);
}
```

<h2>Konstruktory</h2>
Konstruktor to metoda, która zostaje wywołana automatycznie przy tworzeniu nowego obiektu. W konstruktorze możemy zamieścić kod, który chcemy żeby się odpalał dla każdego obiektu w momencie utworzenia.

<br />

Klasa może, ale nie musi, definiować własny konstruktor (lub kilka). Jeśli tego nie zrobimy, przy tworzeniu nowego obiektu zostanie odpalony konsturktor domyślne; odpowiada on za zainicjowanie zmiennych i inne czynności, które dzieją się "pod maską" bez wiedzy programisty.

Przykład:
```C#
class TVRemote
{
    public bool IsOn;

    // Konstruktor, zawsze uruchamiany przy tworzeniu nowego obiektu
    public TVRemote() 
    {
        // this - odwołanie do "tego" obiektu, w ten sposób upewniamy się że 
        // pole do którego się odnosimy należy do obiektu (jest zadeklarowane w klasie)
        this.IsOn = false;
    }

    // Konstruktor z jednym parametrem; warto zauważyć że bez słowa "this" poprzedzającego nazwę pola,
    // priorytetowo znajduje najbliższą zmienną, czyli parametr metody. 
    public TVRemote(bool IsOn)
    {
        this.IsOn = IsOn;
    }

    public void Toggle()
    {
        this.IsOn = !this.IsOn;
    }
}
```

```C#
    TVRemote remote1 = new TVRemote();
    TVRemote remote2 = new TVRemote(true);
```

<h2>Dziedziczenie</h2>

Jeden z głównych konceptów programowania obiektowego. Klasy mogą dziedziczyć po innych. Klasa po której dziedziczymy staje się klasą nadrzędną, klasa dziedzicząca - podrzędną. Kiedy mówimy, że klasa dziedziczy po innej, to znaczy że klasa podrzędna zyskuje cechy klasy nadrzędnej; jej pola i metody (dla bardziej dokładnego opisu warto się przyjrzeć modyfikatorom dostępu, które nie są tu omówione; nie wszystkie pola i metody mogą być dostępne dla klasy podrzędnej).
    
Dzięki dziedziczenu możemy raz zdefiniować ogólny model klasy i, kiedy jest taka potrzeba, dodawać tylko informacja szczególne dla konkretnej klasy podrzędnej; Przykładowo, piloty do TV i do garażu mają wspólne cechy (baterie, mają przyciski) - byłyby one opisane w klasie nadrzędnej <b>wszystkich</b> pilotów, oraz mają cechy indywidualne (pilot od TV może być włączony lub wyłączony, ma przyciski od głośności, pilot od garażu jest zawsze włączony) - byłyby one opisane w klasach podrzędnych konkretnej rodziny pilotów. 
    
Ogólnie klasa, która dziedziczy po innej, przejmuje wszystkie jej metody publiczne i chronione. Ma do nich dostęp i może je wykorzystywać - tak samo z polami.
    
Jest to o tyle ważne, że w razie gdybyśmy chcieli zmienić zachowanie pilotów, np. zaimplementować metodę <b>ChangeBattery</b>, wystarczy zrobić to w klasie nadrzędnej, która jest jedna - nie w każdej z klas podrzędnych, których może być wiele (Piloty do telewizora, do garażu, do radia, itd.) Dużą częścią programowania obiektowego jest wyłapywanie cech wspólnych oraz przenoszenie ich do klas nadrzędnych.

Pełny przykład wraz z komentarzami: `Exercises/Ex2.cs`
```C#
class Remote
{
    public bool IsOn;
    public int NumberOfButtons;

}

class GarageRemote: Remote
{
    public GarageRemote()
    {
        this.IsOn = true;
        this.NumberOfButtons = 2;
    }
}

class TVRemote: Remote
{
    public TVRemote()
    {
        this.IsOn = false;
        this.NumberOfButtons = 50;
    }

    public void Toggle()
    {
        this.IsOn = !this.IsOn;
    }
}
```
<h2>Hermetyzacja</h2>
Hermetyzacja (inaczej enkapsulacja) to ładne określenie na to, że obiekty powinny być "chronione" przed dostępem z zewnątrz. Wszystkie pola i metody które odnoszą się do klasy/obiektu powinny być częścią tej klasy. Dodatkowo rozróżniamy pola/metody prywatne, chronione i publiczne; nikt spoza klasy nie powinien mieć do metod, które uznajemy za prywatne. 

<br>
Dobrą zasadą na początek jest zaczynanie z najbardziem prywatnym modyfikatorem dostępu. Warto robić wszystko z miejsca prywatne. Dopiero kiedy uznamy, że jest to potrzebne w hierarchii dziedziczenia przez klasą podrzędną to możemy rozważyć zakres protected i dopiero na samym końcu myślimy o dostępie publicznym. Jest to dobra praktyka, bo podejmujemy świadomą decyzję o tym, kiedy dana metoda czy pole powinno być publiczne.

<br>

W zakresie obowiązków programisty jest zarządzanie dostępem do pól i metod; W zakresie klas (też w zależności od języka) możemy mieć kilka poziomów dostępów; najczęściej mamy do czynienia z <b>private, protected, public</b>. Temat można zbadać w wielu miejscach, przykładowe źródła: 

* <a href="https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/access-modifiers">Poziomy dostępu w C#</a> 
* <a href="https://www.typescriptlang.org/docs/handbook/classes.html#public-private-and-protected-modifiers">Poziomy dostępu w TypeScript #1</a> 
* <a href="https://www.tutorialsteacher.com/typescript/data-modifiers">Poziomy dostępu w TypeScript #2</a>

<h2>Właściwości (Properties)</h2>
Niektóre języki (w tym C#) mają własne skróty do zarządzania dostępem pól i metod; Są one dobrze opisane pod linkiem: <a href="https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/using-properties">C# Properties</a>

Warto jednak wiedzieć że jest to jedna z opcji jak można zarządzać dostępem do zmiennej; nie dodaje to nowej funkcjonalności do języka, jest to jedynie tzw. syntax sugar, czyli inna forma zapisu czegoś, co już da się zrobić. W późniejszych notatkach spotkamy się z tą formą zapisu niejednokrotnie, także warto przeczytać jak to mniej więcej działa.

<h2>Polimorfizm</h2>
Pojęcie ściśle powiązane z dziedziczeniem (i później z interfejsami). Polimorfizm jest jednym z trudniejszych zagadnień do zrozumienia; Każdy obiekt jakiejś klasy może być również traktowany jako obiekt klasy nadrzędnej. To znaczy, że w hierarchii Pilot -> Pilot do TV  każdy pilot do TV możemy traktować jak każdy pilot. W hierarchii Rectangle -> Square każdy kwadrat możemy traktować jako prostokąt. 

<br />

Traktowanie w tym kontekście oznacza to, że obiekt może być rzutowany na inny typ w swojej hierarchii dziedziczenia. Wtedy programista ma widocznośc tylko pól i metod klasy na którą obiekt był rzutowany. 
<br />

Wyobrażając sobie drzewko hierarchii, polimorfizm oznacza że nasz obiekt może reprezentować klasę z której go utworzyliśmy oraz wszystkie klasy <b>WYŻEJ</b>, czyli klasy nadrzędne. 

TODO: Przykład

<h2> Pamięć - stos i sterta</h2>
 Warto chociażby kojarzyć z czego składa się pamięć aplikacji i w jaki sposób operuje; chociaż w większości języków pamięcią zarządza za nas platforma (maszyna wirtualna), to w zależności od tego, gdzie ląduje wartość zmiennej, zmienia się sposób w jaki traktujemy tę zmienną w kodzie. Również przydatna wiedza w razie rozmowy o pracę. Przydatne linki:

* <a href="https://www.p-programowanie.pl/c-sharp/typy-wartosciowe-referencyjne">Typy wartościowe vs. referencyjne</a> <br>
* <a href="https://pl.wikipedia.org/wiki/Stos_(informatyka)}">Stos jako struktura danych</a>

# Programowanie obiektowe 2

<h2>Klasy statyczne</h2>

Klasa statyczna przypomina zwykłe klasy z jednym ważnym wyjątkiem: nie może być instancjonowana, tj. nie można z niej utworzyć obiektu. W pewnym sensie klasa statyczna jest jednocześnie obiektem.

Klasa statyczna może zawierać różne metody które są wykorzystywane na przestrzeni całego projektu; w takim kontekście klasa statyczna stanowi “zbiór” zgrupowanych metod.  

<b>Klasa statyczna może posiadać jedynie statyczne metody i pola.</b>

Przykład:  
```C#
    public static class StaticExample
    {
        public static void DoSomething() {}
    }
```

```C#
public static void Main()
{
    // Error - nie można tworzyć obiektów z klas statycznych
    StaticExample example = new StaticExample();

    // Poprawne - odnosimy się do elementów statycznych 
    StaticExample.DoSomething();

}
```

Warto się zapoznać z tym, w jaki sposób traktuje się klasy statyczne w języku z jakim pracujemy; czasami język zachęca do korzystania z nich, czasem zdecydowanie odradza. Jest to o tyle ważne, że każdy język ma czasem swoje “preferencje” i udostępnia różne narzędzia pomocnicze. W C# klasy statyczne są używane często i gęsto. 

<h2>Metody statyczne</h2>
Klasa może zawierać metody statyczne nie będąc klasą statyczną; wtedy tworząc instancje klasy mamy dostęp do wszystkiego oprócz metod statycznych. Do tych możemy dostać się przez odwołania do klasy. 

Więcej informacji o static: 
    <a href="https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/static">Static keyword</a>

Więcej przykładów o statycznych klasach i metodach: <a href="https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/static-classes-and-static-class-members">Static classes and class members</a>


<h2>Singleton</h2>
Singleton to wzorzec projektowy, czyli wzór na konkretny sposób rozwiązania pewnego problemu. Singleton pozwala nam ograniczać ilość obiektów danej klasy jakie mogą istnieć do jednego lub więcej.

Wykorzystuje do tego statyczną metodę i ogranicza dostęp do tworzenia obiektu; w ten sposób jedna metoda kontroluje cały obieg nowych obiektów.

Często wykorzystuje się singleton z jedną instancją do menadżerów lub innych klas, które mają zarządzać jakimiś elementami (wtedy programista wie na pewno, że powinien istnieć tylko jeden obiekt) 

Przykład: GameManager, który zarządza listą obiektów (GameObject) - musi być jeden GameManager, żeby zawsze była pewność że widzi wszystkie obiekty w grze które powstają przez GameManager i nikt przypadkiem nie zrobi drugiego. 


Przykład Singletona ograniczającego do max. jednej instancji klasy. Całkowity przykład wraz z komentarzami można znaleźć w repozytorium `Examples/SingletonExample.cs`
```C#
public class SingletonExample 
{
    private static SingletonExample? _instance;

    private SingletonExample() {}

    public static SingletonExample GetInstance()
    {
        if (_instance == null)
        {
            _instance = new SingletonExample();
        }

        return _instance;
    }
}
```
```C#
    SingletonExample singleton = SingletonExample.GetInstance();
```

<h2>Klasy abstrakcyjne</h2>
Klasy abstrakcyjne pozwalają na jedynie “częściowy” opis tego, co obiekty mają posiadać. Z klasy abstrakcyjnej nie da się zrobić obiektu; trzeba ją najpierw uzupełnić o informacje w klasach które z niej dziedziczą.

Abstrakcyjna klasa oznacza, że konkretne metody lub pola wymagają zdefiniowania lub nadpisania. Metody klas mogą być publiczne lub chronione.

Przykład z Amount i Currency; Currency powinno być klasą abstrakcyjną w tym wypadku, ponieważ potrzebujemy tworzyć obiekty konkretnej waluty; wtedy pole które reprezentuje Currency, np. String currencyName może być abstrakcyjne 

<b>Kiedy klasa posiada chociaż jedną metodą abstrakcyjną, musi być klasą abstrakcyjną</b> 

Klasa może za to zawiera metodę wirtualną (`virtual`) bez konieczności bycia klasą abstrakcyjną – jest to powiedzenie, że <b>opcjonalnie</b> można nadpisać metodę, ale nie trzeba – `abstract` mówi, że metoda nie ma żadnej implementacji i wymaga nadpisania. 

Przykład zastosowania klasy abstrakcyjnej: `Exercises/Ex3.cs`

```C#
abstract class Currency
{
    protected float _value;
    public abstract string Type {get; }
    
    public float Value {
        get 
        {
            return this._value;
        } 
    }

    // Show what type of currency this is
    // Also show what it's value is in EUR
    public override string ToString()
    {
        return String.Format("{0} ({1} EUR)", this.Type, this.Value);
    }
}

class Dollar: Currency
{
    public override string Type 
    {
        get
        {
            return "EUR";
        }
    }

    public Dollar()
    {
        this._value = 0.93f;
    }
}
```

Inny przykład:
```C#
public class VirtualMethodClass
{
    public virtual void DoSomething()
    {
        Console.WriteLine("VirtualMethodClass");
    }
}

public class OverridingClass: VirtualMethodClass
{
    public override void DoSomething()
    {
        // base - odwołanie się do klasy nadrzędnej.
        // jak ominiemy tę linijkę, to definicja tej metody 
        // w klasie nadrzędnej zostanie zignorowana 
        base.DoSomething();
        Console.WriteLine("OverridingClass");
    } 
}

public class OtherClass: VirtualMethodClass {}
```

```C#
var test1 = VirtualMethodClass();
// Pokazuje "VirtualMethodClass"
Console.WriteLine(test1.DoSomething());

var test2 = OverridingClass();
// Pokazuje:
// VirtualMethodClass [przez odwołanie do base.DoSomething()]
// OverridingClass
Console.WriteLine(test1.DoSomething());

var test3 = OtherClass();
// Pokazuje "VirtualMethodClass"
Console.WriteLine(test3.DoSomething());
```

<h2>Klasy zapieczętowane</h2>

`sealed` może być użyte zarówno do klas jak i metod; o czym więcej poniżej.

Zapieczętowane klasy czy metody stanowią przeciwieństwo abstrakcyjnych: Kiedy `abstract` wymusza dziedziczenie i potrzebę dodania implementacji, to `sealed` blokuje dziedziczenie w przypadku klas i uniemożliwia nadpisanie (`override`) w przypadku metod.

`sealed` wykorzystujemy kiedy chcemy dać znać, że dana implementacja klasy / metody jest finalna i nikt nie powinien jej zmieniać. 

Przykład wraz z komentarzami: `Exercises/Ex4.cs`
```C#
    abstract class Currency {...}

    sealed class Euro: Currency {...}

    // class BetterEuro: Euro - błąd, nie można dziedziczyć po zapieczętowanej klasie
```

```C#
    class SealedMethodsClass
    {
        public sealed void DoSomething()
        {
            Console.WriteLine("SealedMethodsClass");
        }
    }

    class OtherClass: SealedMethodsClass
    {
        // Błąd - nie można nadpisać zapieczętowanej metody
        public override void DoSomething()
        {
            ...
        }
    }
```

Oznaczenie metody jako sealed oznacza, ze jest to ostateczne przysłonięcie (nadpisanie) metody.

Więcej informacji:
<a href="https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/sealed">Sealed keyword</a>

<h2> Interfejsy </h2>
Interfejs to “wizytówka” klasy; przedstawia programiście jakie metody posiada każda klasa implementująca interfejs. 

<br />
Interfejsy nie posiadaja stanu; klasy określają stan czyli pola, interfejsy nie. 

Słownictwo: po klasach się dziedziczy, interfejsy się implementuje 

Każda klasa implementująca interfejs musi przysłaniać metody interfejsu; należy je zaimplementować. 

```C#
interface ITestInterface
{
    public void DoSomething();
}
```

O interfejsach mówimy że są wizytówkami, bo niezależnie od klasy wiadomo, że jeśli interfejs jest implementowany to te metody o których wspomina na pewno znajdziemy. Co więcej, 
zwykle możemy dziedziczyć po jednej klasie, ale interfejsów można implementować wiele (zależnie od języka).

```C#
// Przykład implementacji;
// Kompilator zwróci błąd, ponieważ implementujemy interfejs
// ale nie definiujemy jego metody.
class SomeClass: ITestInterface {}

class CorrectClass: ITestInterface
{
    public void DoSomething() {...}
}
```

Interfejsy się wykorzystuje np. kiedy mamy system który korzysta z różnych komponentów. Komponenty te mogą zapewniać ten sam efekt końcowy, jednak na inny sposób (dążą do jednego celu na zupełnie inny sposób, więc jest to słabe zastosowanie dziedziczenia). Wtedy komponenty te powinny mieć wspólny interfejs; Z perspektywy systemu możemy wtedy zmieniać komponenty bez potrzeby modyfikacji kodu.


Przykłady interfejsów:
```C#
    
``` 

IDimensions, IMessageSender, IMessageReceiver (messagesender i receiver mają po metodzie send(string) receive(): string) i mogą być implementowane przez TwitterMessageSender, WhatsAppMessageSender etc. 

Tak samo jak z klasami nadrzędnymi, klasy można rzutować na interfejsy i w drugą stronę.

```C#
ITestInterface correctObject = new CorrectClass();
```

```C#
var listOfInterfaces = new List<ITestInterface>();
listOfInterfaces.Add(new CorrectClass());
```

Dobrze napisany system powinien polegać na interfejsach zamiast konkretnie napisanych klasach. Przykład takiego systemu:

```C#
/*
* Interfejs określający wszystkie obiekty w grze:
* Metoda update - aktualizacja informacji o obiekcie
* Metoda render - pokazanie obiektu na ekranie
*/
interface IGameObject
{
    public void Update();
    public void Render();
}

/*
* Interfejs dla komponentów którymi steruje użytkownik
* Parametrem jest 'key', czyli wciśnięty przycisk
*/
interface IWithInput
{
    public void OnInput(char key);
}

/*
* Klasa reprezentująca obiekt gracza
* Dla uproszczenia pomijamy hierarchię dziedziczenia 
* która jak najbardziej mogłaby się tu znaleźć.
*/
class Player: IGameObject, IWithInput
{
    public void Update()
    {
        Console.WriteLine("Updating player...");
    }

    public void OnInput(char key)
    {
        Console.WriteLine("Handling input for player...");
    }

    public void Render()
    {
        Console.WriteLine("Showing player on screen...");
    }
}

/*
* Klasa reprezentująca obiekt przeciwnika
*/
class Enemy: IGameObject
{
    public void Update()
    {
        Console.WriteLine("Updating enemy...");
    }

    public void Render()
    {
        Console.WriteLine("Showing enemy on screen...");
    }
}
```

```C#
var gameObjects = new List<IGameObject>();
var inputObjects = new List<IWithInput>();

...

var enemy = new Enemy();
var player = new Player();

gameObjects.Add(enemy);
gameObjects.Add(player);

inputObjects.Add(player);

...

foreach (var gameObject in gameObjects)
{
    // Zaktualizuj informacje
    gameObject.Update();
    // Pokaż na ekranie zaktualizowany obiekt
    gameObject.Render();
}

```

W kontekście powyższej pętli nie ma znaczenia jakim obiektem coś jest konkretnie; chociaż każdy z nich "pod maską" inaczej się zachowuje, to z perspektywy reszty systemu to są po prostu obiekty które wymagają aktualizacji i powinny się pokazać na ekranie.
<br />
W faktycznym projekcie dochodzi do tego jeszcze dziedziczenie i inne interfejsy, ale powyższy koncept przedstawia w jaki sposób traktujemy interfejsy.

<h2>Interfejsy a klasy abstrakcyjne</h2>

Kiedy nie wiadomo czy skorzystać z klas czy interfejsów, warto myśleć o drzewku hierarchii. Jeśli dwa przedmioty są się złożyć w hierarchii, to bierzemy pod uwagę dziedziczenie: w przeciwnym wypadku interfejsy. Wynika to z tego, że dziedziczenie pozwala nam na zachowywanie stanu i funkcjonalności rodzica, więc przez to mamy mniej duplikacji kodu. Wystarczy coś zrobić raz i każda klasa z tego korzysta. Jednak jeśli dwa przedmioty za bardzo się różnią, interfejsy pozwala upewnić się że przedmioty doprowadza do tego samego na swój własny sposób, a system interesuje tylko efekt końcowy. 

<br />
To czy wybrać klasę czy interfejs często nie jest jednoznaczne i zależy od preferencji danego projektu/programisty.

Rozważmy następujący przykład:

Tworzymy symulację elementów HTML i potrzebujemy zaimplementować elementy które użytkownik może kliknąć i które mogą się pokazywać na ekranie. Porównajmy dwa podejścia do tego problemu:

1. Preferencja dziedziczenia

```C#

// Klasa dla wszystkich elementów
abstract class Element { }

// Klasa dla elementów które można kliknąć
abstract class ClickableElement: Element { }

// Klasa dla elementów które mogą się pokazać na ekranie/
abstract class RenderablElement: Element { }
```

Pomijamy na razie treść klas, aby skupić się na architekturze problemu. Zauważmy, że w powyższym przykładzie skonstruowaliśmy taką hierarchię klas, że element może być albo "klikalny" albo "renderable", czyli możliwy do pokazania na ekranie. 

Szybko można się zorientować że jest to błędna struktura; potrzebujemy elementy, które zarówno są na ekranie, jak i mogą być pokazane. ( Zakładamy możliwość dziedziczenia tylko po jednej klasie ). W tym celu musimy założyć że wszystkie elementy mogą być pokazywane na ekranie i przenosimy `RenderableElement` wyżej do klasy nadrzędnej.

```C#

// Może również nazywać się Element - zastąpił klasę wyżej w hierarchii
abstract class RenderableElement { }

abstract class ClickableElement: RenderableElement { }
```

Powyższa struktura ma nawet sens, bo jeśli element można kliknąć to <b>musi</b> być widoczny na ekranie, inaczej użytkownik nie ma możliwości interakcji z tym elementem.

Załóżmy jednak, że chcemy dodać <b>stylizowane</b> elementy i nie chcemy, aby style dało się podpiąć do wszystkich elementów. Wtedy powstaje podobny problem; mamy rozjazd z `RenderableElement` na `ClickableElement` i `StylizedElement` i musimy znowu naruszać całą architekturę żeby umożliwić istnienie klikalnych elementów, które można stylizować.

Możemy już zauważyć pewien wzór; dokładamy funkcje które nie są ze sobą mocno powiązane, przez co dokładanie ich po czasie powoduje, że hierarchia klas (które są ściśle powiązane) wymaga przebudowania. 

Zobaczmy jak by wyglądał ten sam problem kiedy skupilibyśmy główne elementy struktury w interfejsach:

```C#
// Element który można pokazać na ekranie
interface RenderableElement 
{
    public void Render();
}

// Element który można kliknąć; do tego musi być pokazany na ekranie
interface ClickableElement: RenderableElement
{
    public void OnClick();
}

// Element który można stylizować; do tego musi być pokazany na ekranie
interface StylizedElement: RenderableElement
{
    public void AddStyle(...);
}

// Dowolny element Div bez możliwości kliknięcia (nie nasłuchuje na akcje użytkownika)
class DivElement: StylizedElement { }

// element Div który można kliknąć
class ClickableDivElement: DivElement, ClickablElement { }
```

Jak widać powyżej, mamy spełnione początkowe wymagania. W dodatku, całośc przypomina składanie elementów z części, dzięki czemu dodawanie nowej funkcjonalności (animowany element etc.) spowoduje, że nie musimy naruszać istniejącej struktury w żaden sposób; dodajemy nowy interfejs i dorzucamy go gdzie jest taka potrzeba.

Oczywiście w dodatku do tego możemy dołączyć hierarchię klas; pamiętajmy, że interfejsy jedynie deklarują co można zrobić, ale implementację tego, jak coś się wykonuje (np. `Render`, `OnClick`) pozostawia klasie. Jeśli więc mamy kilka elementów które mają wspólny stan czy tak samo wykonują pewne metody, można je razem złożyć do wspólnej klasy nadrzędnej.

<h2>Typy generyczne</h2>
Typy generyczne zawierają “szablony”, czyli deklarują że będą korzystać z jakiejś klasy, jednak jaka dokładnie to będzie klasa pozostaje do zdefiniowana programiście w późniejszym czasie.  

Podczas tworzenia obiektu takiej klasy generycznej należy zdefiniować jaką klasę wstawić w szablon.

Jest możliwość ograniczenia zakresu wartości szablonowej:
`where T: ClassOrInterface` opisuje że wartość szablonowa T <b>musi</b> dziedziczyć/implementować `ClassOrInterface` 

Przykład: `Exercises/Ex6.cs`
```C#
/*
 * T - nazwa klasy, staje się typem w szablonie (czyli w klasie do której się odnosi)
 */
class GenericClass<T>
{
    // T? - znak zapytania oznacza że spodziewamy się wartości null - dlatego, że nieprzypisujemy nigdzie wartości
    T? value;
}

/*
 * Przykładowa klasa
 */
class MyClass {}

/*
 * T - nazwa klasy dziedziczącej po klasie MyClass
 */
class BetterGenericClass<T> where T: MyClass
{
    T? value;
}
```

```C#
// Obie formy są poprawne
GenericClass<int> intObject1 = new GenericClass<int>();
var intObject2 = new GenericClass<int>();

var betterObject = new BetterGenericClass<MyClass>();
// Błąd - typ int nie jest w hierarchii klasy MyClass ( nie jest tą klasą ani po niej nie dziedziczy )
var wrongBetterObject = new BetterGenericClass<int>();

```

Z typow generycznych korzysta się często kiedy mamy różne typy które trzeba obsłużyć, mimo że logika pozostaje taka sama (w systemie klas i dziedziczenia mielibyśmy dużo duplikacji kodu, ponieważ trzebaby powtarzać te same operacje dla każdej klasy mimo tego, że różnią się po prostu typem; np. [int + int] vs. [float + float]). 

Z szablonów korzystamy najczęściej, kiedy potrzebujemy przechowywać pola o konkretnej klasie pomimo zachowania tej samej logiki. Bardzo często wiele struktur danych korzysta z takich szablonów, aby upewnić się <b>w czasie kompilacji</b>, że przetrzymuje konkretną rodzinę obiektów.

# Zadania
Zadania są zróżnicowane, od zadań bezpośrednio powiązanych z tematyką konkretnego tematu do zadań ćwiczących ogólną wiedzę programistyczną.

## Zadanie 1

Zaimplementuj strukturę danych - stos. Powinno być możliwe:
* dodawanie elementów do stosu
* wyciąganie elementów ze stosu
* sprawdzanie jaki element jest ostatni w stosie
* czyszczenie stosu. 

Do przechowywania elementów wewnątrz stosu możesz wybrać dowolną strukturę; tablicę lub listę. Pamiętaj, aby trzymać się zasad programowania obiektowego; stwórz odpowiednią klasę, pola, metody oraz przemyśl poziomy dostępu do każdego z nich (private, protected, public).

## Zadanie 2
Napisz aplikację konsolową, w której użytkownik może podać ciąg tekstu i odwróć ten tekst przy pomocy zaimplementowej struktury (stosu z zadania powyżej).

Wskazówka: Pamiętaj, że stos jest strukturą <b>FILO</b>; element włożony jako pierwszy można wyciągnąć dopiero na samym końcu

## Zadanie 3
<a href="https://en.wikipedia.org/wiki/Binary_tree"> Binary Trees</a>

W skrócie: Drzewa binarne składają się z węzłów. Każdy węzeł posiada konkretną ilość informacji: wartość jaką przechowuje, lewe i prawe dziecko. Lewe dziecko jest zawsze mniejsze od rodzica, prawe jest zawsze większe. 

Drzewa to struktury które są wykorzystywane w praktycznie każdej dziedzinie programowania, czy to "pod maską" w bibliotekach czy bezpośrednio przez programistę.

Poniżej rozważamy wariant drzewa, w którym NIE występują powtórzenia; tj. konkretna wartość występuje tylko raz. Poniższe ćwiczenia wykorzystują głównie podstawowe zagadnienia klas / obiektów oraz rekursji. W razie potrzeby, można znaleść całą masę rozwiązań, poradników czy innych pomocy. Można również sprawdzić rozwiązanie załączone w repozytorium.

* Stwórz klasę węzła drzewa binarnego przechowującą liczbę całkowitą
* Zaimplementuj metodę `Add(int value)` która doda nowy węzeł do drzewa w odpowiednim miejscu
* Zaimplementuj metodę `Traverse(Node node)` która pokaże w konsoli wszystkie elementy drzewa (obojętnie w jakiej kolejności, warto zapoznać się z pojęciami `PreOrder, InOrder, PostOrder`)
* Zaimplementuj metodę `Remove(int value)` która usuwa element o danej wartości z drzewa
* Zaimplementu metodę `Find(int value)` która zwraca referencję do obiektu węzła przechowującego wskazaną wartość
* Zaimplementuj metodę `MinValue()` która zwraca najmniejszą wartośc w drzewie (Pamiętaj, że lewe dziecko jest zawsze mniejsze od rodzica)
* Zaimplementuj metodę `MaxValue()` która zwraca najmniejszą wartośc w drzewie (Pamiętaj, że prawe dziecko jest zawsze większe od rodzica)
* Zamist konkretnego typu int, zastosuj typ generyczny dla klasy oraz metod: Zwróć uwagę, że elementy są porównywane więc typ generyczny musi również mieć możliwość porównywania (W przypadku C#: musi implementować interfejs IComparable, więc typ `T: IComparable<T>`)