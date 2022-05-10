using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAppClasses.Repositories;

namespace WebAppClasses.Services
{
    public class MessageService : IMessageService
    {
        readonly IDataRepository<Message> _repository;
        private IPublisher<Message> _publisher;

        public MessageService(IDataRepository<Message> repository, IPublisher<Message> publisher)
        {
            _repository = repository;
            _publisher = publisher;
        }
        
        public void AddMessage(Message message)
        {
            var newMessage = _repository.Add(message);
            Console.WriteLine("Message added");
            Console.WriteLine(_publisher.GetObservers().Count);
            _publisher.GetObservers().ForEach(observer =>
            {
                Console.WriteLine("Invoking");
                observer.Invoke(this, newMessage);
            });
        }

        public List<Message> GetMessages(int pageNumber, int pageSize)
        {
            var messages = _repository.GetAll().Skip((pageNumber-1) * pageSize).Take(pageSize);

            return messages.ToList();
        }

        public long CountPages(int pageNumber, int pageSize)
        {
            return ((long)Math.Ceiling((double)_repository.Count() / pageSize));
        }

        public void SubscribeForEvents(EventHandler<Message> observer)
        {
            Console.WriteLine("Adding message");
            _publisher.Subscribe(observer);
        }
    }
}
