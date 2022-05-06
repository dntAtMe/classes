using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAppClasses.Services
{
    public interface IMessageService
    {
        public List<Message> GetMessages();
        public void AddMessage(Message message);
    }
}
