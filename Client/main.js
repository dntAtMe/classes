const eventSource = new EventSource("https://localhost:5001/api/messages/events");

eventSource.onmessage = (event) => {
	  const data = JSON.parse(event.data);
	  console.log(data);
};

console.log("Event source set up");