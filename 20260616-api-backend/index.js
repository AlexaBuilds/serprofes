//1. Importamos la herramienta principal (Express)
const express = require("express");

//2. Creamos nuestra aplicación(nuestro servidor)
const app = express();

//3. MIDDLEWARE (La línea mágica)
app.use(express.json());

//NUESTRAS BASES DE DATOS TEMPORALES (Arrays en memoria)
let estudiantes = [
    { id: 1, nombre: "Aroa", curso: "React"},
    { id: 2, nombre: "Jose", curso: "Node"}
];

// Array de profesores (Nivel 1)
let profesores = [
    { id: 1, nombre: "Manuel", asignatura: "React" },
    { id: 2, nombre: "Silvia", asignatura: "Node" }
];


// ==========================================
// 🚩 RUTAS PARA ESTUDIANTES
// ==========================================

// GET: Leer todos los estudiantes
app.get("/api/estudiantes", (req, res)=> {
    res.json(estudiantes);
});

// POST: Guardar un estudiante nuevo con ID Automático (Nivel 2)
app.post("/api/estudiantes", (req, res) => {
    const { nombre, curso } = req.body;

    // Validación básica: nos aseguramos de que envían el nombre y curso
    if (!nombre || !curso) {
        return res.status(400).json({ mensaje: "Falta el nombre o el curso del estudiante" });
    }

    // Calcular ID automáticamente de forma segura (Nivel 2)
    const nuevoId = estudiantes.length > 0 ? estudiantes[estudiantes.length - 1].id + 1 : 1;

    const nuevoEstudiante = {
        id: nuevoId,
        nombre: nombre,
        curso: curso
    };

    estudiantes.push(nuevoEstudiante);

    res.json({
        mensaje: "¡Estudiante añadido con éxito a la base de datos!",
        listaActualizada: estudiantes
    });
});


// ==========================================
// 🚩 RUTAS PARA PROFESORES (Nivel 1)
// ==========================================

// GET: Leer todos los profesores
app.get("/api/profesores", (req, res) => {
    res.json(profesores);
});

// POST: Guardar un profesor nuevo con ID Automático
app.post("/api/profesores", (req, res) => {
    const { nombre, asignatura } = req.body;

    // Validación básica
    if (!nombre || !asignatura) {
        return res.status(400).json({ mensaje: "Falta el nombre o la asignatura del profesor" });
    }

    // Calcular ID automáticamente de forma segura (Nivel 2 aplicado a profesores)
    const nuevoId = profesores.length > 0 ? profesores[profesores.length - 1].id + 1 : 1;

    const nuevoProfesor = {
        id: nuevoId,
        nombre: nombre,
        asignatura: asignatura
    };

    profesores.push(nuevoProfesor);

    res.json({
        mensaje: "¡Profesor añadido con éxito a la base de datos!",
        listaActualizada: profesores
    });
});


//5.ENCENDER EL MOTOR 💨 
app.listen(3000, () =>{
    console.log("🎉¡Servidor funcionando! URL: http://localhost:3000");
});
