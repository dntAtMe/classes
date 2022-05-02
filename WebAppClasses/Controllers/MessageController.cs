using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAppClasses.Services;

namespace WebAppClasses.Controllers
{
    [ApiController]
    public class MessageController : ControllerBase
    {
        readonly IMessageService _service;

        public MessageController( IMessageService service)
        {
            _service = service;
        }

        [HttpGet]
        [Route("api/messages")]
        public List<Message> GetMessages()
        {
            return _service.GetMessages();
        }

        [HttpPost]
        [Route("api/messages")]
        public async Task<ActionResult> CreateMessage([FromBody] Message message)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            _service.AddMessage(message);

            return Ok();
        }
    }
}
