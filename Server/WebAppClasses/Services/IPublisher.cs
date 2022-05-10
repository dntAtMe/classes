using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAppClasses.Services
{
    public interface IPublisher<T>
    {
        public List<EventHandler<T>> GetObservers();
        public void Subscribe(EventHandler<T> observer);
    }
}
