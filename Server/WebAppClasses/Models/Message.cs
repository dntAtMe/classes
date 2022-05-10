using System.ComponentModel.DataAnnotations;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAppClasses
{
    /**
    * Model wiadomości
    *
    * @field Id - klucz główny, generowany automatycznie przez bazę danych
    */
    public class Message
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }
        public string Author { get; set; }

        public string Content { get; set; }
    }
}
