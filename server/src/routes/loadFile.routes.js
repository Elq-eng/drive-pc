
import express  from "express";
import fs from 'fs';
import path from "path";
import  { downloadFile, loadingFile, viewFiles, viewFolders } from '../controller/loadingFile.controller.js'

const router= express.Router()



router.get('/files/:folder', viewFiles  )
.get('/storage', viewFolders )
.post('/', loadingFile)
.post('/:folder', downloadFile)

export default router
