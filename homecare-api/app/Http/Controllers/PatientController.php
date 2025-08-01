<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use Illuminate\Http\Request;

class PatientController extends Controller
{
    public function index()
    {
        return Patient::all(); 
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'date_of_birth' => 'required|date',
            'address' => 'required|string|max:255',
            'phone' => 'nullable|string|max:20',
            'medical_history' => 'nullable|string',
        ]);

        $patient = Patient::create($validated);
        return response()->json($patient, 201);
    }

    public function show($id)
    {
        $patient = Patient::find($id);
        if (!$patient) {
            return response()->json(['message' => 'Paciente não encontrado'], 404);
        }
        return $patient;
    }

    public function update(Request $request, $id)
    {
        $patient = Patient::find($id);
        if (!$patient) {
            return response()->json(['message' => 'Paciente não encontrado'], 404);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'date_of_birth' => 'required|date',
            'address' => 'required|string|max:255',
            'phone' => 'nullable|string|max:20',
            'medical_history' => 'nullable|string',
        ]);

        $patient->update($validated);
        return response()->json($patient);
    }

    public function destroy($id)
    {
        $patient = Patient::find($id);
        if (!$patient) {
            return response()->json(['message' => 'Paciente não encontrado'], 404);
        }

        $patient->delete();
        return response()->json(['message' => 'Paciente deletado com sucesso']);
    }
}