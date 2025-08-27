import express, { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import pdfParse from "pdf-parse";
import { GoogleGenerativeAI } from "@google/generative-ai";

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

  const geminModel= googleAI.getGenerativeModel({
    model:"gemini-1.5-flash",
  
  })


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

    const result=await geminModel.generateContent({
        contents: [{ role: "user", parts: [{ text: "Write a short poem about the ocean." }] }],
        generationConfig
    })

    const response= result.response.text();


      res.json({
        response
        
      })
    


    


})


export default r;