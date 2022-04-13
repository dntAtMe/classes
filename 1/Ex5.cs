interface Test1
{
    public void Do();
}

interface Test2: Test1
{
    public void Do2();
}

class TestClass: Test2
{
    public void Do() {

    }

    public void Do2() {

    }
}
