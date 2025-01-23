// import express from "express";
// import Groq from "groq-sdk";
// import dotenv from "dotenv";
const Groq = require("groq-sdk")
const express = require("express")
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors())
app.use(express.json());

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: message }],
      model: "llama-3.2-90b-vision-preview", // Specify the desired LLaMA model
    });

    const botResponse = chatCompletion.choices[0]?.message?.content || "";
    res.json({ response: botResponse });
  } catch (error) {
    console.error("Error calling Groq API:", error);
    res.status(500).json({ error: "Failed to get response from Groq API" });
  }
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
