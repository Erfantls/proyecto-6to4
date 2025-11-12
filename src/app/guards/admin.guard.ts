import { Injectable } from "@angular/core";

// Importa CanActivate (interfaz usada para proteger rutas) y Router (para redireccionar)
import { CanActivate,Router } from "@angular/router";

//Importa el servicio de autenticacion que contiene la logica para verifcar roles de usuario
import { AuthService } from "../servicios/auth.service";

//Declara la clase como inyectable y disponible en toda la aplicacion
@Injectable({providedIn:'root'})
export class AdminGuard implements CanActivate{

    //Inyeccion de dependecias:
    // - AuthService: para comprobar si el usuario tiene rol de administrador
    // - Router: para redirigir al usuario si no tiene permiso
    constructor(private authService: AuthService, private router :Router){}

    //Metodo obligatorio de la interfaz CAnACtivate, que decide si se puede acceder a una ruta 
    canActivate(): boolean {
        //Verifica si el usuario es administrador mediante el metodo del servicio de autenticacion
    if(this.authService.esAdmin()){
        //si el usuario tiene rol de administrador, se permite el acceso
        return true
    }else{
        // Si no es administrador, muestra un mensaje de alerta
        alert('Acceso denegado. solo administradores pueden entrar aqui.')
        
        //Redirige al usuario a la pagina de inicio
        this.router.navigate(['/inicio'])

        //Devuele false para bloquear el acceso a la ruta 
        return false
    }
    }
}