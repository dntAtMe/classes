namespace Ex2
{
    /*
     * Klasa będąca klasą nadrzędną dla TVRemote i GarageRemote; zawiera pola i metody
     * wspólne dla wszystkich klas dziedziczących po niej
     */
    class Remote
    {
        public bool IsOn;
        public int NumberOfButtons;

    }

    class GarageRemote: Remote
    {
        public GarageRemote()
        {
            // Pilot garażowy jest zawsze w gotowości
            this.IsOn = true;
            // Dwa przyciski - otwieranie / zamykanie bramy garażowej
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

        // Metoda przełączająca stan obiektów klasy TVRemote
        public void Toggle()
        {
            this.IsOn = !this.IsOn;
        }
    }

    class Ex1
    {
        public static void Main()
        {
            GarageRemote remote1 = new GarageRemote();
            TVRemote remote2 = new TVRemote();
        }
    }
}
