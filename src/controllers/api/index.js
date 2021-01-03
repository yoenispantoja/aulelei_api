/**
 * @ Author: Yoenis Pantoja
 * @ Create Time: 2020-03-30 16:15:03
 * @ Modified by: Your name
 * @ Modified time: 2020-05-11 23:12:02
 * @ Description: Index de las rutas generales
 */

//Importando los Router de cada entidad del negocio
import { BaseRouter } from '../base/BaseRouter';

import { EventoRouter } from './evento';
import { PublicacionRouter } from './publicacion';
import { CategoriaPublicacionRouter } from './categoria-publicacion';
import { EstadoPublicacionRouter } from './estado-publicacion';
import { GaleriaRouter } from './galeria';
import { MediaRouter } from './media';

import { ServicioRouter } from './servicio';
import { ProductoRouter } from './producto';
import { ReservaRouter } from './reserva';


import { UserRouter } from './user';
import { TrabajadorRouter } from './trabajador';


//Auxiliares
import { FileRouter } from './file';

//El middleware para la seguridad por roles
import { authAdministrador } from '../base/util/auth';

export class ApiRouter extends BaseRouter {
         //Ruters del blog
         eventoRouter = new EventoRouter();
         publicacionRouter = new PublicacionRouter();
         categoriaPublicacionRouter = new CategoriaPublicacionRouter();
         estadoPublicacionRouter = new EstadoPublicacionRouter();
         galeriaRouter = new GaleriaRouter();
         mediaRouter = new MediaRouter();
         fileRouter = new FileRouter();

         //Ruters de la gestión del salón
         servicioRouter = new ServicioRouter();
         productoRouter = new ProductoRouter();
         reservaRouter = new ReservaRouter();

         //Ruters de la administración
         userRouter = new UserRouter();
         trabajadorRouter = new TrabajadorRouter();

         constructor() {
           super();
           //Rutas del blog
           this.router.use('/evento', this.eventoRouter.router);
           this.router.use('/publicacion', this.publicacionRouter.router);
           this.router.use('/categoria-publicacion', this.categoriaPublicacionRouter.router);
           this.router.use('/estado-publicacion', this.estadoPublicacionRouter.router);
           this.router.use('/galeria', this.galeriaRouter.router);
           this.router.use('/media', this.mediaRouter.router);
           this.router.use('/file', this.fileRouter.router);

           //Rutas de la gestión del local
           this.router.use('/servicio', this.servicioRouter.router);
           this.router.use('/producto', this.productoRouter.router);
           this.router.use('/reserva', this.reservaRouter.router);

           //Rutas de la administración
           this.router.use('/user', this.userRouter.router);
           this.router.use('/trabajador', this.trabajadorRouter.router);
         }
       }