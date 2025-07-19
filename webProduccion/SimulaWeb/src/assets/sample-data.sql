-- Datos de ejemplo para la aplicación Simula
-- Asegúrate de que la base de datos DBSimula esté creada

USE DBSimula;

-- Usuarios de ejemplo
INSERT INTO usuarios (nombre, email, password, rol, saldo, nivel) VALUES
('Admin Principal', 'admin@simula.com', 'admin123', 'ADMIN', 0, 1),
('Juan Pérez', 'juan@ejemplo.com', 'password123', 'EMPRENDEDOR', 1000, 3),
('María García', 'maria@ejemplo.com', 'password123', 'EMPRENDEDOR', 1500, 4),
('Carlos López', 'carlos@ejemplo.com', 'password123', 'EMPRENDEDOR', 800, 2),
('Ana Martínez', 'ana@ejemplo.com', 'password123', 'EMPRENDEDOR', 2000, 5);

-- Retos de ejemplo
INSERT INTO retos (titulo, descripcion, opcion1, opcion2, respuesta_correcta, retroalimentacion) VALUES
('Validación de Idea de Negocio', 
'¿Cuál es la mejor manera de validar una idea de negocio antes de invertir tiempo y dinero?', 
'Hacer una encuesta en redes sociales', 
'Crear un MVP (Producto Mínimo Viable) y probarlo con clientes reales', 
2, 
'Correcto. Un MVP permite validar la idea con clientes reales y obtener feedback valioso antes de hacer grandes inversiones.'),

('Estrategia de Financiamiento', 
'Para una startup en etapa temprana, ¿cuál es generalmente la mejor fuente de financiamiento?', 
'Préstamo bancario tradicional', 
'Inversionistas ángeles o capital semilla', 
2, 
'Correcto. Los inversionistas ángeles y el capital semilla están diseñados específicamente para startups en etapa temprana.'),

('Análisis de Competencia', 
'¿Qué indica si encuentras que ya existen muchos competidores en tu mercado objetivo?', 
'Debes abandonar la idea inmediatamente', 
'Existe demanda validada en el mercado', 
2, 
'Correcto. La existencia de competidores indica que hay demanda en el mercado. El reto es diferenciarse.'),

('Construcción de Equipo', 
'¿Cuál es el factor más importante al elegir co-fundadores para tu startup?', 
'Que sean tus mejores amigos', 
'Que tengan habilidades complementarias a las tuyas', 
2, 
'Correcto. Los co-fundadores deben aportar habilidades que complementen las tuyas para formar un equipo balanceado.'),

('Modelo de Negocio', 
'¿Cuál es la principal diferencia entre un modelo de negocio B2B y B2C?', 
'B2B vende a empresas, B2C vende a consumidores finales', 
'B2B es más barato, B2C es más caro', 
1, 
'Correcto. B2B (Business to Business) se enfoca en vender a otras empresas, mientras B2C (Business to Consumer) vende directamente a consumidores finales.');

-- Cápsulas de ejemplo
INSERT INTO capsulas (titulo, contenido, tipo) VALUES
('Caso de Éxito: Airbnb', 
'Airbnb comenzó cuando sus fundadores no podían pagar el alquiler de su apartamento en San Francisco. Decidieron alquilar colchones inflables en su sala durante una conferencia. Esta idea simple se convirtió en una plataforma global valorada en miles de millones. La clave fue identificar una necesidad real (alojamiento asequible) y empezar pequeño antes de escalar.', 
'EXITO'),

('Caso de Éxito: Spotify', 
'Spotify revolucionó la industria musical al ofrecer streaming legal cuando la piratería era rampante. Su modelo freemium permitió a los usuarios acceder a música gratis con anuncios o pagar por una experiencia premium. El éxito radica en entender que la comodidad supera al precio para muchos consumidores.', 
'EXITO'),

('Error Común: Falta de Validación', 
'Muchos emprendedores pasan meses o años desarrollando un producto sin validar si realmente existe demanda. Un ejemplo común es crear una app compleja sin probar primero con un prototipo simple. Siempre valida tu idea con clientes reales antes de invertir recursos significativos.', 
'ERROR'),

('Error Común: Querer Hacer Todo', 
'Un error frecuente es intentar ser todo para todos. Los emprendedores novatos a menudo crean productos con demasiadas características, pensando que más es mejor. En realidad, es mejor dominar una función específica antes de expandirse. Enfócate en hacer una cosa excepcionalmente bien.', 
'ERROR'),

('Caso de Éxito: WhatsApp', 
'WhatsApp fue creado por dos ex-empleados de Yahoo que querían crear una alternativa simple a los SMS. Su enfoque en la simplicidad y la privacidad los llevó a ser adquiridos por Facebook por $19 mil millones. La lección: a veces las soluciones más simples son las más poderosas.', 
'EXITO'),

('Error Común: Ignorar el Feedback', 
'Muchos emprendedores se enamoran tanto de su idea que ignoran el feedback negativo de los usuarios. Esto puede llevar a persistir con un producto que nadie quiere. El feedback, especialmente el negativo, es oro puro para mejorar tu producto o pivotar hacia algo mejor.', 
'ERROR');

-- Respuestas de ejemplo (usuarios respondiendo retos)
INSERT INTO respuestas (usuario_id, reto_id, opcion_elegida, es_correcta, fecha_respuesta) VALUES
(2, 1, 2, true, '2024-01-15 10:30:00'),
(2, 2, 1, false, '2024-01-15 10:35:00'),
(2, 3, 2, true, '2024-01-15 10:40:00'),
(3, 1, 2, true, '2024-01-15 11:00:00'),
(3, 2, 2, true, '2024-01-15 11:05:00'),
(3, 4, 2, true, '2024-01-15 11:10:00'),
(4, 1, 1, false, '2024-01-15 14:20:00'),
(4, 3, 2, true, '2024-01-15 14:25:00'),
(5, 1, 2, true, '2024-01-15 16:15:00'),
(5, 2, 2, true, '2024-01-15 16:20:00'),
(5, 3, 2, true, '2024-01-15 16:25:00'),
(5, 4, 2, true, '2024-01-15 16:30:00'),
(5, 5, 1, true, '2024-01-15 16:35:00');

-- Verificar los datos insertados
SELECT 'Usuarios insertados:' as Info;
SELECT COUNT(*) as total_usuarios FROM usuarios;

SELECT 'Retos insertados:' as Info;
SELECT COUNT(*) as total_retos FROM retos;

SELECT 'Cápsulas insertadas:' as Info;
SELECT COUNT(*) as total_capsulas FROM capsulas;

SELECT 'Respuestas insertadas:' as Info;
SELECT COUNT(*) as total_respuestas FROM respuestas;
