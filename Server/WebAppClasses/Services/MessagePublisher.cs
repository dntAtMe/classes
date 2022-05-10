using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAppClasses.Services
{
    public class MessagePublisher: IPublisher<Message>
    {
        public readonly List<EventHandler<Message>> Observers;

        public MessagePublisher()
        {
            this.Observers = new List<EventHandler<Message>>();
        }

        public void Subscribe(EventHandler<Message> observer)
        {
            Observers.Add(observer);
        }

        public List<EventHandler<Message>> GetObservers()
        {
            return this.Observers;
        }

    }
}
