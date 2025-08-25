import express, { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import pdfParse from "pdf-parse";
const r:Router=express.Router();
const upload= multer({dest: path.join(__dirname, "../../uploads"),})


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
      console.log("File content:", data.text);
      res.json({
        
      })
    


    


})


export default r;