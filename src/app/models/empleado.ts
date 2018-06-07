export class Empleado{
	
	constructor(
		public cedula: number,
		public Nombre: string,
		public Apellido: string,
		public Cargo: string,
		public direccion: string,
		public telefono: string,
		public correo: string,
		public estado: boolean
	) {
		// code...
	}
}