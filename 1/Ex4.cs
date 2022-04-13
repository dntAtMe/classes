namespace Ex4
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
         *
         * W dodatku jest zapieczętowana, więc żadna klasa dziedzicząca nie może zmienić tego, co zwraca.
         */
        sealed public float Value {
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

    /*
     * Euro jest klasą zapieczętowaną; warto zauważyć że ma to odpowiednik w przypadku faktycznej waluty. 
     * Euro nie dzieli się na różne rodzaje, jest konkretną walutą i programista nie powinien tworzyć z niej kolejnych klas.
     */
    sealed class Euro: Currency
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

    /* Błąd - nie można dziedziczyć po zapieczętowanej klasie
        class BetterEuro: Euro {}
    */

    class Ex4
    {
        public static void Main()
        {

        }
    }

}
