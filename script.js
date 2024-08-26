import { GoogleGenerativeAI } from "@google/generative-ai";
const API_KEY = "AIzaSyDVrd-WKW762hALrX_9f9vm8WcNGJir2SE";
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

const app = document.getElementById("chat");
const promptElement = document.getElementById("prompt");
const enviarButton = document.getElementById("enviar");

enviarButton.addEventListener("click", async () => {
  const prompt = promptElement.value;
  promptElement.value = "";
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = await response.text();
  app.innerHTML = text;
});