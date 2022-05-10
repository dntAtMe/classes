using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAppClasses.Services
{
    public interface IMessageService
    {
        public List<Message> GetMessages(int pageNumber, int pageSize);

        public long CountPages(int pageNumber, int pageSize);
        public void AddMessage(Message message);

        public void SubscribeForEvents(EventHandler<Message> observer);
    }
}
