using System.IO;

class SingletonExample
{
    
    /*
     * SingletonExample? - spodziewamy się, że obiekt jest typu SingletonExample LUB null
     * Nullable types: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/nullable-value-types
     */
    private static SingletonExample? _instance;

    /*
     * Tworzymy prywatny konstruktor, aby ograniczyć dostęp do tworzenia obiektów; Dzięki temu konstruktor może zostać
     * wywołany jedynie w tej klasie, a więc tylko w ramach tej klasy można utworzyć nowy obiekt. Nikt inny nie ma do tego
     * dostępu.
     */
    private SingletonExample() {}

    /*
     * Metoda statyczna, która zawsze zwraca zainicjowany obiekt _instance.
     * Warto zauważyć, że _instance jest tworzony tylko raz, więc od momentu pierwszego
     * wywołania metody pracujemy z jednym obiektem.
     */
    public static SingletonExample GetInstance()
    {
        if (_instance == null)
        {
            _instance = new SingletonExample();
        }
        return _instance;
    }
}

class StartingPoint {

    public static void Main()
    {
        // Poprawne wywołanie singletona kiedy potrzebujemy jego obiektu
        // var - Zmienna domniemana (http://kurs.aspnetmvc.pl/Csharp/Zmienne_domniemane_var)
        var singleton1 = SingletonExample.GetInstance();
        var singleton2 = SingletonExample.GetInstance();

        // Niepoprawne wywołanie; konstruktor jest prywatny więc nie jest możliwe "ręczne" utworzenie obiektu z tego miejsca
        // var singleton = new SingletonExample();

        // Oba obiekty są sobie równe, bo są tym samym obiektem
        Console.WriteLine(singleton1.Equals(singleton2));
    }
}

