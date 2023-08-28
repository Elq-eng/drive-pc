import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import fileUpload from 'express-fileupload';

import { routes } from '../routes/index.js';
import loggers from '../configs/logger.js';

class Server {

  constructor(){

    this.app = express();
    this.port = process.env.PORT

    this.pathRoutes = {
      upload  : '/upload',
      download: '/download',
      login   : '/',
      folders : '/folders'
    }

    // middleware
    this.middlewares()

    // rutas
    this.routes()
  }

  middlewares(){

    this.app.use( cors() )
    this.app.use( express.json() )
    this.app.use( morgan('dev'))
    this.app.use( morgan('combined', {stream : loggers.stream }))
    this.app.use( fileUpload({
      useTempFiles     : true,
      tempFileDir      : '/tmp/',
      createParentPath : true
    }))
  }

  routes(){
    this.app.use( this.pathRoutes.login, routes.loadFile )
    this.app.use( this.pathRoutes.upload,  routes.loadFile)
    this.app.use( this.pathRoutes.folders, routes.loadFile )
    this.app.use( this.pathRoutes.download, routes.loadFile)
  }



  listen(){

    this.app.listen( this.port || 3000, () =>{
      console.log( 'Servidor corriendo (ง🔥ﾛ🔥)ง  en el puerto', this.port || 3000)
    })
  
  }
  
}

export default Server; 