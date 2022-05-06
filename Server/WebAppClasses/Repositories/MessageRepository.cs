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
            this._dbContext = dbContext;
        }

        public void Add(Message entity)
        {
            _dbContext.Messages.Add(entity);
            _dbContext.SaveChanges();
        }

        public IEnumerable<Message> GetAll()
        {
            return _dbContext.Messages.ToList();
        }
    }
}
