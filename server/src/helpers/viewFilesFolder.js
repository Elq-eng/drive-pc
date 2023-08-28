import fs from 'fs'
import path from 'path'
import loggers from '../configs/logger.js'
import createError from 'http-errors'
import { response } from 'express'

export const viewFilesFolder = ( res=response,folder ) =>{
  
  let directyFolder = path.join( import.meta.url, '../../assets/storage', folder)

  if (directyFolder.includes('file:')) {
    directyFolder = directyFolder.split(':')[1]
    }
  fs.readdir(directyFolder, ( err, archivos ) => {
    try {
      
    } catch (error) {  
      if (err) {
        console.error('Error al leer el contenido de la carpeta:', err);
        loggers.error( createError(404,`error al ver los archivos  ${err}`))
        res.status(404).json({message:'Error al leer el contenido de la carpeta'});
      }
    }
    res.status(200).json({files: archivos });
  })
}