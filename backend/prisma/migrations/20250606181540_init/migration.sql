-- CreateTable
CREATE TABLE `Message` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
);
-- Using utf8mb4 for full Unicode support, including emojis and special characters,
-- and utf8mb4_unicode_ci for proper case-insensitive comparisons in Unicode.
INSERT INTO Message (content) VALUES ('Servicios en la Nube');
INSERT INTO Message (content) VALUES ('Soluciones de Software Personalizadas');
INSERT INTO Message (content) VALUES ('Desarrollo de Aplicaciones Web y Móviles');
INSERT INTO Message (content) VALUES ('Optimización de Bases de Datos');
INSERT INTO Message (content) VALUES ('Integración de Sistemas Empresariales');
INSERT INTO Message (content) VALUES ('Automatización de Procesos de Negocio');
INSERT INTO Message (content) VALUES ('Análisis de Datos y Business Intelligence');

-- CreateTable


