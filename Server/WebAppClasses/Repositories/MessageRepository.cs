using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAppClasses.Db;

namespace WebAppClasses.Repositories
{
    public class MessageRepository: IDataRepository<Message>
    {
        readonly MessageDbContext _dbContext;

        public MessageRepository(MessageDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public long Count()
        {
            return _dbContext.Messages.Count();
        }

        public Message Add(Message entity)
        {
            var message = _dbContext.Messages.Add(entity);
            _dbContext.SaveChanges();

            return message.Entity;
        }

        public IEnumerable<Message> GetAll()
        {
            return _dbContext.Messages.ToList();
        }
    }
}
