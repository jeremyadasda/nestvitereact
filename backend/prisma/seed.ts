import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.servicio.createMany({
    data: [
      { name: 'Aplicaciones WEB', description: 'Desarrollo de aplicaciones web modernas. Trabajamos con distintas tecnologías a medida de tus necesidades. Contáctanos para ofrecerte la solución mas optima' },
      { name: 'Sistemas en la Nube', description: 'Soluciones en AWS y Google Cloud. Manejamos las complicadas tareas de la computación en la nube por ti! Si tienes un proyecto que requiere Cloud Computing podemos ayudarte!' },
      { name: 'Landing Page LOW COST', description: 'Landing pages económicas y efectivas. Ofrecemos Hosting Incluido y podemos asesorarte en la compra de tu DNS. Si no necesitas uno propio te ofrecemos un subdominio TUAPP.zerouno.click para que puedas utilizar tu aplicación lo antes posible!' },
      { name: 'Aplicaciones Moviles', description: 'Apps móviles para Android y iOS, portabilidad a escritorio y disponibilidad de descarga mediante URL privados'},
      { name: 'Automatizacion con Selenium', description: 'Automatización de procesos con Selenium. Ahorrate incontables horas con el servicio de automatización de navegador para llevar a cabo tus tareas mas tediosas y repetitivas' },
    ],
  });
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());