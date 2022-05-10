using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
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
        private readonly JsonSerializerSettings jsonSettings;

        public MessageController( IMessageService service)
        {
            _service = service;
            this.jsonSettings = new JsonSerializerSettings();
            jsonSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
        }

        [HttpGet]
        [Route("api/messages")]
        public List<Message> GetMessages([FromQuery] int pageNumber, [FromQuery] int pageSize)
        {
            Console.WriteLine(pageNumber);
            Response.Headers.Add("X-Total-Pages", _service.CountPages(pageNumber, pageSize).ToString());
            return _service.GetMessages(pageNumber, pageSize);
        }

        [HttpGet]
        [Route("api/messages/events")]
        public async Task GetEvents()
        {
            var response = Response;
            response.Headers.Add("Content-Type", "text/event-stream");
            response.StatusCode = 200;

            EventHandler<Message> onMessageAdded = async (sender, message) =>
            {
                Console.WriteLine("onMessageAdded");
                var messageJson = JsonConvert.SerializeObject(message, jsonSettings);
                await Response.WriteAsync($"data:{messageJson}\n\n");
                await Response.Body.FlushAsync();
            };

            _service.SubscribeForEvents(onMessageAdded);

            while (true)
            {
                await Task.Delay(1000);
            }
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
