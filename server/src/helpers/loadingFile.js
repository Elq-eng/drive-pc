import path from 'path'



const subirArchivos = ( req ) =>{

  return new Promise( ( resolve, reject ) => {

    const file = req.files
    console.log(file)
    // leer carpeta donde esta ubicado y leer el archivo 
    const nameComplet = Object.keys( file )[0].split('/')
    const nameCarpeta = nameComplet[0]
    const nameFile = (Object.values( file )[0].name)
    const mv = (Object.values( file )[0].mv)     
    let uploadPath = path.join( import.meta.url, '../../assets/storage', nameCarpeta, nameFile)


    if (uploadPath.includes('file:')) {
      uploadPath = uploadPath.split(':')[1]
    }

    mv(uploadPath, function (err) {
      if ( err ) { reject( err )}
      resolve('Se cargo correctamente')
    })
    
  })



} 


export default subirArchivos