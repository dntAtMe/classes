namespace Ex3
{
    // Klasa abstrakcyjna
    abstract class Currency
    {
        /*
         * Modyfikator dostępu protected - pole widoczne dla tej klasy i klas dziedziczących
         */
        protected float _value;
        /*
         * Abstrakcyjna właściwość; czyli tak naprawdę abstrakcyjna metoda. 
         * Wymaga nadpisania w klasach dziedziczących
         */
        public abstract string Type {get; }
        
        /*
         * Zwraca _value i jest publiczną metodą; dzięki temu nikt spoza klas w hierarchii nie może
         * zmodyfikować pola _value
         */
        public float Value {
            get 
            {
                return this._value;
            } 
        }

        /*
         * Każda klasa w C# ma wbudowaną metodę ToString - override oznacza, że nadpisujemy taką metodę
         * i na nowo opisujemy co robi
         */
        public override string ToString()
        {
            return String.Format("{0} ({1} EUR)", this.Type, this.Value);
        }
    }

    class Euro: Currency
    {
        public override string Type 
        {
            get
            {
                return "EUR";
            }
        }

        public Euro()
        {
            this._value = 1.0f;
        }

        public override string ToString()
        {
            return String.Format("EUR");
        }
    }

    class Dollar: Currency
    {
        public override string Type
        {
            get
            {
                return "USD";
            }
        }

        public Dollar()
        {
            this._value = 1.0f;
        }
    }

    class Ex3
    {
        public static void Main()
        {
            var dollar = new Dollar();
            var euro = new Euro();

            // Błąd - nie można tworzyć instancji klasy abstrakcyjnej
            // var currency = new Currency();
            //
            // Poprawne - każdą klasę można rzutować w hierarchii, nawet na klasę abstrakcyjną
            // Mamy wtedy dostęp tylko do pól i metod określonych w tej klasie
            Currency dollar2 = new Dollar();

            Console.WriteLine(dollar);
            Console.WriteLine(euro);
        }
    }

}
