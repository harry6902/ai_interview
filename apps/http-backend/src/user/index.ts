import express, { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import pdfParse from "pdf-parse";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { json } from "stream/consumers";

const r:Router=express.Router();
const upload= multer({dest: path.join(__dirname, "../../uploads"),})


const gemini_api_key=process.env.API_KEY!;
const googleAI= new GoogleGenerativeAI(gemini_api_key);
const generationConfig = {
    temperature: 0.9,
    topP: 1,
    topK: 1,
    maxOutputTokens: 4096,
  };





r.post("/getQuestions",upload.single("resume"),async (req,res)=>{

    const resume= req.file;
    const jobDes= req.body.jobDescription;

    if(!resume){
        res
        .status(400)
        .json({
            "error":"upload your resume"
        })
        return;
    }
    
    const fileBuffer = fs.readFileSync(resume.path);
    const data = await pdfParse(fileBuffer);
    await fs.promises.unlink(resume.path);
    const system_prompt= `You are an AI assistant who helps in generating
     interview questions. You are given an context of resume and jobDescription.
      Please help us creating 3-4 questions and give them based on the resume and 
      jobDescription The resume data is ${data.text} and job Description is ${jobDes}
      
      Example of output format is: 
      
      Output: {{"Tell me about youself"},
      {"Given an array of integers, return the length of the longest subarray with sum equal to K."},
      {"Given an array of integers, return the length of the longest subarray with sum equal to K."},
      {"Write an SQL query to find the second highest salary from an Employees table."}}
      


Do not include extra text, do not include 'question:' keys,

      
      `;

      const geminModel= googleAI.getGenerativeModel({
        model:"gemini-1.5-flash",
        systemInstruction: system_prompt
      
      })
    const result=await geminModel.generateContent({
        contents: [{ role: "user", parts: [{ text: "Give reply based on system_prompt" }] }],
        generationConfig
    })

    let response= result.response.text();
    response=response.replace(/```json|```/g, "").trim();
    response=response.replace(/^{/, "[").replace(/}$/, "]");

      res.json({
        res: JSON.parse(response)
        
      })
    


    


})


export default r;