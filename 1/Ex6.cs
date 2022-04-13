namespace Ex6
{
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
    class MyClass
    {

    }

    /*
     * T - nazwa klasy dziedziczącej po klasie MyClass
     */
    class BetterGenericClass<T> where T: MyClass
    {
        T? value;
    }

    class Ex6
    {
        public static void Main()
        {
            // Obie formy są poprawne
            GenericClass<int> intObject1 = new GenericClass<int>();
            var intObject2 = new GenericClass<int>();

            var betterObject = new BetterGenericClass<MyClass>();
            // Błąd - typ int nie jest w hierarchii klasy MyClass ( nie jest tą klasą ani po niej nie dziedziczy )
            // var wrongBetterObject = new BetterGenericClass<int>();
        }
    }
}
