import loggers from "../configs/logger.js"
import subirArchivos from "../helpers/loadingFile.js"
import { response } from "express"
import createError from "http-errors"
import { viewFilesFolder } from "../helpers/viewFilesFolder.js"
import { viewFoldersH } from "../helpers/viewFolders.js"
import path from 'path'


export const loadingFile = async( req, res = response , next) =>{

  try {
    const message = await subirArchivos(req)
    res.json({message})

  } catch (error) {
    loggers.error( createError(404,`No suben los archivos ${error.message}`))
    return next( createError(404,`No suben los archivos ${error.message}`))
  }
}

export const viewFiles = ( req, res,next ) =>{

  try {    
      // mostrar cada una de las carpetas 
      const { folder } = req.params
      viewFilesFolder( res,folder )

  } catch (error) {
    loggers.error( createError(404,`error al ver los archivos  ${error.message}`))
    return next( createError(404,`error al ver los archivos ${error.message}`))
  }
}


export const viewFolders = (req, res, next) =>{

 try {
    viewFoldersH(req,res)
 } catch (error) {
    loggers.error( createError(404,`error al ver los archivos  ${error.message}`))
    return next( createError(404,`error al ver los archivos ${error.message}`))
 }  
}

export const downloadFile = ( req, res, next ) => {
  try {
    const { folder } = req.params
    const { files } = req.query
    
    let downloadFile= path.join( import.meta.url, '../../assets/storage', folder, files)
    // console.log(file)
    if (downloadFile.includes('file:')) {
      downloadFile = downloadFile.split(':')[1]
    }
    console.log(downloadFile)
    res.download(downloadFile)
  } catch (error) {
    console.log(error)
    loggers.error( createError(404,`error al ver los archivos  ${error.message}`))
    return next( createError(404,`error al ver los archivos ${error.message}`))
  }
}