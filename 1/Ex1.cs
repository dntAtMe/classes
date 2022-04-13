namespace Ex1
{
    // Utworzenie nowej klasy
    class TVRemote
    {
        // Pole klasy, określa jaki stan mogą mieć obiekty
        public bool IsOn;

        // Metoda klasy
        public void Toggle()
        {
            this.IsOn = !this.IsOn;
        }
    }

    class Ex1
    {
        public static void Main()
        {
            // Utworzenie nowego obiektu
            TVRemote remote = new TVRemote();
            // Wywołanie metody klasy
            remote.Toggle();

            Console.WriteLine(remote.IsOn);
        }
    }
}
