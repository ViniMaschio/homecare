<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use Illuminate\Http\Request;

class PatientController extends Controller
{

    public function index()
    {
        return Patient::with('caregivers')->get();
    }

    public function store(Request $request)
    {
         $data = $request->validate([
            'name' => 'required|string',
            'address' => 'required|string',
            'birth_date' => 'required|date',
            'caregiver_ids' => 'array',
        ]);

        $patient = Patient::create($data);

        if (!empty($data['caregiver_ids'])) {
            $patient->caregivers()->sync($data['caregiver_ids']);
        }

        return response()->json($patient->load('caregivers'), 201);
    }

    public function show($id)
    {
         return Patient::with('caregivers')->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $patient = Patient::findOrFail($id);

        $data = $request->validate([
            'name' => 'string',
            'address' => 'string',
            'birth_date' => 'date',
            'caregiver_ids' => 'array',
        ]);

        $patient->update($data);

        if (isset($data['caregiver_ids'])) {
            $patient->caregivers()->sync($data['caregiver_ids']);
        }

        return response()->json($patient->load('caregivers'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $patient = Patient::findOrFail($id);
        $patient->caregivers()->detach();
        $patient->delete();

        return response()->json(['message' => 'Paciente excluído com sucesso']);
    }
}
