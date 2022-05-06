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

        public MessageService(IDataRepository<Message> repository)
        {
            this._repository = repository;
        }
        
        public void AddMessage(Message message)
        {
            _repository.Add(message);
        }

        public List<Message> GetMessages()
        {
            var messages = from m in _repository.GetAll()
                   select m;

            return messages.ToList();
        }
    }
}
