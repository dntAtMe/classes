using System;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAppClasses.Db
{
    public class MessageDbContext: DbContext
    {
        public MessageDbContext(DbContextOptions<MessageDbContext> options) : base(options) { }

        /**
        * Tabela z wiadomościami
        */
        public DbSet<Message> Messages { get; set; } = null;
    }
}
