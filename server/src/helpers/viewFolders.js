import path from 'path'
import fs from 'fs'

export const viewFoldersH = (req, res) =>{

  let directyFolder = path.join( import.meta.url, '../../assets/storage')


  if (directyFolder.includes('file:')) {
    directyFolder = directyFolder.split(':')[1]
    }

  fs.readdir(directyFolder, (err, archivos) => {
    if (err) {
      console.error('Error al leer el contenido de la carpeta:', err);
      res.json({err});
    }

    // Filtrar solo las carpetas
    const folders = archivos.filter((nombre) => {
      return fs.statSync(path.join(directyFolder, nombre)).isDirectory();
    });
    res.json( {folders})
  })
}