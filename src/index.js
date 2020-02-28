var http = require("http");
const { createWorker } = require("tesseract.js");

const worker = createWorker();

async function getTextFromImg() {
  await worker.load();
  await worker.loadLanguage("eng+chi_tra");
  await worker.initialize("eng+chi_tra");
  const url = "https://tesseract.projectnaptha.com/img/eng_bw.png";
  const {
    data: { text }
  } = await worker.recognize(url);
  await worker.terminate();
  return text;
}

//create a server object:
http
  .createServer(async function(req, res) {
    const text = await getTextFromImg();
    res.write(text); //write a response to the client
    res.end(); //end the response
  })
  .listen(8080); //the server object listens on port 8080
